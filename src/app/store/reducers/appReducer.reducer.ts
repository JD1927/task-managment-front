import { createAction } from '@ngrx/store';
import { UserLogged } from 'src/app/auth/models/auth.model';
import { TaskState } from './task/task.reducer';

export const clearState = createAction(
  '[App State] Clear store'
);

export interface AppState {
  user: UserLogged;
  tasks: TaskState;
}

export const initialState: AppState = {
  user: undefined,
  tasks: undefined,
};
