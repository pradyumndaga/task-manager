import { Component, input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TaskCardComponent } from '../../component/task-card/task-card.component';
import { Status, Task } from '../../model';
import { BadgeComponent } from '../../component/badge/badge.component';
import { TaskFormModalComponent } from '../../component/task-form-modal/task-form-modal.component';
import { AppState } from '../../store/tasks.store';
import { Store } from '@ngrx/store';
import { TaskState } from '../../store/tasks.reducers';
import {
  addTask,
  deleteTask,
  fetchAllTasks,
  updateTask,
} from '../../store/tasks.actions';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    MatIconModule,
    TaskCardComponent,
    BadgeComponent,
    TaskFormModalComponent,
    MatSelectModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  routeFilter = input<string>();

  @ViewChild(TaskFormModalComponent) taskFormModal!: TaskFormModalComponent;

  sortNewFirst = true;
  selectedStatus: string = 'All';
  statuses = ['Pending', 'InProgress', 'Completed', 'All'];
  tasks: Task[] = [];
  constructor(private store: Store<AppState>, private router: Router) {
    console.log('route filter', this.routeFilter());
    this.store.dispatch(fetchAllTasks());
    this.store
      .select((state) => state.tasks)
      .subscribe((t: TaskState) => {
        this.tasks = t.tasks;
        this.getFilteredTasks();
      });
  }

  filteredTasks: any[] = [];


  ngOnInit(): void {
    console.log('route filter', this.routeFilter());
    this.filteredTasks = this.tasks;
    if (!this.sortNewFirst) {
      this.filteredTasks = [...this.filteredTasks].reverse()
    }
  }

  naviagteFilter(status: String) {
    this.router.navigate(['', {queryParams: {status}}]);
  }

  getFilteredTasks() {
    if (this.routeFilter()) {
      console.log('route filter', this.routeFilter());
      this.selectedStatus = this.routeFilter()!;
    }
    this.onFilterChange();
  }

  getTasks(status: Status) {
    return this.tasks.filter((task) => task.status === status);
  }

  onFilterChange() {
    if (this.selectedStatus) {
      if (this.selectedStatus === 'All') {
        this.filteredTasks = this.tasks;
        if (!this.sortNewFirst) {
          this.filteredTasks = [...this.filteredTasks].reverse()
        }
        return;
      } 
      this.filteredTasks = this.tasks.filter(
        (task) => task.status === this.selectedStatus
      );
    } else {
      this.filteredTasks = this.tasks;
    }

    if (!this.sortNewFirst) {
      this.filteredTasks = [...this.filteredTasks].reverse()
    }
  }

  onDeleteTask(taskId: number) {
    console.log(taskId);
    this.store.dispatch(deleteTask({ taskId }));
  }
  onEditTask(event: Task) {
    this.taskFormModal.open({
      editMode: true,
      task: event,
    });
  }

  addTask() {
    this.taskFormModal.open({
      editMode: false,
    });
  }

  processTask(formTask: any) {
    console.log('task');
    if (formTask.edit) {
      this.store.dispatch(
        updateTask({
          task: formTask.task,
        })
      );
    } else {
      this.store.dispatch(
        addTask({
          task: formTask.task,
        })
      );
    }
  }

  sortTasks() {
    this.sortNewFirst = !this.sortNewFirst
    this.filteredTasks = [...this.filteredTasks].reverse();
  }
}
