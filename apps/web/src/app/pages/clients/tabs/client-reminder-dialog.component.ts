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
  selector: 'app-client-reminder-dialog',
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
    <form [formGroup]="reminderForm" (ngSubmit)="onSave()" class="flex flex-col">
      <h2 mat-dialog-title class="flex items-center gap-3 m-0 py-4 border-b">
        <mat-icon color="primary">notifications</mat-icon>
        <span class="font-semibold">Add New Reminder</span>
      </h2>

      <mat-dialog-content>
        <div class="flex flex-col gap-6 pt-2">
          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Select Patient</mat-label>
            <mat-select formControlName="patientId">
              @for (p of data.patients; track p.id) {
                <mat-option [value]="p.id">
                  {{ p.name }} ({{ p.species }})
                </mat-option>
              }
            </mat-select>
            @if (reminderForm.get('patientId')?.hasError('required')) {
              <mat-error>Please select a patient</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Reminder Type</mat-label>
            <input matInput formControlName="type" placeholder="e.g. Rabies Vaccine, Heartworm Preventative" />
            @if (reminderForm.get('type')?.hasError('required')) {
              <mat-error>Type is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Due Date</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="dueDate" />
            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Status</mat-label>
            <mat-select formControlName="status">
              <mat-option value="Upcoming">Upcoming</mat-option>
              <mat-option value="Due">Due</mat-option>
              <mat-option value="Overdue">Overdue</mat-option>
              <mat-option value="Completed">Completed</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Notes</mat-label>
            <textarea matInput formControlName="notes" rows="3" placeholder="Additional notes..."></textarea>
          </mat-form-field>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="p-6 border-t gap-2">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button
          mat-flat-button
          color="primary"
          type="submit"
          [disabled]="reminderForm.invalid"
          class="px-8 py-1 rounded-lg"
        >
          <mat-icon class="mr-2">save</mat-icon>
          Add Reminder
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
export class ClientReminderDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClientReminderDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  public reminderForm = this.fb.group({
    patientId: [null as number | null, Validators.required],
    type: ['', Validators.required],
    dueDate: [new Date(), Validators.required],
    status: ['Upcoming', Validators.required],
    notes: [''],
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.reminderForm.valid) {
      this.dialogRef.close(this.reminderForm.value);
    }
  }
}
