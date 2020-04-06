import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { catchError, map, mergeMap, shareReplay, take, last } from 'rxjs/operators';
import { TasksList, TaskFilters } from 'src/app/tasks/models/task.model';
import { TaskService } from 'src/app/tasks/services/task/task.service';
import { getTasks, getTasksFailure, getTasksSuccess } from '../../actions/task.actions';



@Injectable()
export class TaskEffects {

  getTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTasks),
      mergeMap((action) => {
        const { search, status } = action.filters;
        return this.taskService.getTasks(search, status).pipe(
          shareReplay(),
          map((res: TasksList[]) => getTasksSuccess({ data: res })),
          catchError((error) => throwError(getTasksFailure({ error })))
        );
      })
    )
  });

  constructor(
    private actions$: Actions,
    private taskService: TaskService) { }

}
