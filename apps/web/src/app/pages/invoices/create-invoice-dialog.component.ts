import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { ClientsService } from '../../services/clients.service';
import { PatientsService } from '../../services/patients.service';
import { Client, Patient } from '@vet-clinic/shared-types';
import { InvoiceLineItemDialogComponent, InvoiceLineItem } from './invoice-line-item-dialog.component';

@Component({
  selector: 'app-create-invoice-dialog',
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDividerModule,
  ],
  providers: [provideNativeDateAdapter()],
  template: `
    <div class="flex flex-col h-[90vh]">
      <h2 mat-dialog-title class="flex items-center justify-between m-0 py-6 px-8 border-b bg-surface">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm">
            <mat-icon aria-hidden="true">add_shopping_cart</mat-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-bold tracking-tight">Create New Invoice</span>
            <span class="text-xs text-on-surface-variant font-medium">Draft a new invoice for a client</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">Draft</span>
          <span class="text-sm font-mono font-bold text-on-surface-variant opacity-60">#{{ invoiceNumber }}</span>
        </div>
      </h2>

      <div mat-dialog-content class="p-8 pt-6 flex-1 overflow-y-auto">
        <form [formGroup]="invoiceForm" class="flex flex-col gap-8">
          
          <!-- Client & Patient Section -->
          <section class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-surface-variant/20 rounded-3xl border border-outline/50">
            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Select Client</mat-label>
              <mat-select formControlName="clientId" (selectionChange)="onClientChange($event.value)">
                @for (client of clients; track client.id) {
                  <mat-option [value]="client.id">{{ client.firstName }} {{ client.lastName }}</mat-option>
                }
              </mat-select>
              <mat-icon matPrefix class="mr-2 opacity-40">person</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Select Patient</mat-label>
              <mat-select formControlName="patientId">
                @for (patient of filteredPatients; track patient.id) {
                  <mat-option [value]="patient.id">{{ patient.name }} ({{ patient.species }})</mat-option>
                }
                @if (filteredPatients.length === 0) {
                  <mat-option disabled>Select a client first</mat-option>
                }
              </mat-select>
              <mat-icon matPrefix class="mr-2 opacity-40">pets</mat-icon>
            </mat-form-field>
          </section>

          <!-- Metadata Section -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Invoice Date</mat-label>
              <input matInput [matDatepicker]="datePicker" formControlName="date">
              <mat-datepicker-toggle matSuffix [for]="datePicker"></mat-datepicker-toggle>
              <mat-datepicker #datePicker></mat-datepicker>
            </mat-form-field>

            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Due Date</mat-label>
              <input matInput [matDatepicker]="dueDatePicker" formControlName="dueDate">
              <mat-datepicker-toggle matSuffix [for]="dueDatePicker"></mat-datepicker-toggle>
              <mat-datepicker #dueDatePicker></mat-datepicker>
            </mat-form-field>

            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Status</mat-label>
              <mat-select formControlName="status">
                <mat-option value="Pending">Pending</mat-option>
                <mat-option value="Paid">Paid</mat-option>
                <mat-option value="Draft">Draft</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <!-- Line Items Section -->
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center px-2">
              <h3 class="text-lg font-bold text-on-surface m-0">Line Items</h3>
              <button mat-stroked-button color="primary" type="button" (click)="addLineItem()">
                <mat-icon class="mr-2">add</mat-icon>
                Add Item
              </button>
            </div>

            <div class="border border-outline rounded-2xl overflow-hidden bg-surface">
              <table mat-table [dataSource]="lineItems" class="w-full">
                <ng-container matColumnDef="description">
                  <th mat-header-cell *matHeaderCellDef class="bg-surface-variant/50 font-bold uppercase text-[10px] tracking-widest px-4">Description</th>
                  <td mat-cell *matCellDef="let item" class="px-4 py-3">
                    <div class="font-bold text-on-surface">{{ item.description }}</div>
                    <div class="text-[10px] text-on-surface-variant opacity-60 uppercase">{{ item.category }}</div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="quantity">
                  <th mat-header-cell *matHeaderCellDef class="bg-surface-variant/50 font-bold uppercase text-[10px] tracking-widest text-center">Qty</th>
                  <td mat-cell *matCellDef="let item" class="text-center">{{ item.quantity }}</td>
                </ng-container>

                <ng-container matColumnDef="unitPrice">
                  <th mat-header-cell *matHeaderCellDef class="bg-surface-variant/50 font-bold uppercase text-[10px] tracking-widest text-right">Unit Price</th>
                  <td mat-cell *matCellDef="let item" class="text-right">{{ item.unitPrice | currency }}</td>
                </ng-container>

                <ng-container matColumnDef="total">
                  <th mat-header-cell *matHeaderCellDef class="bg-surface-variant/50 font-bold uppercase text-[10px] tracking-widest text-right px-4">Total</th>
                  <td mat-cell *matCellDef="let item" class="text-right font-black text-on-surface px-4">{{ item.total | currency }}</td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef class="bg-surface-variant/50 text-right pr-4"></th>
                  <td mat-cell *matCellDef="let index = index" class="text-right pr-4">
                    <button mat-icon-button color="warn" (click)="removeLineItem(index)">
                      <mat-icon>delete_outline</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>

                <!-- Empty State -->
                <tr *matNoDataRow>
                  <td [attr.colspan]="displayedColumns.length" class="p-12 text-center text-on-surface-variant opacity-60 italic">
                    No items added yet. Click "Add Item" to start.
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Invoice Notes</mat-label>
            <textarea matInput formControlName="notes" rows="3" placeholder="Additional information for the client..."></textarea>
          </mat-form-field>
        </form>
      </div>

      <div mat-dialog-actions class="flex flex-col sm:flex-row justify-between items-center px-8 py-6 bg-surface-variant/30 border-t border-outline gap-6">
        <div class="flex flex-col items-center sm:items-start">
          <span class="text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-1">Grand Total</span>
          <span class="text-4xl font-black text-primary leading-none">{{ grandTotal | currency }}</span>
        </div>
        
        <div class="flex gap-3">
          <button mat-button (click)="onCancel()" class="px-6 rounded-xl font-bold h-12">Cancel</button>
          <button 
            mat-flat-button 
            color="primary" 
            [disabled]="invoiceForm.invalid || lineItems.length === 0" 
            (click)="onSubmit()"
            class="px-10 rounded-xl font-bold h-12 shadow-lg"
          >
            Create Invoice <mat-icon class="ml-2">check</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 900px;
      max-width: 95vw;
    }
    .mat-mdc-dialog-content {
      max-height: none !important;
    }
    table {
      width: 100%;
      background: transparent !important;
    }
  `]
})
export class CreateInvoiceDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<CreateInvoiceDialogComponent>);
  private clientsService = inject(ClientsService);
  private patientsService = inject(PatientsService);

  invoiceForm: FormGroup;
  clients: Client[] = [];
  allPatients: Patient[] = [];
  filteredPatients: Patient[] = [];
  lineItems: InvoiceLineItem[] = [];
  displayedColumns: string[] = ['description', 'quantity', 'unitPrice', 'total', 'actions'];
  invoiceNumber = 'INV-' + Math.floor(100000 + Math.random() * 900000);

  constructor() {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 14);

    this.invoiceForm = this.fb.group({
      clientId: ['', Validators.required],
      patientId: ['', Validators.required],
      date: [today, Validators.required],
      dueDate: [nextWeek, Validators.required],
      status: ['Pending', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.clientsService.getClients().subscribe(clients => this.clients = clients);
    this.patientsService.getPatients().subscribe(patients => this.allPatients = patients);
  }

  onClientChange(clientId: number): void {
    this.filteredPatients = this.allPatients.filter(p => p.clientId === clientId);
    this.invoiceForm.patchValue({ patientId: '' });
  }

  addLineItem(): void {
    const dialogRef = this.dialog.open(InvoiceLineItemDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe((result: InvoiceLineItem) => {
      if (result) {
        this.lineItems = [...this.lineItems, result];
      }
    });
  }

  removeLineItem(index: number): void {
    this.lineItems = this.lineItems.filter((_, i) => i !== index);
  }

  get grandTotal(): number {
    return this.lineItems.reduce((acc, item) => acc + (item.total || 0), 0);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.invoiceForm.valid && this.lineItems.length > 0) {
      const finalInvoice = {
        ...this.invoiceForm.value,
        invoiceNumber: this.invoiceNumber,
        items: this.lineItems,
        totalAmount: this.grandTotal
      };
      this.dialogRef.close(finalInvoice);
    }
  }
}
