import { createAction, props } from '@ngrx/store';
import { TasksList, TaskFilters } from 'src/app/tasks/models/task.model';

export const getTasks = createAction(
  '[Task] Get all tasks',
  props<{ filters: TaskFilters }>()
);

export const getTasksSuccess = createAction(
  '[Task] Get all tasks Success',
  props<{ data: TasksList[] }>()
);

export const getTasksFailure = createAction(
  '[Task] Get all tasks Failure',
  props<{ error: any }>()
);
// ==========================================
export const cleaTaskState = createAction(
  '[Task] Clear Task State'
);
