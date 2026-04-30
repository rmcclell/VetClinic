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
  selector: 'app-client-appointment-dialog',
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
    <form [formGroup]="appointmentForm" (ngSubmit)="onSave()" class="flex flex-col">
      <h2 mat-dialog-title class="flex items-center gap-3 m-0 py-4 border-b">
        <mat-icon color="primary">event</mat-icon>
        <span class="font-semibold">Schedule Appointment</span>
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
            @if (appointmentForm.get('patientId')?.hasError('required')) {
              <mat-error>Please select a patient</mat-error>
            }
          </mat-form-field>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Date</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="date" />
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>

            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Time (e.g. 10:00 AM)</mat-label>
              <input matInput formControlName="time" placeholder="10:00 AM" />
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Appointment Type</mat-label>
            <input matInput formControlName="type" placeholder="e.g. Annual Exam, Vaccines" />
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Provider</mat-label>
            <input matInput formControlName="provider" placeholder="e.g. Dr. Smith" />
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Status</mat-label>
            <mat-select formControlName="status">
              <mat-option value="Scheduled">Scheduled</mat-option>
              <mat-option value="Pending Confirmation">Pending Confirmation</mat-option>
              <mat-option value="Completed">Completed</mat-option>
              <mat-option value="Canceled">Canceled</mat-option>
              <mat-option value="No Show">No Show</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="p-6 border-t gap-2">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button
          mat-flat-button
          color="primary"
          type="submit"
          [disabled]="appointmentForm.invalid"
          class="px-8 py-1 rounded-lg"
        >
          <mat-icon class="mr-2">calendar_today</mat-icon>
          Schedule
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
export class ClientAppointmentDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClientAppointmentDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  public appointmentForm = this.fb.group({
    patientId: [null as number | null, Validators.required],
    date: [new Date(), Validators.required],
    time: ['', Validators.required],
    type: ['', Validators.required],
    provider: ['', Validators.required],
    status: ['Scheduled', Validators.required],
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    }
  }
}
