import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tasks } from 'src/app/shared/constants/global.constants';
import { NewTaskComponent } from '../../components/new-task/new-task.component';
import { Task, TasksList } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  getTasks(search?: string, status?: string): Observable<TasksList[]> {
    let params = new HttpParams();
    if (search) {
      params = params.append('search', search);
    }
    if (status) {
      params = params.append('status', status);
    }
    return this.http.get<any>(tasks, { params });
  }

  deleteTaskById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${tasks}/${id}`);
  }

  updateTaskStatusById(id: number, status: string): Observable<boolean> {
    return this.http.patch<boolean>(`${tasks}/${id}/status`, { status });
  }

  createTask(task: Task): Observable<boolean> {
    return this.http.post<boolean>(tasks, { ...task });
  }

  openNewTaskModal(): void {
    this.dialog.open(NewTaskComponent);
  }


}
