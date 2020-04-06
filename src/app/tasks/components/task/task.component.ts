import { taskStatusArray } from './../../models/task.enum';
import { Component, OnInit, Input } from '@angular/core';
import { TasksList } from '../../models/task.model';
import { TaskStatus } from '../../models/task.enum';
import { TaskService } from '../../services/task/task.service';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/appReducer.reducer';
import { getTasks } from 'src/app/store/actions/task.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: TasksList;
  taskStatus: TaskStatus[] = taskStatusArray;
  selected: string;

  constructor(
    private taskService: TaskService,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.setSelectedStatus();
  }

  setSelectedStatus(): void {
    this.selected = this.task.status;
  }

  onDeleteTask(id: number) {
    this.taskService.deleteTaskById(id).subscribe(
      () => this.store.dispatch(getTasks({ filters: {} })),
      (error) => console.log(error)
    );
  }

  onStatusChange(id: number, status: string): void {
    this.taskService.updateTaskStatusById(id, status).subscribe(
      () => this.store.dispatch(getTasks({ filters: {} })),
      (error) => console.log(error)
    );
  }

}
