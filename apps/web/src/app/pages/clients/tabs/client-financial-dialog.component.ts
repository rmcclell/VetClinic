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
  selector: 'app-client-financial-dialog',
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
    <form [formGroup]="financialForm" (ngSubmit)="onSave()" class="flex flex-col">
      <h2 mat-dialog-title class="flex items-center gap-3 m-0 py-4 border-b">
        <mat-icon color="primary">{{ data.type === 'estimate' ? 'request_quote' : 'receipt' }}</mat-icon>
        <span class="font-semibold">{{ data.type === 'estimate' ? 'New Estimate' : 'Create Invoice' }}</span>
      </h2>

      <mat-dialog-content>
        <div class="flex flex-col gap-6 pt-2">
          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Select Patient</mat-label>
            <mat-select formControlName="patientId">
              <mat-option [value]="null">General Client Charge</mat-option>
              @for (p of data.patients; track p.id) {
                <mat-option [value]="p.id">
                  {{ p.name }} ({{ p.species }})
                </mat-option>
              }
            </mat-select>
          </mat-form-field>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Date</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="date" />
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>

            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Status</mat-label>
              <mat-select formControlName="status">
                @if (data.type === 'estimate') {
                  <mat-option value="Draft">Draft</mat-option>
                  <mat-option value="Sent">Sent</mat-option>
                  <mat-option value="Approved">Approved</mat-option>
                  <mat-option value="Declined">Declined</mat-option>
                  <mat-option value="Expired">Expired</mat-option>
                } @else {
                  <mat-option value="Draft">Draft</mat-option>
                  <mat-option value="Open">Open</mat-option>
                  <mat-option value="Paid">Paid</mat-option>
                  <mat-option value="Checked Out">Checked Out</mat-option>
                  <mat-option value="Void">Void</mat-option>
                }
              </mat-select>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Total Amount</mat-label>
            <input matInput type="number" formControlName="total" placeholder="0.00" />
            <span matPrefix>$&nbsp;</span>
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Notes / Memo</mat-label>
            <textarea matInput formControlName="notes" rows="3" placeholder="Additional details..."></textarea>
          </mat-form-field>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="p-6 border-t gap-2">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button
          mat-flat-button
          color="primary"
          type="submit"
          [disabled]="financialForm.invalid"
          class="px-8 py-1 rounded-lg"
        >
          <mat-icon class="mr-2">save</mat-icon>
          {{ data.type === 'estimate' ? 'Create Estimate' : 'Create Invoice' }}
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
export class ClientFinancialDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClientFinancialDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  public financialForm = this.fb.group({
    patientId: [null as number | null],
    date: [new Date(), Validators.required],
    status: [this.data.type === 'estimate' ? 'Draft' : 'Open', Validators.required],
    total: [0, [Validators.required, Validators.min(0)]],
    notes: [''],
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.financialForm.valid) {
      this.dialogRef.close(this.financialForm.value);
    }
  }
}
