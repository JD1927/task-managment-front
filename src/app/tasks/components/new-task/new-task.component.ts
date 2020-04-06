import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getTasks } from 'src/app/store/actions/task.actions';
import { AppState } from 'src/app/store/reducers/appReducer.reducer';
import { TaskService } from '../../services/task/task.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  newTaskForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public store: Store<AppState>,
    public taskService: TaskService,
    public dialogRef: MatDialogRef<NewTaskComponent>,
  ) { }

  ngOnInit(): void {
    this.createNewTaskForm();
  }

  createNewTaskForm(): void {
    this.newTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onCreateNewTask(): void {
    if (this.newTaskForm.valid) {
      const { title, description } = this.newTaskForm.value;
      this.taskService.createTask({ title, description }).subscribe(
        () => {
          this.store.dispatch(getTasks({ filters: {} }));
          this.dialogRef.close();
        },
        (error) => console.log(error)
      );
    }
  }

}
