import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DATE_FORMAT } from '../../../core/date-format.token';

@Component({
  selector: 'app-client-financial',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  template: `
    <div class="p-6 flex flex-col gap-6">
      <!-- Financial Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col"
        >
          <span class="text-sm font-medium text-gray-500 mb-1"
            >Outstanding Balance</span
          >
          <span class="text-3xl font-bold text-gray-900">$0.00</span>
        </div>
        <div
          class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col"
        >
          <span class="text-sm font-medium text-gray-500 mb-1"
            >Existing Credit Balance</span
          >
          <span class="text-3xl font-bold text-gray-900">$0.00</span>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="flex justify-end gap-3">
        <button mat-stroked-button color="primary">
          More Actions <mat-icon iconPositionEnd>expand_more</mat-icon>
        </button>
        <button mat-raised-button color="primary">Take Payment</button>
      </div>

      <!-- Secondary Tabs / Toolbar -->
      <div class="flex flex-col gap-4">
        <mat-toolbar
          class="tab-toolbar bg-transparent border-b border-gray-100"
        >
          <button
            mat-button
            class="text-sm font-bold border-b-2 border-primary-500 text-primary-600 rounded-none h-full"
          >
            Invoices
          </button>
          <button
            mat-button
            class="text-sm font-medium text-gray-500 rounded-none h-full"
          >
            Payments
          </button>
          <button
            mat-button
            class="text-sm font-medium text-gray-500 rounded-none h-full"
          >
            Invoice Line Items
          </button>
          <button
            mat-button
            class="text-sm font-medium text-gray-500 rounded-none h-full"
          >
            Payment Methods
          </button>
          <span class="flex-grow"></span>

          <mat-form-field
            appearance="outline"
            subscriptSizing="dynamic"
            class="w-64 text-sm ml-4 border-outline"
          >
            <mat-icon matPrefix class="text-on-surface-variant"
              >search</mat-icon
            >
            <input
              matInput
              (keyup)="applyFilter($event)"
              placeholder="Search invoices..."
            />
          </mat-form-field>
          <button
            mat-icon-button
            aria-label="Send invoices"
            matTooltip="Send selected"
            class="ml-2 text-blue-500 bg-blue-50 rounded-full"
          >
            <mat-icon aria-hidden="true">send</mat-icon>
          </button>
          <button
            mat-icon-button
            aria-label="Download invoices"
            matTooltip="Download selected"
            class="ml-2 text-blue-500 bg-blue-50 rounded-full"
          >
            <mat-icon aria-hidden="true">download</mat-icon>
          </button>
        </mat-toolbar>

        <!-- Invoices Table -->
        <div
          class="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm"
        >
          <table
            mat-table
            [dataSource]="dataSource"
            matSort
            class="w-full text-left border-collapse"
          >
            <!-- Checkbox Column -->
            <ng-container matColumnDef="select">
              <th
                mat-header-cell
                *matHeaderCellDef
                class="p-4 w-10 text-center bg-gray-50 border-b border-gray-100"
              >
                <input
                  type="checkbox"
                  aria-label="Select all invoices"
                  class="w-4 h-4 rounded border-gray-300"
                />
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                class="p-4 text-center border-b border-gray-50"
              >
                <input
                  type="checkbox"
                  [attr.aria-label]="'Select invoice ' + element.id"
                  class="w-4 h-4 rounded border-gray-300"
                />
              </td>
            </ng-container>

            <!-- Date Column -->
            <ng-container matColumnDef="date">
              <th
                mat-header-cell
                *matHeaderCellDef
                mat-sort-header
                class="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100"
              >
                Date
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                class="p-4 text-sm text-gray-600 border-b border-gray-50"
              >
                {{ element.date | date: dateFormat }}
              </td>
            </ng-container>

            <!-- Invoice # Column -->
            <ng-container matColumnDef="id">
              <th
                mat-header-cell
                *matHeaderCellDef
                mat-sort-header
                class="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100"
              >
                Invoice #
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                class="p-4 border-b border-gray-50"
              >
                <span
                  class="bg-gray-100 px-3 py-1 rounded text-sm font-bold text-gray-700"
                  >{{ element.id }}</span
                >
              </td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th
                mat-header-cell
                *matHeaderCellDef
                mat-sort-header
                class="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100"
              >
                Status
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                class="p-4 border-b border-gray-50"
              >
                <span
                  class="px-3 py-1 rounded-full text-[11px] font-bold uppercase border-2 flex items-center gap-1 w-fit"
                  [class.bg-emerald-50]="element.status === 'Checked Out'"
                  [class.text-emerald-700]="element.status === 'Checked Out'"
                  [class.border-emerald-100]="element.status === 'Checked Out'"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {{ element.status }}
                </span>
              </td>
            </ng-container>

            <!-- Checked Out Column -->
            <ng-container matColumnDef="checkedOut">
              <th
                mat-header-cell
                *matHeaderCellDef
                mat-sort-header
                class="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100"
              >
                Checked Out
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                class="p-4 text-sm text-gray-600 border-b border-gray-50"
              >
                {{ element.checkedOut | date: dateFormat }}
              </td>
            </ng-container>

            <!-- Total Column -->
            <ng-container matColumnDef="total">
              <th
                mat-header-cell
                *matHeaderCellDef
                mat-sort-header
                class="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100 text-right"
              >
                Total
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                class="p-4 text-sm text-gray-900 font-bold text-right border-b border-gray-50"
              >
                \${{ element.total }}
              </td>
            </ng-container>

            <!-- Paid Column -->
            <ng-container matColumnDef="paid">
              <th
                mat-header-cell
                *matHeaderCellDef
                mat-sort-header
                class="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100 text-right"
              >
                Paid
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                class="p-4 text-sm text-gray-900 font-bold text-right border-b border-gray-50"
              >
                \${{ element.paid }}
              </td>
            </ng-container>

            <!-- Balance Due Column -->
            <ng-container matColumnDef="balance">
              <th
                mat-header-cell
                *matHeaderCellDef
                mat-sort-header
                class="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100 text-right"
              >
                Balance Due
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                class="p-4 text-sm text-gray-900 font-black text-right border-b border-gray-50"
              >
                \${{ element.balance }}
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th
                mat-header-cell
                *matHeaderCellDef
                class="p-4 text-right bg-gray-50 border-b border-gray-100"
              >
                Actions
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                class="p-4 text-right border-b border-gray-50 group"
              >
                <button
                  mat-icon-button
                  [matMenuTriggerFor]="rowMenu"
                  aria-label="More invoice options"
                  class="text-gray-400 opacity-60 group-hover:opacity-100 transition-opacity"
                >
                  <mat-icon aria-hidden="true">more_vert</mat-icon>
                </button>
                <mat-menu #rowMenu="matMenu">
                  <button mat-menu-item>
                    <mat-icon>visibility</mat-icon>
                    <span>View Invoice</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon>receipt_long</mat-icon>
                    <span>Record Payment</span>
                  </button>
                  <mat-divider></mat-divider>
                  <button mat-menu-item class="text-red-500">
                    <mat-icon color="warn">delete</mat-icon>
                    <span>Void</span>
                  </button>
                </mat-menu>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedColumns"
              class="hover:bg-gray-50 border-b border-gray-50 transition-colors group"
            ></tr>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class ClientFinancialComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);

  @ViewChild(MatSort) sort!: MatSort;

  dummyInvoices = [
    {
      id: '544',
      date: new Date('2026-03-04'),
      status: 'Checked Out',
      checkedOut: new Date('2026-03-04'),
      total: '43.94',
      paid: '43.94',
      balance: '0.00',
    },
    {
      id: '538',
      date: new Date('2026-03-03'),
      status: 'Checked Out',
      checkedOut: new Date('2026-03-03'),
      total: '109.50',
      paid: '109.50',
      balance: '0.00',
    },
    {
      id: '401',
      date: new Date('2026-01-06'),
      status: 'Checked Out',
      checkedOut: new Date('2026-01-15'),
      total: '54.00',
      paid: '54.00',
      balance: '0.00',
    },
    {
      id: '344',
      date: new Date('2025-12-15'),
      status: 'Checked Out',
      checkedOut: new Date('2025-12-31'),
      total: '138.76',
      paid: '138.76',
      balance: '0.00',
    },
    {
      id: '298',
      date: new Date('2025-11-27'),
      status: 'Checked Out',
      checkedOut: new Date('2025-12-04'),
      total: '46.00',
      paid: '46.00',
      balance: '0.00',
    },
  ];

  dataSource = new MatTableDataSource(this.dummyInvoices);
  displayedColumns: string[] = [
    'select',
    'date',
    'id',
    'status',
    'checkedOut',
    'total',
    'paid',
    'balance',
    'actions',
  ];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
