import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '../core/services/tasks.service';
import * as TasksActions from './tasks.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class TasksEffects {
  constructor(private taskService: TasksService) {}
    actions$ = inject(Actions)
    fetchAllTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TasksActions.fetchAllTasks),
            exhaustMap(() =>
                this.taskService.getAllTasks().pipe(
                    map((tasks) => TasksActions.fetchAllTasksSuccess({ tasks })),
                )
        )
    )
    );
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.addTask),
      exhaustMap((action) =>
        this.taskService
          .addTask(action.task)
          .pipe(map((task) => TasksActions.fetchAllTasks()))
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      exhaustMap((action) =>
        this.taskService
          .updateTask(action.task)
          .pipe(map((task) => TasksActions.fetchAllTasks()))
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      exhaustMap((action) =>
        this.taskService
          .deleteTask(action.taskId)
          .pipe(map(() => TasksActions.fetchAllTasks()))
      )
    )
  );
}
