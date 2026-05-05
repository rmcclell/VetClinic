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
  selector: 'app-patient-history-dialog',
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
    <h2 mat-dialog-title>{{ data?.id ? 'Edit' : 'Add' }} Medical History</h2>
    <mat-dialog-content>
      <form [formGroup]="historyForm" class="flex flex-col gap-4 mt-2">
        <mat-form-field appearance="outline">
          <mat-label>Type</mat-label>
          <mat-select formControlName="type" required>
            <mat-option value="SOAP">SOAP</mat-option>
            <mat-option value="Prescription">Prescription</mat-option>
            <mat-option value="Weight">Weight</mat-option>
            <mat-option value="File">File</mat-option>
            <mat-option value="Task">Task</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status" required>
            <mat-option value="Completed">Completed</mat-option>
            <mat-option value="Locked">Locked</mat-option>
            <mat-option value="PRN">PRN</mat-option>
            <mat-option value="Uploaded">Uploaded</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="date" required>
          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Details</mat-label>
          <textarea matInput formControlName="details" rows="4" required></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Doctor</mat-label>
          <input matInput formControlName="doctor" required>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [disabled]="historyForm.invalid" (click)="onSubmit()">
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
export class PatientHistoryDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PatientHistoryDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  historyForm: FormGroup = this.fb.group({
    type: [this.data?.type || '', Validators.required],
    status: [this.data?.status || '', Validators.required],
    date: [this.data?.date ? new Date(this.data.date) : new Date(), Validators.required],
    details: [this.data?.details || '', Validators.required],
    doctor: [this.data?.doctor?.name || '', Validators.required],
  });

  onSubmit() {
    if (this.historyForm.valid) {
      const formValue = this.historyForm.value;
      const result = {
        ...this.data,
        type: formValue.type,
        status: formValue.status,
        date: formValue.date,
        details: formValue.details,
        doctor: { 
          name: formValue.doctor, 
          initials: formValue.doctor.substring(0, 2).toUpperCase() 
        }
      };
      this.dialogRef.close(result);
    }
  }
}
