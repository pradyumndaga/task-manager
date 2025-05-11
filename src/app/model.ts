export interface Task {
    id: number;
    title: string;
    description: string;
    status: Status;
    dueDate: string;
}

export type Status = 'Pending' | 'InProgress' | 'Completed';