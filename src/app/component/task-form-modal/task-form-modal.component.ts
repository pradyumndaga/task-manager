import { Component, input, output } from '@angular/core';
import { Status, Task } from '../../model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskFormComponent } from "../task-form/task-form.component";

@Component({
  selector: 'app-task-form-modal',
  imports: [FormsModule, ReactiveFormsModule, TaskFormComponent],
  templateUrl: './task-form-modal.component.html',
  styleUrl: './task-form-modal.component.scss'
})
export class TaskFormModalComponent {
  openModal = false;
  editMode = false;
  task = output<{edit: boolean, task: Task}>();
  formData = new FormGroup({
    id: new FormControl<number>(0),
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    status: new FormControl('Pending'),
    dueDate: new FormControl('', Validators.required),
  })

  open(options: any) {
    this.openModal = true;
    this.editMode = options.editMode;
    console.log('open modal', options);
    if (options.editMode && options.task) {
      this.formData.patchValue({
        id: options.task.id,
        title: options.task.title,
        description: options.task.description,
        status: options.task.status,
        dueDate: options.task.dueDate
      });
    }
    
  }

  closeModal() {
    this.formData.reset();
    this.openModal = false;
  }

  onSubmit() {
    console.log('Form submitted1:', this.formData.value);
    const taskValue: Task = {
      id: this.formData.value.id!,
      title: this.formData.value.title!,
      description: this.formData.value.description!,
      status: (this.formData.value.status || 'Pending' )as Status,
      dueDate: this.formData.value.dueDate!,
    };
    if(taskValue.id)
    this.task.emit({edit: this.editMode, task: taskValue});
    this.closeModal();
  }

}
