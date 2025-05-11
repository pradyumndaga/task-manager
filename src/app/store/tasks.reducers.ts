import { createReducer, on } from '@ngrx/store';
import * as TasksAction from './tasks.actions';
import { Task } from '../model';
// import { AppStore } from "./model"

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: [
    {
      id: 1,
      status: 'Pending',
      title: 'Task 1',
      description: 'Task 1 description',
      dueDate: '2023-10-01',
    },
    {
      id: 3,
      status: 'InProgress',
      title: 'Task 2',
      description:
        'Task 1 description jdfhediuhfiuhdiuehiuewhiuejhihiugugugughuhh',
      dueDate: '2023-10-01',
    },
    {
      id: 2,
      status: 'Completed',
      title: 'Task 3',
      description: 'Task 1 description',
      dueDate: '2023-10-01',
    },
    {
      id: 4,
      status: 'Pending',
      title: 'Task 4',
      description: 'Task 1 description',
      dueDate: '2023-10-01',
    },
    {
      id: 5,
      status: 'InProgress',
      title: 'Task 5',
      description: 'Task 1 description',
      dueDate: '2023-10-01',
    },
    {
      id: 6,
      status: 'Completed',
      title: 'Task 6',
      description: 'Task 1 description',
      dueDate: '2023-10-01',
    },
    {
      id: 7,
      status: 'Pending',
      title: 'Task 7',
      description: 'Task 1 description',
      dueDate: '2023-10-01',
    },
  ],
};

export const tasksReducer = createReducer(
  initialState,
  on(TasksAction.fetchAllTasks, (state: TaskState) => ({
    ...state,
  })),
  on(TasksAction.fetchAllTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
  })),
  on(TasksAction.addTask, (state: TaskState, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TasksAction.deleteTask, (state: TaskState, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== taskId),
  })),
  on(TasksAction.updateTask, (state: TaskState, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  }))
);
