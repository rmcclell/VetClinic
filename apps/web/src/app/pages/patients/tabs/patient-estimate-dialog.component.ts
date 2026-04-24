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
  selector: 'app-patient-estimate-dialog',
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
    <h2 mat-dialog-title>Add Estimate</h2>
    <mat-dialog-content>
      <form [formGroup]="estimateForm" class="flex flex-col gap-4 mt-2">
        <mat-form-field appearance="outline">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" required>
        </mat-form-field>

        <div class="flex gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Date Created</mat-label>
            <input matInput [matDatepicker]="createdPicker" formControlName="dateCreated" required>
            <mat-datepicker-toggle matIconSuffix [for]="createdPicker"></mat-datepicker-toggle>
            <mat-datepicker #createdPicker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Expiration Date</mat-label>
            <input matInput [matDatepicker]="expPicker" formControlName="expirationDate" required>
            <mat-datepicker-toggle matIconSuffix [for]="expPicker"></mat-datepicker-toggle>
            <mat-datepicker #expPicker></mat-datepicker>
          </mat-form-field>
        </div>

        <div class="flex gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Status</mat-label>
            <mat-select formControlName="status" required>
              <mat-option value="Pending">Pending</mat-option>
              <mat-option value="Approved">Approved</mat-option>
              <mat-option value="Declined">Declined</mat-option>
              <mat-option value="Expired">Expired</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Estimated Charges</mat-label>
            <span matTextPrefix>$&nbsp;</span>
            <input matInput type="number" step="0.01" formControlName="estimatedCharges" required>
          </mat-form-field>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [disabled]="estimateForm.invalid" (click)="onSubmit()">
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
export class PatientEstimateDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PatientEstimateDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  estimateForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    dateCreated: [new Date(), Validators.required],
    expirationDate: [new Date(), Validators.required],
    status: ['Pending', Validators.required],
    estimatedCharges: [0.00, Validators.required],
    importedToSoap: [false]
  });

  onSubmit() {
    if (this.estimateForm.valid) {
      const result = this.estimateForm.value;
      if (result.status === 'Approved') {
         result.approvalDate = new Date();
      }
      this.dialogRef.close(result);
    }
  }
}
