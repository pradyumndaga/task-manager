// import { createSelector } from '@ngrx/store';
// import { Task } from '../model';
// import { AppState, } from './tasks.store';

// // Selector to get the tasks state
// export const selectTasksState = (state: AppState) => state.tasks;

// // Selector to get all tasks
// export const selectAllTasks = createSelector(
//     selectTasksState,
//     (state: Task[]) => state
// );

// // // Selector to get a task by ID
// // export const selectTaskById = (taskId: string) =>
// //     createSelector(selectTasksState, (state: TaskState) =>
// //         state.tasks.find(task => task.id === taskId)
// //     );

// // // Selector to get completed tasks
// // export const selectCompletedTasks = createSelector(
// //     selectTasksState,
// //     (state: TaskState) => state.tasks.filter((task: Task[]) => task.status)
// // );

// // // Selector to get pending tasks
// // export const selectPendingTasks = createSelector(
// //     selectTasksState,
// //     (state: TaskState) => state.tasks.filter(task => !task.completed)
// // );