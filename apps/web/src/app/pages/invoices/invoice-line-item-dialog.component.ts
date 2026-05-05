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
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate?: number;
  category?: string;
  total?: number;
}

@Component({
  selector: 'app-invoice-line-item-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
  ],
  template: `
    <div class="flex flex-col h-full">
      <h2 mat-dialog-title class="flex items-center gap-3 m-0 py-6 px-8 border-b bg-surface">
        <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
          <mat-icon aria-hidden="true">list_alt</mat-icon>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold tracking-tight">Add Line Item</span>
          <span class="text-xs text-on-surface-variant font-medium">Add a new service or product to this invoice</span>
        </div>
      </h2>

      <div mat-dialog-content class="p-8 pt-6">
        <form [formGroup]="itemForm" class="flex flex-col gap-6">
          
          <div class="flex flex-col sm:flex-row gap-4">
            <mat-form-field appearance="outline" class="flex-1" subscriptSizing="dynamic">
              <mat-label>Category</mat-label>
              <mat-select formControlName="category">
                <mat-option value="Service">Service</mat-option>
                <mat-option value="Product">Product</mat-option>
                <mat-option value="Medication">Medication</mat-option>
                <mat-option value="Lab">Lab/Testing</mat-option>
                <mat-option value="Other">Other</mat-option>
              </mat-select>
              <mat-icon matPrefix class="mr-2 opacity-40">category</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="flex-[2]" subscriptSizing="dynamic">
              <mat-label>Item Description</mat-label>
              <input matInput formControlName="description" placeholder="e.g. Wellness Exam" required>
              <mat-icon matPrefix class="mr-2 opacity-40">description</mat-icon>
            </mat-form-field>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Quantity</mat-label>
              <input matInput type="number" formControlName="quantity" min="1" required>
              <mat-icon matPrefix class="mr-2 opacity-40">numbers</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Unit Price</mat-label>
              <span matTextPrefix>$&nbsp;</span>
              <input matInput type="number" step="0.01" formControlName="unitPrice" required>
            </mat-form-field>

            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Tax Rate (%)</mat-label>
              <input matInput type="number" step="0.1" formControlName="taxRate">
              <mat-icon matSuffix class="opacity-40">percent</mat-icon>
            </mat-form-field>
          </div>

          <div class="bg-surface-variant/30 rounded-2xl p-6 border border-outline border-dashed">
            <div class="flex justify-between items-center text-sm mb-2 opacity-70">
              <span>Subtotal</span>
              <span>{{ subtotal | currency }}</span>
            </div>
            <div class="flex justify-between items-center text-sm mb-4 opacity-70">
              <span>Estimated Tax</span>
              <span>{{ taxAmount | currency }}</span>
            </div>
            <mat-divider class="mb-4"></mat-divider>
            <div class="flex justify-between items-center">
              <span class="font-bold text-on-surface">Total Amount</span>
              <span class="text-2xl font-black text-primary">{{ totalAmount | currency }}</span>
            </div>
          </div>
        </form>
      </div>

      <div mat-dialog-actions class="justify-end px-8 py-6 bg-surface-variant/30 border-t border-outline gap-3">
        <button mat-button (click)="onCancel()" class="px-6 rounded-xl font-bold">Cancel</button>
        <button 
          mat-flat-button 
          color="primary" 
          [disabled]="itemForm.invalid" 
          (click)="onSubmit()"
          class="px-8 rounded-xl font-bold shadow-lg"
        >
          Add Item <mat-icon class="ml-2 text-sm">add</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 600px;
      max-width: 95vw;
    }
    .mat-mdc-dialog-content {
      max-height: none !important;
    }
  `]
})
export class InvoiceLineItemDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<InvoiceLineItemDialogComponent>);
  public data = inject(MAT_DIALOG_DATA, { optional: true });

  itemForm: FormGroup = this.fb.group({
    description: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    unitPrice: [0.00, [Validators.required, Validators.min(0)]],
    taxRate: [0, [Validators.min(0)]],
    category: ['Service'],
  });

  get subtotal(): number {
    const q = this.itemForm.get('quantity')?.value || 0;
    const p = this.itemForm.get('unitPrice')?.value || 0;
    return q * p;
  }

  get taxAmount(): number {
    const t = this.itemForm.get('taxRate')?.value || 0;
    return (this.subtotal * t) / 100;
  }

  get totalAmount(): number {
    return this.subtotal + this.taxAmount;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const result: InvoiceLineItem = {
        ...this.itemForm.value,
        total: this.totalAmount
      };
      this.dialogRef.close(result);
    }
  }
}
