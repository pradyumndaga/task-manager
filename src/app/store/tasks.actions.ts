import { createAction, props } from '@ngrx/store';
import { Task } from '../model';

export const fetchAllTasks = createAction('[Tasks] Fetch All Tasks');
export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Task }>()
);
export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ taskId: number }>()
);
export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ task: Task }>()
);
export const fetchAllTasksSuccess = createAction(
  '[Tasks] Fetch All Tasks Success',
  props<{ tasks: Task[] }>()
);

export const fetchAllTasksFailure = createAction(
  '[Tasks] Fetch All Tasks Failure',
  props<{ error: any }>()
);
