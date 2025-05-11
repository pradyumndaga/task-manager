import { Status, Task } from "../model";

export interface TaskState {
        id: number;
        title: string;
        description: string;
        status: Status;
        dueDate: string;
}