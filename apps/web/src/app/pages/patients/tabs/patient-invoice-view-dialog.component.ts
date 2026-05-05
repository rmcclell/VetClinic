import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { InvoiceItem } from '../patient-tabs.types';

@Component({
  selector: 'app-patient-invoice-view-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  template: `
    <div class="flex flex-col h-full max-h-[90vh]">
      <h2 mat-dialog-title class="flex items-center justify-between m-0 py-6 px-8 border-b bg-surface">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-sm">
            <mat-icon aria-hidden="true">receipt_long</mat-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-bold tracking-tight">Invoice Details</span>
            <span class="text-xs text-on-surface-variant font-medium">Invoice #{{ data.invoiceNumber }}</span>
          </div>
        </div>
        <button mat-icon-button mat-dialog-close aria-label="Close dialog">
          <mat-icon aria-hidden="true">close</mat-icon>
        </button>
      </h2>

      <div mat-dialog-content class="p-8 pt-6 overflow-y-auto bg-[#fafafa]">
        <!-- Invoice Header -->
        <div class="flex flex-col gap-8 bg-white p-8 rounded-3xl shadow-sm border border-outline/30 relative overflow-hidden">
          <!-- Branding Element -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
          
          <div class="flex justify-between items-start z-10">
            <div class="flex flex-col gap-1">
              <span class="text-2xl font-black text-on-surface uppercase tracking-tighter">VetClinic</span>
              <span class="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Premium Care Services</span>
            </div>
            <div class="flex flex-col items-end gap-1">
              <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Invoice Date</span>
              <span class="font-bold text-on-surface">{{ data.date | date:'longDate' }}</span>
            </div>
          </div>

          <mat-divider></mat-divider>

          <!-- Line Items Table Header -->
          <div class="grid grid-cols-12 gap-4 pb-2 border-b-2 border-surface-variant/50">
            <div class="col-span-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Description</div>
            <div class="col-span-2 text-center text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Qty</div>
            <div class="col-span-2 text-right text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Price</div>
            <div class="col-span-2 text-right text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Total</div>
          </div>

          <!-- Line Item Row -->
          <div class="grid grid-cols-12 gap-4 py-4 items-center">
            <div class="col-span-6">
              <div class="font-bold text-on-surface text-lg">{{ data.description }}</div>
              <div class="text-xs text-on-surface-variant">Professional Veterinary Services</div>
            </div>
            <div class="col-span-2 text-center font-bold text-on-surface">x {{ data.quantity }}</div>
            <div class="col-span-2 text-right text-on-surface-variant">{{ data.price | currency }}</div>
            <div class="col-span-2 text-right font-black text-on-surface text-lg">{{ (data.quantity * data.price) | currency }}</div>
          </div>

          <!-- Totals Section -->
          <div class="flex flex-col gap-3 pt-6 border-t border-outline/20 items-end">
            <div class="flex gap-8 justify-between w-48 text-sm">
              <span class="text-on-surface-variant font-medium">Subtotal:</span>
              <span class="text-on-surface font-bold">{{ (data.quantity * data.price) | currency }}</span>
            </div>
            <div class="flex gap-8 justify-between w-48 text-sm">
              <span class="text-on-surface-variant font-medium">Tax (0%):</span>
              <span class="text-on-surface font-bold">$0.00</span>
            </div>
            <div class="flex gap-8 justify-between w-48 p-4 bg-amber-50 rounded-2xl border border-amber-200 mt-2">
              <span class="text-amber-900 font-black uppercase tracking-widest text-xs self-center">Grand Total</span>
              <span class="text-amber-900 font-black text-xl">{{ (data.quantity * data.price) | currency }}</span>
            </div>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="mt-8 flex flex-col items-center gap-2 opacity-50">
          <span class="text-[10px] uppercase font-bold tracking-widest">Thank you for choosing VetClinic</span>
          <div class="flex gap-4 text-[10px] font-medium italic">
            <span>www.vetclinic.com</span>
            <span>•</span>
            <span>(555) 012-3456</span>
          </div>
        </div>
      </div>

      <div mat-dialog-actions class="justify-end px-8 py-6 bg-surface-variant/30 border-t border-outline gap-3">
        <button mat-stroked-button (click)="onEdit()" class="px-6 rounded-xl font-bold h-12">
          <mat-icon class="mr-2">edit</mat-icon> Edit Invoice
        </button>
        <button mat-flat-button color="primary" mat-dialog-close class="px-8 rounded-xl font-bold h-12 shadow-lg">
          Close Preview
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 750px;
      max-width: 95vw;
    }
  `]
})
export class PatientInvoiceViewDialogComponent {
  private dialogRef = inject(MatDialogRef<PatientInvoiceViewDialogComponent>);
  public data = inject(MAT_DIALOG_DATA) as InvoiceItem;

  onEdit(): void {
    this.dialogRef.close('EDIT');
  }
}
