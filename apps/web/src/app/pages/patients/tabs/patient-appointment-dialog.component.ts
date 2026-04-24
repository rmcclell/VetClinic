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
  selector: 'app-patient-appointment-dialog',
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
    <h2 mat-dialog-title>Add Appointment</h2>
    <mat-dialog-content>
      <form [formGroup]="appointmentForm" class="flex flex-col gap-4 mt-2">
        <div class="flex gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Date</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="date" required>
            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Time (e.g. 10:00 AM)</mat-label>
            <input matInput formControlName="time" required>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Client</mat-label>
          <input matInput formControlName="client" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Appointment Type</mat-label>
          <input matInput formControlName="type" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Provider</mat-label>
          <input matInput formControlName="provider" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status" required>
            <mat-option value="Upcoming">Upcoming</mat-option>
            <mat-option value="Pending Confirmation">Pending Confirmation</mat-option>
            <mat-option value="Completed">Completed</mat-option>
            <mat-option value="Canceled">Canceled</mat-option>
            <mat-option value="No Show">No Show</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [disabled]="appointmentForm.invalid" (click)="onSubmit()">
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
export class PatientAppointmentDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PatientAppointmentDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  appointmentForm: FormGroup = this.fb.group({
    date: [new Date(), Validators.required],
    time: ['', Validators.required],
    client: ['', Validators.required],
    type: ['', Validators.required],
    provider: ['', Validators.required],
    status: ['Upcoming', Validators.required],
  });

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    }
  }
}
