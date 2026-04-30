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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PatientsService } from '../../../services/patients.service';
import { ClientsService } from '../../../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { ClientFinancialDialogComponent } from './client-financial-dialog.component';
import { firstValueFrom, of } from 'rxjs';

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
    MatDialogModule,
    MatSnackBarModule,
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
        <button mat-stroked-button color="primary" [matMenuTriggerFor]="financialMenu">
          More Actions <mat-icon iconPositionEnd aria-hidden="true">expand_more</mat-icon>
        </button>
        <mat-menu #financialMenu="matMenu">
          <button mat-menu-item (click)="openFinancialDialog('invoice')">
            <mat-icon>receipt</mat-icon>
            <span>Create Invoice</span>
          </button>
          <button mat-menu-item (click)="openFinancialDialog('estimate')">
            <mat-icon>request_quote</mat-icon>
            <span>New Estimate</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item>
            <mat-icon>history</mat-icon>
            <span>View Statement</span>
          </button>
        </mat-menu>
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
            <mat-icon matPrefix class="text-on-surface-variant" aria-hidden="true"
              >search</mat-icon
            >
            <input
              matInput
              (keyup)="applyFilter($event)"
              placeholder="Search invoices..."
            />
          </mat-form-field>
          
          <button
            mat-flat-button
            color="primary"
            class="ml-4"
            (click)="openFinancialDialog('invoice')"
          >
            <mat-icon>add</mat-icon>
            Create Invoice
          </button>

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
                  [class.bg-emerald-50]="element.status === 'Checked Out' || element.status === 'Paid'"
                  [class.text-emerald-700]="element.status === 'Checked Out' || element.status === 'Paid'"
                  [class.border-emerald-100]="element.status === 'Checked Out' || element.status === 'Paid'"
                  [class.bg-blue-50]="element.status === 'Open'"
                  [class.text-blue-700]="element.status === 'Open'"
                  [class.border-blue-100]="element.status === 'Open'"
                >
                  <span class="w-1.5 h-1.5 rounded-full" [class.bg-emerald-500]="element.status === 'Checked Out' || element.status === 'Paid'" [class.bg-blue-500]="element.status === 'Open'"></span>
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
                {{ element.checkedOut ? (element.checkedOut | date: dateFormat) : '-' }}
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
                    <mat-icon aria-hidden="true">visibility</mat-icon>
                    <span>View Invoice</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon aria-hidden="true">receipt_long</mat-icon>
                    <span>Record Payment</span>
                  </button>
                  <mat-divider></mat-divider>
                  <button mat-menu-item class="text-red-500">
                    <mat-icon color="warn" aria-hidden="true">delete</mat-icon>
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
  private dialog = inject(MatDialog);
  private patientsService = inject(PatientsService);
  private clientsService = inject(ClientsService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

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

  async openFinancialDialog(type: 'invoice' | 'estimate') {
    const clientId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    if (!clientId) return;

    try {
      const client = await firstValueFrom(this.clientsService.getOwner(clientId));
      const dialogRef = this.dialog.open(ClientFinancialDialogComponent, {
        width: '600px',
        data: { 
          clientId,
          type,
          patients: client.patients || [] 
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const save$ = type === 'invoice' 
            ? this.patientsService.addInvoice(result.patientId || 0, result) // Corrected method name
            : this.patientsService.addEstimate(result.patientId || 0, result); // Corrected method name

          save$.subscribe({
            next: () => {
              if (type === 'invoice') {
                const newEntry = {
                  ...result,
                  id: String(Math.floor(Math.random() * 1000)),
                  paid: result.status === 'Paid' ? result.total : '0.00',
                  balance: result.status === 'Paid' ? '0.00' : result.total,
                  checkedOut: result.status === 'Checked Out' ? result.date : null
                };
                this.dummyInvoices = [newEntry, ...this.dummyInvoices];
                this.dataSource.data = this.dummyInvoices;
              }
              this.snackBar.open(`${type === 'invoice' ? 'Invoice' : 'Estimate'} created successfully`, 'Close', { duration: 3000 });
            },
            error: (err) => {
              console.error(`Error creating ${type}:`, err);
              this.snackBar.open(`Error creating ${type}`, 'Close', { duration: 3000 });
            }
          });
        }
      });
    } catch (err) {
      console.error('Error fetching client patients:', err);
      this.snackBar.open('Error loading patient data', 'Close', { duration: 3000 });
    }
  }
}
