import { Component, input, OnInit, output } from '@angular/core';
import { Form, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import {MatSelectModule} from '@angular/material/select';;
import _, { isEqual } from 'lodash';
@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, FormsModule, MatSelectModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  formGroup = input<FormGroup>();
  editMode = input<boolean>();
  submit = output();
  formDeepCopy!: FormGroup;

  ngOnInit() {
    this.formDeepCopy = _.cloneDeep(this.formGroup()!);
    const id = this.formGroup()?.get('id');
    if (id && !id.value) {
      id.setValue(Date.now());
    }
    const statusControl = this.formGroup()?.get('status');
    if (statusControl && !statusControl.value) {
      statusControl.setValue('Pending');
    }
  }

  submitDisabled() {
    if (this.formGroup()?.invalid && this.formGroup()?.touched) {
      return true;
    }
    return isEqual(
      this.formGroup()?.value,
      this.formDeepCopy?.value
    );
  }

  onSubmit() {
    console.log('Form submitted:', this.formGroup()?.value);
    if (this.formGroup()?.valid) {
      const task = this.formGroup()?.value;
      console.log('Task submitted:', task);

      this.submit.emit();
    } else {
      console.log('Form is invalid');
    }
  }
}
