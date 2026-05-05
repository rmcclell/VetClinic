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
  selector: 'app-patient-prescription-dialog',
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
    <h2 mat-dialog-title>{{ data?.id ? 'Edit' : 'Add' }} Prescription</h2>
    <mat-dialog-content>
      <form [formGroup]="prescriptionForm" class="flex flex-col gap-4 mt-2">
        <mat-form-field appearance="outline">
          <mat-label>Prescription Name</mat-label>
          <input matInput formControlName="name" required>
        </mat-form-field>

        <div class="flex gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Quantity</mat-label>
            <input matInput formControlName="quantity" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Type</mat-label>
            <input matInput formControlName="type" required>
          </mat-form-field>
        </div>

        <div class="flex gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Creation Date</mat-label>
            <input matInput [matDatepicker]="creationPicker" formControlName="creationDate" required>
            <mat-datepicker-toggle matIconSuffix [for]="creationPicker"></mat-datepicker-toggle>
            <mat-datepicker #creationPicker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Valid Thru</mat-label>
            <input matInput [matDatepicker]="validThruPicker" formControlName="validThru" required>
            <mat-datepicker-toggle matIconSuffix [for]="validThruPicker"></mat-datepicker-toggle>
            <mat-datepicker #validThruPicker></mat-datepicker>
          </mat-form-field>
        </div>

        <div class="flex gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Refill Count</mat-label>
            <input matInput type="number" formControlName="refillCount" required min="0">
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Last Refill</mat-label>
            <input matInput [matDatepicker]="lastRefillPicker" formControlName="lastRefill" required>
            <mat-datepicker-toggle matIconSuffix [for]="lastRefillPicker"></mat-datepicker-toggle>
            <mat-datepicker #lastRefillPicker></mat-datepicker>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Directions</mat-label>
          <textarea matInput formControlName="directions" rows="3" required></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [disabled]="prescriptionForm.invalid" (click)="onSubmit()">
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
export class PatientPrescriptionDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PatientPrescriptionDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  prescriptionForm: FormGroup = this.fb.group({
    name: [this.data?.name || '', Validators.required],
    quantity: [this.data?.quantity || '', Validators.required],
    type: [this.data?.type || '', Validators.required],
    creationDate: [this.data?.creationDate ? new Date(this.data.creationDate) : new Date(), Validators.required],
    validThru: [this.data?.validThru ? new Date(this.data.validThru) : new Date(), Validators.required],
    refillCount: [this.data?.refillCount || 0, Validators.required],
    lastRefill: [this.data?.lastRefill ? new Date(this.data.lastRefill) : new Date(), Validators.required],
    directions: [this.data?.directions || '', Validators.required],
  });

  onSubmit() {
    if (this.prescriptionForm.valid) {
      this.dialogRef.close({ ...this.data, ...this.prescriptionForm.value });
    }
  }
}
