import { Injectable } from '@angular/core';
import { Task } from '../../model';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
private taskLocalStorageKey = 'tasks';
  constructor() { }

  getAllTasks() {
    console.log('Fetching tasks from localStorage');
    const tasks = localStorage.getItem(this.taskLocalStorageKey);
    console.log('Tasks:', tasks);
    return of(JSON.parse(tasks || '[]'));
  }

  addTask(newTask: Task): Observable<void> {
    return this.getAllTasks().pipe(
      map((allTasks: Task[]) => {
        allTasks.push(newTask);
        allTasks = [...allTasks].sort((a, b) => {
          return a.dueDate > b.dueDate ? 1 : -1;
        });
        localStorage.setItem(this.taskLocalStorageKey, JSON.stringify(allTasks)); // Save to localStorage
      })
    );
  }

  deleteTask(taskId: number): Observable<void> {
    return this.getAllTasks().pipe(
      map((allTasks: Task[]) => {
        const updatedTasks = allTasks.filter((task: Task) => task.id !== taskId); // Remove the task
        localStorage.setItem(this.taskLocalStorageKey, JSON.stringify(updatedTasks)); // Save to localStorage
      })
    );
  }

  updateTask(updatedTask: Task): Observable<void> {
    return this.getAllTasks().pipe(
      map((allTasks: Task[]) => {
        const taskIndex = allTasks.findIndex((task: Task) => task.id === updatedTask.id);
        if (taskIndex !== -1) {
          allTasks[taskIndex] = updatedTask;
          allTasks = [...allTasks].sort((a, b) => {
            return a.dueDate > b.dueDate ? 1 : -1;
          });
          localStorage.setItem(this.taskLocalStorageKey, JSON.stringify(allTasks)); // Save to localStorage
        }
      })
    );
  }
}
