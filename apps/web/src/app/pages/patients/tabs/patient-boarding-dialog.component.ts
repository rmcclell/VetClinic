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
  selector: 'app-patient-boarding-dialog',
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
    <h2 mat-dialog-title>Add Boarding Reservation</h2>
    <mat-dialog-content>
      <form [formGroup]="boardingForm" class="flex flex-col gap-4 mt-2">
        <div class="flex gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Check In Date</mat-label>
            <input matInput [matDatepicker]="checkInPicker" formControlName="checkIn" required>
            <mat-datepicker-toggle matIconSuffix [for]="checkInPicker"></mat-datepicker-toggle>
            <mat-datepicker #checkInPicker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Check Out Date</mat-label>
            <input matInput [matDatepicker]="checkOutPicker" formControlName="checkOut" required>
            <mat-datepicker-toggle matIconSuffix [for]="checkOutPicker"></mat-datepicker-toggle>
            <mat-datepicker #checkOutPicker></mat-datepicker>
          </mat-form-field>
        </div>

        <div class="flex gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Client</mat-label>
            <input matInput formControlName="client" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Boarding Resource (e.g. Kennel 1)</mat-label>
            <input matInput formControlName="resource" required>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status" required>
            <mat-option value="Active">Active</mat-option>
            <mat-option value="Reserved">Reserved</mat-option>
            <mat-option value="Completed">Completed</mat-option>
            <mat-option value="Canceled">Canceled</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Boarding Details</mat-label>
          <input matInput formControlName="details" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Notes</mat-label>
          <textarea matInput formControlName="notes" rows="3"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [disabled]="boardingForm.invalid" (click)="onSubmit()">
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
export class PatientBoardingDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PatientBoardingDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  boardingForm: FormGroup = this.fb.group({
    checkIn: [new Date(), Validators.required],
    checkOut: [new Date(), Validators.required],
    client: ['', Validators.required],
    resource: ['', Validators.required],
    status: ['Reserved', Validators.required],
    details: ['', Validators.required],
    notes: [''],
  });

  onSubmit() {
    if (this.boardingForm.valid) {
      this.dialogRef.close(this.boardingForm.value);
    }
  }
}
