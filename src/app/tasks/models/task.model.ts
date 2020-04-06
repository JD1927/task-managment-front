import { TaskStatus } from './task.enum';

export interface Task {
  title: string;
  description: string;
}


export interface TasksList extends Task {
  id: number;
  status: TaskStatus;
  userId: number;
}

export interface TaskFilters {
  search?: string;
  status?: string;
}

