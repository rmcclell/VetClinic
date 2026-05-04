import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-export-invoices-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  template: `
    <div class="p-6">
      <h2 mat-dialog-title class="flex items-center gap-2 m-0 mb-4 text-2xl font-bold text-on-surface">
        <mat-icon color="primary">download</mat-icon>
        Export Invoices
      </h2>
      
      <div mat-dialog-content>
        <p class="text-on-surface-variant mb-6">
          Select a date range to filter the invoices for export. All fields are required.
        </p>
        
        <form [formGroup]="exportForm" class="flex flex-col gap-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Enter a date range</mat-label>
            <mat-date-range-input [rangePicker]="picker">
              <input matStartDate formControlName="start" placeholder="Start date">
              <input matEndDate formControlName="end" placeholder="End date">
            </mat-date-range-input>
            <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-date-range-picker #picker></mat-date-range-picker>
            
            @if (exportForm.controls['start'].hasError('required') || exportForm.controls['end'].hasError('required')) {
              <mat-error>Date range is required</mat-error>
            }
          </mat-form-field>
        </form>
      </div>
      
      <div mat-dialog-actions class="flex justify-end gap-3 mt-8">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button 
          mat-raised-button 
          color="primary" 
          [disabled]="exportForm.invalid"
          (click)="onExport()"
        >
          <mat-icon class="mr-1">download</mat-icon>
          Download CSV
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 450px;
    }
  `]
})
export class ExportInvoicesDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ExportInvoicesDialogComponent>);

  exportForm: FormGroup = this.fb.group({
    start: [null, Validators.required],
    end: [null, Validators.required]
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onExport(): void {
    if (this.exportForm.valid) {
      this.dialogRef.close(this.exportForm.value);
    }
  }
}
