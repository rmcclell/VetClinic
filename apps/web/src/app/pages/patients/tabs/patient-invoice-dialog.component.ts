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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-patient-invoice-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  template: `
    <h2 mat-dialog-title>Add Invoice</h2>
    <mat-dialog-content>
      <form [formGroup]="invoiceForm" class="flex flex-col gap-4 mt-2">
        <div class="flex gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Invoice Number</mat-label>
            <input matInput formControlName="invoiceNumber" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Date</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="date" required>
            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <input matInput formControlName="description" required>
        </mat-form-field>

        <div class="flex gap-4">
          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Quantity</mat-label>
            <input matInput type="number" formControlName="quantity" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="flex-1">
            <mat-label>Price</mat-label>
            <span matTextPrefix>$&nbsp;</span>
            <input matInput type="number" step="0.01" formControlName="price" required>
          </mat-form-field>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [disabled]="invoiceForm.invalid" (click)="onSubmit()">
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
export class PatientInvoiceDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PatientInvoiceDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  invoiceForm: FormGroup = this.fb.group({
    invoiceNumber: ['', Validators.required],
    date: [new Date(), Validators.required],
    description: ['', Validators.required],
    quantity: [1, Validators.required],
    price: [0.00, Validators.required],
  });

  onSubmit() {
    if (this.invoiceForm.valid) {
      this.dialogRef.close(this.invoiceForm.value);
    }
  }
}
