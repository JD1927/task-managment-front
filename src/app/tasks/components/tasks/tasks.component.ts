import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, Subscription } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';
import { getTasks } from 'src/app/store/actions/task.actions';
import { AppState } from 'src/app/store/reducers/appReducer.reducer';
import { TaskStatus } from '../../models/task.enum';
import { TaskFilters, TasksList } from '../../models/task.model';
import { TaskService } from '../../services/task/task.service';
import { taskStatusArray } from './../../models/task.enum';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy, AfterViewInit  {

  @ViewChild('taskSearch') taskSearch: ElementRef;
  getUserTasks$: Subscription = new Subscription();
  keyUpSearch$: Subscription = new Subscription();
  tasks: TasksList[] = [];
  taskStatus: TaskStatus[] = taskStatusArray;
  status: string;
  search: string;

  constructor(
    private store: Store<AppState>,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.status = 'No status filter';
    this.search = '';
    this.callUserTasks();
    this.getUserTasks();
  }

  ngOnDestroy(): void {
    this.getUserTasks$.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.onSearchChange();
  }

  callUserTasks(filters: TaskFilters = {}): void {
    this.store.dispatch(getTasks({ filters }));
  }

  getUserTasks(): void {
    this.getUserTasks$ = this.store.select(state => state.tasks.tasks).pipe(
      tap((tasks) => this.tasks = tasks === undefined ? [] : tasks)
    ).subscribe();
  }

  onCreateTask(): void {
    this.taskService.openNewTaskModal();
  }

  onStatusChange(status: string): void {
    this.search = '';
    const result = this.taskStatus.filter(tStatus => tStatus === status);
    if (result.length > 0) {
      this.callUserTasks({ status });
    } else {
      this.callUserTasks();
    }
  }

  onSearchChange(): void {
    this.keyUpSearch$ = fromEvent(this.taskSearch.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map((e: any) => e.target.value),
    ).subscribe((search) => this.searchFilter(search));
  }

  searchFilter(search: string): void {
    this.status = 'No status filter';
    if (search) {
      this.callUserTasks({ search });
    } else {
      this.callUserTasks();
    }
  }



}
