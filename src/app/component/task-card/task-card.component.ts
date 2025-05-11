import { Component, input, output } from '@angular/core';
import { Task } from '../../model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BadgeComponent } from "../badge/badge.component";


@Component({
  selector: 'app-task-card',
  imports: [MatTooltipModule, DatePipe, MatIconModule, BadgeComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  task = input.required<Task>()
  delete = output<number>();
  edit = output<Task>();

  getBadgeType(status: string) {
    if (status === 'Pending') {
      return 'warning';
    }
    if (status === 'InProgress') {
      return 'info';
    }
    if (status === 'Completed') {
      return 'success';
    }
    return 'error';
  }

  deleteTask(id: number) {
    this.delete.emit(id);
  }

  editTask(task: Task) {
    this.edit.emit(task);
  }
}
