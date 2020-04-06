import { Action, createReducer, on } from '@ngrx/store';
import { TasksList } from 'src/app/tasks/models/task.model';
import { cleaTaskState, getTasks, getTasksFailure, getTasksSuccess } from '../../actions/task.actions';


export const taskFeatureKey = 'task';

export interface TaskState {
  tasks: TasksList[];
  error?: any;
}

export const initialTaskState: TaskState = {
  tasks: undefined,
  error: undefined,
};

const taskReducer = createReducer(initialTaskState,
  on(getTasks, (state, action) => {
    return {
      ...state,
      error: undefined
    }
  }),
  on(getTasksSuccess, (state, action) => {
    return {
      ...state,
      tasks: action.data,
      error: undefined
    };
  }),
  on(getTasksFailure, (state, action) => {
    return {
      ...state,
      tasks: undefined,
      error: { ...action.error },
    };
  }),
  on(cleaTaskState, (state) => {
    return {
      ...state,
      tasks: undefined,
      error: undefined
    };
  })
);

export function reducer(state: TaskState | undefined, action: Action) {
  return taskReducer(state, action);
}
