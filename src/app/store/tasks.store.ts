import { Action, ActionReducer } from "@ngrx/store";
import { Task } from "../model";
import { tasksReducer, TaskState } from "./tasks.reducers";
import { TasksEffects } from "./tasks.effects";

export interface AppState {
    tasks: TaskState;
}

export interface AppStore {
    tasks: ActionReducer<TaskState, Action>;
}
export const appStore: AppStore = {
    tasks: tasksReducer
}


export const appEffects = [TasksEffects];