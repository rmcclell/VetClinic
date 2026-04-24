import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-patient-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  template: `
    <h2 mat-dialog-title>Add Task</h2>
    <mat-dialog-content>
      <form [formGroup]="taskForm" class="flex flex-col gap-4 mt-2">
        <mat-form-field appearance="outline">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>

        <div class="flex gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Due Date</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="dueDate" required>
            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Priority</mat-label>
            <mat-select formControlName="priority" required>
              <mat-option value="Low">Low</mat-option>
              <mat-option value="Medium">Medium</mat-option>
              <mat-option value="High">High</mat-option>
              <mat-option value="Critical">Critical</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="flex gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Assigned To</mat-label>
            <input matInput formControlName="assignedTo" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Status</mat-label>
            <mat-select formControlName="status" required>
              <mat-option value="Pending">Pending</mat-option>
              <mat-option value="In Progress">In Progress</mat-option>
              <mat-option value="Completed">Completed</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [disabled]="taskForm.invalid" (click)="onSubmit()">
        Save
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      padding-top: 1rem !important;
    }
  `]
})
export class PatientTaskDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PatientTaskDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: [new Date(), Validators.required],
    priority: ['Medium', Validators.required],
    assignedTo: ['', Validators.required],
    status: ['Pending', Validators.required],
  });

  onSubmit() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }
}
