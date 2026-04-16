import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

@Component({
  selector: 'app-invoices-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
  ],
  template: `
    <mat-toolbar class="bg-surface-variant border-b border-outline h-18! px-6">
      <div class="flex gap-3 w-full md:w-auto grow items-center">
        <div class="bg-surface-variant border border-outline p-2 rounded-lg">
          <mat-icon class="text-on-surface">receipt</mat-icon>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-on-surface m-0">
            Invoices & Billing
          </h1>
          <p class="text-on-surface-variant text-sm opacity-80">
            Manage client billing and track payment status
          </p>
        </div>
      </div>
      <div class="flex gap-3 w-full md:w-auto items-center">
        <mat-form-field
          appearance="outline"
          class="w-full sm:w-80 dense-form-field"
          subscriptSizing="dynamic"
        >
          <mat-icon matPrefix class="mr-2 opacity-60">search</mat-icon>
          <mat-label>Search invoices or clients</mat-label>
          <input matInput placeholder="e.g. INV-2024" />
        </mat-form-field>
        <div class="flex gap-2">
          <button
            mat-stroked-button
            color="primary"
            aria-label="Filter invoices"
          >
            <mat-icon class="mr-1" aria-hidden="true">filter_list</mat-icon>
            Filter
          </button>
          <button
            mat-stroked-button
            color="primary"
            aria-label="Export invoices to file"
          >
            <mat-icon class="mr-1" aria-hidden="true">download</mat-icon> Export
          </button>
        </div>
        <button
          mat-raised-button
          color="primary"
          class="h-10"
          aria-label="Create a new invoice"
        >
          <mat-icon class="mr-2" aria-hidden="true">add</mat-icon> New Invoice
        </button>
      </div>
    </mat-toolbar>
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      <mat-card
        class="p-6 border-l-4 border-primary bg-surface shadow-none border border-outline"
      >
        <div class="flex justify-between items-start">
          <div>
            <p
              class="text-sm font-medium text-on-surface-variant uppercase tracking-wider mb-1"
            >
              Total Outstanding
            </p>
            <h3 class="text-3xl font-bold text-on-surface">$12,450.00</h3>
          </div>
          <div class="bg-surface-variant p-2 rounded-md">
            <mat-icon class="text-primary">account_balance_wallet</mat-icon>
          </div>
        </div>
        <p class="text-xs text-primary font-medium mt-3 flex items-center">
          <mat-icon class="text-xs w-4 h-4 mr-1">trending_up</mat-icon> +12%
          from last month
        </p>
      </mat-card>

      <mat-card
        class="p-6 border-l-4 border-amber-500 bg-surface shadow-none border border-outline"
      >
        <div class="flex justify-between items-start">
          <div>
            <p
              class="text-sm font-medium text-on-surface-variant uppercase tracking-wider mb-1"
            >
              Overdue Amount
            </p>
            <h3 class="text-3xl font-bold text-on-surface">$2,105.50</h3>
          </div>
          <div class="bg-surface-variant p-2 rounded-md">
            <mat-icon class="text-amber-600">warning</mat-icon>
          </div>
        </div>
        <p class="text-xs text-amber-600 font-medium mt-3 flex items-center">
          8 invoices overdue
        </p>
      </mat-card>

      <mat-card
        class="p-6 border-l-4 border-emerald-500 bg-surface shadow-none border border-outline"
      >
        <div class="flex justify-between items-start">
          <div>
            <p
              class="text-sm font-medium text-on-surface-variant uppercase tracking-wider mb-1"
            >
              Paid This Month
            </p>
            <h3 class="text-3xl font-bold text-on-surface">$8,920.00</h3>
          </div>
          <div class="bg-surface-variant p-2 rounded-md">
            <mat-icon class="text-emerald-600">check_circle</mat-icon>
          </div>
        </div>
        <p class="text-xs text-emerald-600 font-medium mt-3 flex items-center">
          <mat-icon class="text-xs w-4 h-4 mr-1">done_all</mat-icon> 24 invoices
          settled
        </p>
      </mat-card>
    </div>
    <div
      class="mat-elevation-z1 rounded-lg overflow-hidden border border-outline mt-6 bg-surface"
    >
      <!-- Filters & Table -->
      <table mat-table [dataSource]="invoices" class="w-full">
        <!-- ID/Number Column -->
        <ng-container matColumnDef="invoiceNumber">
          <th
            mat-header-cell
            *matHeaderCellDef
            class="bg-surface-variant text-on-surface-variant font-bold uppercase text-[11px] tracking-wider"
          >
            Invoice #
          </th>
          <td
            mat-cell
            *matCellDef="let invoice"
            class="font-medium text-indigo-600"
          >
            {{ invoice.invoiceNumber }}
          </td>
        </ng-container>

        <!-- Client Column -->
        <ng-container matColumnDef="clientName">
          <th
            mat-header-cell
            *matHeaderCellDef
            class="bg-surface-variant text-on-surface-variant font-bold uppercase text-[11px] tracking-wider"
          >
            Client
          </th>
          <td mat-cell *matCellDef="let invoice">
            {{ invoice.clientName }}
          </td>
        </ng-container>

        <!-- Date Column -->
        <ng-container matColumnDef="date">
          <th
            mat-header-cell
            *matHeaderCellDef
            class="bg-surface-variant text-on-surface-variant font-bold uppercase text-[11px] tracking-wider"
          >
            Date
          </th>
          <td
            mat-cell
            *matCellDef="let invoice"
            class="text-on-surface-variant"
          >
            {{ invoice.date }}
          </td>
        </ng-container>

        <!-- Status Column -->
        <ng-container matColumnDef="status">
          <th
            mat-header-cell
            *matHeaderCellDef
            class="bg-surface-variant text-on-surface-variant font-bold uppercase text-[11px] tracking-wider"
          >
            Status
          </th>
          <td mat-cell *matCellDef="let invoice">
            <span
              [ngClass]="{
                'bg-emerald-100 text-emerald-700': invoice.status === 'Paid',
                'bg-amber-100 text-amber-700': invoice.status === 'Pending',
                'bg-rose-100 text-rose-700': invoice.status === 'Overdue',
              }"
              class="px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              {{ invoice.status }}
            </span>
          </td>
        </ng-container>

        <!-- Amount Column -->
        <ng-container matColumnDef="amount">
          <th
            mat-header-cell
            *matHeaderCellDef
            class="bg-surface-variant text-on-surface-variant font-bold uppercase text-[11px] tracking-wider text-right"
          >
            Amount
          </th>
          <td
            mat-cell
            *matCellDef="let invoice"
            class="text-right font-bold text-on-surface"
          >
            {{ invoice.amount | currency }}
          </td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th
            mat-header-cell
            *matHeaderCellDef
            class="bg-surface-variant text-on-surface-variant font-bold uppercase text-[11px] tracking-wider"
          >
            Actions
          </th>
          <td
            mat-cell
            *matCellDef="let invoice"
            class="text-right whitespace-nowrap"
          >
            <button
              mat-icon-button
              color="primary"
              aria-label="View invoice details"
            >
              <mat-icon aria-hidden="true">visibility</mat-icon>
            </button>
            <button mat-icon-button color="primary" aria-label="More options">
              <mat-icon aria-hidden="true">more_vert</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: displayedColumns"
          class="hover:bg-surface-variant transition-colors cursor-pointer border-b border-outline"
        ></tr>
      </table>
    </div>
  `,
  styles: [
    `
      .mat-toolbar {
        padding: 0;
      }
      .dense-form-field {
        font-size: 14px;
      }
      table {
        background-color: transparent !important;
      }
      tr.mat-mdc-row:last-child td {
        border-bottom: none;
      }
    `,
  ],
})
export class InvoicesPageComponent {
  displayedColumns: string[] = [
    'invoiceNumber',
    'clientName',
    'date',
    'status',
    'amount',
    'actions',
  ];

  invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      clientName: 'Sarah Jenkins',
      date: 'Feb 4, 2024',
      dueDate: 'Feb 18, 2024',
      amount: 145.5,
      status: 'Paid',
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      clientName: 'Robert Wilson',
      date: 'Feb 5, 2024',
      dueDate: 'Feb 19, 2024',
      amount: 320.0,
      status: 'Pending',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      clientName: 'Emily Davis',
      date: 'Jan 20, 2024',
      dueDate: 'Feb 3, 2024',
      amount: 85.0,
      status: 'Overdue',
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      clientName: 'Michael Brown',
      date: 'Feb 6, 2024',
      dueDate: 'Feb 20, 2024',
      amount: 1250.75,
      status: 'Paid',
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      clientName: 'Alice Thompson',
      date: 'Feb 7, 2024',
      dueDate: 'Feb 21, 2024',
      amount: 210.0,
      status: 'Pending',
    },
    {
      id: '6',
      invoiceNumber: 'INV-2024-006',
      clientName: 'David Clark',
      date: 'Jan 15, 2024',
      dueDate: 'Jan 29, 2024',
      amount: 450.0,
      status: 'Overdue',
    },
  ];
}
