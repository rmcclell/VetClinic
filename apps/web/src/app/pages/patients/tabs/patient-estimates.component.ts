import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { EstimateItem } from '../patient-tabs.types';
import { DATE_FORMAT } from '../../../core/date-format.token';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientEstimateDialogComponent } from './patient-estimate-dialog.component';
import { PatientsService } from '../../../services/patients.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-estimates',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDividerModule,
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
          aria-label="Download estimates"
        >
          <mat-icon aria-hidden="true">download</mat-icon>
        </button>
        <button mat-icon-button matTooltip="Print" aria-label="Print estimates">
          <mat-icon aria-hidden="true">print</mat-icon>
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
            placeholder="Search estimates…"
            aria-label="Search estimates"
            (input)="applyFilter($event)"
          />
        </mat-form-field>

        <button mat-flat-button color="primary" aria-label="Add a new estimate" (click)="openAddEstimateDialog()">
          <mat-icon aria-hidden="true">add</mat-icon> Add Estimate
        </button>
      </mat-toolbar>

      <!-- Summary Bar -->
      <div class="tab-summary-bar" role="status" aria-label="Estimates summary">
        <span class="summary-stat">
          <mat-icon class="text-[16px] h-4 w-4" aria-hidden="true"
            >receipt_long</mat-icon
          >
          <span>Total Estimated:</span>
          <strong>{{ totalEstimatedCharges | currency }}</strong>
        </span>
        <span class="summary-stat">
          <strong class="text-yellow-600">{{ pendingCount }}</strong>
          <span>Pending</span>
        </span>
        <span class="summary-stat">
          <strong class="text-green-600">{{ approvedCount }}</strong>
          <span>Approved</span>
        </span>
      </div>

      <!-- Grid -->
      <div class="overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <!-- Date Created Column -->
          <ng-container matColumnDef="dateCreated">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Date Created
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.dateCreated | date: dateFormat }}
            </td>
          </ng-container>

          <!-- Title Column -->
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Title</th>
            <td
              mat-cell
              *matCellDef="let element"
              class="font-medium text-blue-600 hover:underline cursor-pointer"
            >
              {{ element.title }}
            </td>
          </ng-container>

          <!-- Expiration Date Column -->
          <ng-container matColumnDef="expirationDate">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Expiration Date
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.expirationDate | date: dateFormat }}
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
            <td mat-cell *matCellDef="let element">
              <mat-chip
                [class.bg-yellow-100]="element.status === 'Pending'"
                [class.text-yellow-800]="element.status === 'Pending'"
                [class.bg-green-100]="element.status === 'Approved'"
                [class.text-green-800]="element.status === 'Approved'"
                [class.bg-red-100]="element.status === 'Declined'"
                [class.text-red-800]="element.status === 'Declined'"
                [class.bg-gray-100]="element.status === 'Expired'"
                [class.text-gray-800]="element.status === 'Expired'"
                class="min-h-6 h-6 text-xs border-none"
              >
                {{ element.status }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Imported To SOAP Column -->
          <ng-container matColumnDef="importedToSoap">
            <th
              mat-header-cell
              *matHeaderCellDef
              mat-sort-header
              class="text-center"
            >
              Imported To SOAP
            </th>
            <td mat-cell *matCellDef="let element" class="text-center">
              @if (element.importedToSoap) {
                <mat-icon
                  class="text-green-500 text-lg h-5 w-5"
                  aria-label="Yes"
                  >check_circle</mat-icon
                >
              }
            </td>
          </ng-container>

          <!-- Approval Date Column -->
          <ng-container matColumnDef="approvalDate">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Approval Date
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.approvalDate | date: dateFormat }}
            </td>
          </ng-container>

          <!-- Estimated Charges Column -->
          <ng-container matColumnDef="estimatedCharges">
            <th
              mat-header-cell
              *matHeaderCellDef
              mat-sort-header
              class="text-right"
            >
              Estimated Charges
            </th>
            <td
              mat-cell
              *matCellDef="let element"
              class="text-right font-medium"
            >
              {{ element.estimatedCharges | currency }}
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">
              <button
                mat-icon-button
                [matMenuTriggerFor]="rowMenu"
                [attr.aria-label]="'Actions for estimate: ' + element.title"
              >
                <mat-icon aria-hidden="true">more_vert</mat-icon>
              </button>
              <mat-menu #rowMenu="matMenu">
                <button
                  mat-menu-item
                  [attr.aria-label]="'Edit estimate: ' + element.title"
                >
                  <mat-icon aria-hidden="true">edit</mat-icon> Edit
                </button>
                <button
                  mat-menu-item
                  [attr.aria-label]="'Approve estimate: ' + element.title"
                >
                  <mat-icon aria-hidden="true">check_circle</mat-icon> Approve
                </button>
                <mat-divider></mat-divider>
                <button
                  mat-menu-item
                  class="text-red-500"
                  [attr.aria-label]="'Delete estimate: ' + element.title"
                >
                  <mat-icon color="warn" aria-hidden="true">delete</mat-icon>
                  Delete
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr
            mat-header-row
            *matHeaderRowDef="displayedEstimateColumns; sticky: true"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedEstimateColumns"
            class="hover:bg-surface-variant"
          ></tr>
          <tr class="mat-mdc-no-data-row" *matNoDataRow>
            <td
              [attr.colspan]="displayedEstimateColumns.length"
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
export class PatientEstimatesComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);
  private dialog = inject(MatDialog);
  private patientsService = inject(PatientsService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) sort!: MatSort;

  estimates: EstimateItem[] = [
    {
      id: 1,
      dateCreated: new Date('2025-11-24'),
      title: 'Dental Cleaning',
      expirationDate: new Date('2025-12-24'),
      status: 'Pending',
      importedToSoap: false,
      estimatedCharges: 450.0,
    },
    {
      id: 2,
      dateCreated: new Date('2025-10-15'),
      title: 'Mass Removal',
      expirationDate: new Date('2025-11-15'),
      status: 'Approved',
      importedToSoap: true,
      approvalDate: new Date('2025-10-20'),
      estimatedCharges: 1200.0,
    },
  ];

  dataSource = new MatTableDataSource(this.estimates);
  displayedEstimateColumns: string[] = [
    'dateCreated',
    'title',
    'expirationDate',
    'status',
    'importedToSoap',
    'approvalDate',
    'estimatedCharges',
    'actions',
  ];

  get totalEstimatedCharges(): number {
    return this.estimates.reduce((s, e) => s + e.estimatedCharges, 0);
  }
  get pendingCount(): number {
    return this.estimates.filter((e) => e.status === 'Pending').length;
  }
  get approvedCount(): number {
    return this.estimates.filter((e) => e.status === 'Approved').length;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddEstimateDialog() {
    const patientId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    const dialogRef = this.dialog.open(PatientEstimateDialogComponent, {
      width: '600px',
      data: { patientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (patientId) {
          this.patientsService.addEstimate(patientId, result).subscribe({
            next: (newEntry) => {
               const entryToAdd = { ...result, id: Date.now() };
               this.estimates = [entryToAdd, ...this.estimates];
               this.dataSource.data = this.estimates;
               this.snackBar.open('Estimate added successfully', 'Close', { duration: 3000 });
            },
            error: (err) => {
              console.error('Error adding estimate', err);
              const entryToAdd = { ...result, id: Date.now() };
              this.estimates = [entryToAdd, ...this.estimates];
              this.dataSource.data = this.estimates;
              this.snackBar.open('Estimate added locally (API failed)', 'Close', { duration: 3000 });
            }
          });
        }
      }
    });
  }
}
