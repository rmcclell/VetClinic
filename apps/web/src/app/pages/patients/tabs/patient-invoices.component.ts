import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { InvoiceItem } from '../patient-tabs.types';
import { DATE_FORMAT } from '../../../core/date-format.token';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientInvoiceDialogComponent } from './patient-invoice-dialog.component';
import { PatientInvoicePrintDialogComponent } from './patient-invoice-print-dialog.component';
import { PatientsService } from '../../../services/patients.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-invoices',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="flex flex-col h-full">
      <!-- Main Toolbar -->
      <mat-toolbar class="tab-toolbar">
        <button
          mat-icon-button
          matTooltip="Download"
          aria-label="Download invoices"
        >
          <mat-icon aria-hidden="true">download</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Print"
          aria-label="Print invoices"
          (click)="openPrintInvoiceDialog()"
        >
          <mat-icon aria-hidden="true">print</mat-icon>
        </button>
        <button mat-icon-button matTooltip="Email" aria-label="Email invoices">
          <mat-icon aria-hidden="true">email</mat-icon>
        </button>

        <mat-form-field
          appearance="outline"
          subscriptSizing="dynamic"
          class="grow mx-2"
        >
          <mat-icon matPrefix aria-hidden="true">search</mat-icon>
          <input
            matInput
            type="search"
            placeholder="Search invoices…"
            aria-label="Search invoices"
            (input)="applyFilter($event)"
          />
        </mat-form-field>

        <button mat-flat-button color="primary" aria-label="Add a new invoice" (click)="openAddInvoiceDialog()">
          <mat-icon aria-hidden="true">add</mat-icon> Add Invoice
        </button>
      </mat-toolbar>

      <!-- Summary Bar -->
      <div class="tab-summary-bar" role="status" aria-label="Invoice summary">
        <span class="summary-stat">
          <mat-icon class="text-[16px] h-4 w-4" aria-hidden="true"
            >receipt</mat-icon
          >
          <span>Total:</span>
          <strong>{{ total | currency }}</strong>
        </span>
        <span class="summary-stat">
          <span>{{ dataSource.data.length }} line(s)</span>
        </span>
      </div>

      <!-- Grid -->
      <div class="overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <!-- Invoice # Column -->
          <ng-container matColumnDef="invoiceNumber">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Invoice #</th>
            <td mat-cell *matCellDef="let element" class="font-medium">
              {{ element.invoiceNumber }}
            </td>
          </ng-container>

          <!-- Date Column -->
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Date</th>
            <td mat-cell *matCellDef="let element">
              {{ element.date | date: dateFormat }}
            </td>
          </ng-container>

          <!-- Description Column -->
          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Description
            </th>
            <td mat-cell *matCellDef="let element" class="font-medium">
              {{ element.description }}
            </td>
          </ng-container>

          <!-- Quantity Column -->
          <ng-container matColumnDef="quantity">
            <th
              mat-header-cell
              *matHeaderCellDef
              mat-sort-header
              class="text-right"
            >
              Qty
            </th>
            <td mat-cell *matCellDef="let element" class="text-right">
              {{ element.quantity }}
            </td>
          </ng-container>

          <!-- Price Column -->
          <ng-container matColumnDef="price">
            <th
              mat-header-cell
              *matHeaderCellDef
              mat-sort-header
              class="text-right"
            >
              Price
            </th>
            <td mat-cell *matCellDef="let element" class="text-right">
              {{ element.price | currency }}
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">
              <button
                mat-icon-button
                [matMenuTriggerFor]="rowMenu"
                [attr.aria-label]="
                  'Actions for invoice ' + element.invoiceNumber
                "
              >
                <mat-icon aria-hidden="true">more_vert</mat-icon>
              </button>
              <mat-menu #rowMenu="matMenu">
                <button
                  mat-menu-item
                  [attr.aria-label]="'View invoice ' + element.invoiceNumber"
                >
                  <mat-icon aria-hidden="true">visibility</mat-icon> View
                </button>
                <button
                  mat-menu-item
                  [attr.aria-label]="'Edit invoice ' + element.invoiceNumber"
                >
                  <mat-icon aria-hidden="true">edit</mat-icon> Edit
                </button>
                <mat-divider></mat-divider>
                <button
                  mat-menu-item
                  class="text-red-500"
                  [attr.aria-label]="'Delete invoice ' + element.invoiceNumber"
                >
                  <mat-icon color="warn" aria-hidden="true">delete</mat-icon>
                  Delete
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr
            mat-header-row
            *matHeaderRowDef="displayedInvoiceColumns; sticky: true"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedInvoiceColumns"
            class="hover:bg-surface-variant"
          ></tr>
          <tr class="mat-mdc-no-data-row" *matNoDataRow>
            <td
              [attr.colspan]="displayedInvoiceColumns.length"
              class="p-8 text-center text-on-surface-variant"
            >
              No records found
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,
})
export class PatientInvoicesComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);
  private dialog = inject(MatDialog);
  private patientsService = inject(PatientsService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) sort!: MatSort;

  invoiceItems: InvoiceItem[] = [
    {
      id: 1,
      invoiceNumber: '277',
      date: new Date('2025-11-21'),
      description: 'Urinalysis',
      quantity: 1,
      price: 0.0,
    },
    {
      id: 2,
      invoiceNumber: '276',
      date: new Date('2025-11-21'),
      description: 'Return: Urinalysis',
      quantity: -1,
      price: -39.5,
    },
    {
      id: 3,
      invoiceNumber: '264',
      date: new Date('2025-11-19'),
      description: 'Urinalysis',
      quantity: 1,
      price: 39.5,
    },
  ];

  dataSource = new MatTableDataSource(this.invoiceItems);
  displayedInvoiceColumns: string[] = [
    'invoiceNumber',
    'date',
    'description',
    'quantity',
    'price',
    'actions',
  ];

  get total(): number {
    return this.invoiceItems.reduce((sum, item) => sum + item.price, 0);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddInvoiceDialog() {
    const patientId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    const dialogRef = this.dialog.open(PatientInvoiceDialogComponent, {
      width: '600px',
      data: { patientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (patientId) {
          this.patientsService.addInvoice(patientId, result).subscribe({
            next: (newEntry) => {
               const entryToAdd = { ...result, id: Date.now() };
               this.invoiceItems = [entryToAdd, ...this.invoiceItems];
               this.dataSource.data = this.invoiceItems;
               this.snackBar.open('Invoice added successfully', 'Close', { duration: 3000 });
            },
            error: (err) => {
              console.error('Error adding invoice', err);
              const entryToAdd = { ...result, id: Date.now() };
              this.invoiceItems = [entryToAdd, ...this.invoiceItems];
              this.dataSource.data = this.invoiceItems;
              this.snackBar.open('Invoice added locally (API failed)', 'Close', { duration: 3000 });
            }
          });
        }
      }
    });
  }

  openPrintInvoiceDialog() {
    const dialogRef = this.dialog.open(PatientInvoicePrintDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Printing invoices with options:', result);
        this.snackBar.open('Preparing invoices for print...', 'Close', { duration: 3000 });
        setTimeout(() => window.print(), 500);
      }
    });
  }
}
