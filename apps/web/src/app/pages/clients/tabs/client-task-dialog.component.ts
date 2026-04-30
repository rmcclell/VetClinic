import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-client-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  template: `
    <form [formGroup]="taskForm" (ngSubmit)="onSave()" class="flex flex-col">
      <h2 mat-dialog-title class="flex items-center gap-3 m-0 py-4 border-b">
        <mat-icon color="primary">assignment</mat-icon>
        <span class="font-semibold">Add New Task</span>
      </h2>

      <mat-dialog-content>
        <div class="flex flex-col gap-6 pt-2">
          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Related Patient (Optional)</mat-label>
            <mat-select formControlName="patientId">
              <mat-option [value]="null">General Client Task</mat-option>
              @for (p of data.patients; track p.id) {
                <mat-option [value]="p.id">
                  {{ p.name }} ({{ p.species }})
                </mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Task Title</mat-label>
            <input matInput formControlName="title" placeholder="e.g. Call regarding bloodwork" />
            @if (taskForm.get('title')?.hasError('required')) {
              <mat-error>Title is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" rows="3" placeholder="Additional details..."></textarea>
          </mat-form-field>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Due Date</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="dueDate" />
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>

            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Priority</mat-label>
              <mat-select formControlName="priority">
                <mat-option value="Low">Low</mat-option>
                <mat-option value="Medium">Medium</mat-option>
                <mat-option value="High">High</mat-option>
                <mat-option value="Critical">Critical</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Assigned To</mat-label>
              <input matInput formControlName="assignedTo" placeholder="e.g. Dr. Smith" />
            </mat-form-field>

            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Status</mat-label>
              <mat-select formControlName="status">
                <mat-option value="Pending">Pending</mat-option>
                <mat-option value="In Progress">In Progress</mat-option>
                <mat-option value="Completed">Completed</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="p-6 border-t gap-2">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button
          mat-flat-button
          color="primary"
          type="submit"
          [disabled]="taskForm.invalid"
          class="px-8 py-1 rounded-lg"
        >
          <mat-icon class="mr-2">add_task</mat-icon>
          Add Task
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .mat-mdc-dialog-title {
        padding: 24px 24px 20px !important;
        margin: 0 !important;
        display: flex !important;
        align-items: center;
      }
      .mat-mdc-dialog-content {
        padding: 32px 24px !important;
        max-height: 70vh;
        overflow-x: hidden !important;
      }
      .mat-mdc-dialog-actions {
        padding: 16px 24px !important;
        margin-bottom: 0 !important;
      }
    `,
  ],
})
export class ClientTaskDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClientTaskDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  public taskForm = this.fb.group({
    patientId: [null as number | null],
    title: ['', Validators.required],
    description: [''],
    dueDate: [new Date(), Validators.required],
    priority: ['Medium', Validators.required],
    assignedTo: ['', Validators.required],
    status: ['Pending', Validators.required],
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }
}
