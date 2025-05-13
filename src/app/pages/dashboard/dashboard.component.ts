import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';

import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    MatIconModule,
    TaskCardComponent,
    BadgeComponent,
    TaskFormModalComponent,
    MatSelectModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild(TaskFormModalComponent) taskFormModal!: TaskFormModalComponent;

  searchText = '';
  sortNewFirst = true;
  selectedStatus: string = 'All';
  statuses = ['Pending', 'InProgress', 'Completed', 'All'];
  tasks: Task[] = [];
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
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
    this.route.queryParams.subscribe((params) => {
      const status = params['status'];
      if (status) {
        this.selectedStatus = status;
        this.onFilterChange();
      } else {
        this.filteredTasks = this.tasks;
        this.getSortedTasks();
      }
    });
  }

  naviagteFilter(status: string) {
    this.router.navigate([''], { queryParams: { status } });
  }

  getFilteredTasks() {
    this.onFilterChange();
  }

  getTasks(status: Status) {
    return this.tasks.filter((task) => task.status === status);
  }

  onFilterChangeRoute() {
    this.router.navigate([''], {
      queryParams: { status: this.selectedStatus },
    });
    this.onFilterChange();
  }

  onFilterChange() {
    if (this.selectedStatus) {
      if (this.selectedStatus === 'All') {
        this.filteredTasks = this.tasks;
        this.getSortedTasks();
        return;
      }
      this.filteredTasks = this.tasks.filter(
        (task) => task.status === this.selectedStatus
      );
    } else {
      this.filteredTasks = this.tasks;
    }

    this.getSortedTasks();
  }

  getSortedTasks() {
    if (!this.sortNewFirst) {
      this.filteredTasks = [...this.filteredTasks].reverse();
    }
  }

  onDeleteTask(taskId: number) {
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
    this.sortNewFirst = !this.sortNewFirst;
    this.filteredTasks = [...this.filteredTasks].reverse();
  }

  onSearch(text: string) {
    this.searchText = text;
    console.log(this.searchText);
    this.filteredTasks = this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(text) ||
        task.description.toLowerCase().includes(text)
    );

    this.filteredTasks = [...this.filteredTasks].sort((a, b) => {
      let indexA = a.title.toLowerCase().indexOf(this.searchText);
      if (indexA === -1) {
        indexA = a.description.toLowerCase().indexOf(this.searchText);
      }
      let indexB = b.title.toLowerCase().indexOf(this.searchText);
      if (indexB === -1) {
        indexB = a.description.toLowerCase().indexOf(this.searchText);
      }

      return indexA === indexB ? 0 : indexA > indexB ? 1 : -1;
    });
  }
}
