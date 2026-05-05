import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MedicalHistoryItem } from '../patient-tabs.types';
import { DATE_FORMAT } from '../../../core/date-format.token';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientHistoryDialogComponent } from './patient-history-dialog.component';
import { PatientHistoryPrintDialogComponent } from './patient-history-print-dialog.component';
import { PatientHistoryViewDialogComponent } from './patient-history-view-dialog.component';
import { PatientsService } from '../../../services/patients.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-history',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    MatToolbarModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="flex flex-col h-full">
      <!-- Main Toolbar -->
      <mat-toolbar class="tab-toolbar">
        <!-- Secondary actions -->
        <button
          mat-icon-button
          matTooltip="Lifecycle"
          aria-label="View lifecycle"
          >
          <mat-icon aria-hidden="true">cached</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Download"
          aria-label="Download medical history"
          >
          <mat-icon aria-hidden="true">download</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Print"
          aria-label="Print medical history"
          (click)="openPrintHistoryDialog()"
          >
          <mat-icon aria-hidden="true">print</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Email"
          aria-label="Email medical history"
          >
          <mat-icon aria-hidden="true">email</mat-icon>
        </button>
    
        <!-- Search -->
        <mat-form-field
          appearance="outline"
          subscriptSizing="dynamic"
          class="grow mx-2"
          >
          <mat-icon matPrefix aria-hidden="true">search</mat-icon>
          <input
            matInput
            type="search"
            placeholder="Search history…"
            aria-label="Search medical history"
            (input)="applyFilter($event)"
            />
        </mat-form-field>
    
        <!-- Primary action -->
        <button
          mat-flat-button
          color="primary"
          aria-label="Add a new medical history entry"
          (click)="openAddHistoryDialog()"
          >
          <mat-icon aria-hidden="true">add</mat-icon> Add Entry
        </button>
      </mat-toolbar>
    
      <!-- Grid -->
      <div class="overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <!-- Type Column -->
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Type</th>
            <td mat-cell *matCellDef="let element">
              <div class="flex items-center gap-2">
                <mat-icon
                  class="text-on-surface-variant text-lg"
                  aria-hidden="true"
                  >
                  @switch (element.type) {
                    @case ('SOAP') {
                      <span>description</span>
                    }
                    @case ('Prescription') {
                      <span>medication</span>
                    }
                    @case ('File') {
                      <span>attach_file</span>
                    }
                    @case ('Weight') {
                      <span>monitor_weight</span>
                    }
                    @case ('Task') {
                      <span>check_circle</span>
                    }
                  }
                </mat-icon>
                <span class="font-medium">{{ element.type }}</span>
              </div>
            </td>
          </ng-container>
    
          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
            <td mat-cell *matCellDef="let element">
              <mat-chip
                [class.bg-green-100]="element.status === 'Completed'"
                [class.text-green-800]="element.status === 'Completed'"
                [class.bg-gray-100]="element.status === 'Locked'"
                [class.text-gray-600]="element.status === 'Locked'"
                [class.bg-blue-100]="element.status === 'PRN'"
                [class.text-blue-800]="element.status === 'PRN'"
                [class.bg-purple-100]="element.status === 'Uploaded'"
                [class.text-purple-800]="element.status === 'Uploaded'"
                class="min-h-6 h-6 text-xs border-none"
                >
                {{ element.status }}
              </mat-chip>
            </td>
          </ng-container>
    
          <!-- Date Column -->
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Date</th>
            <td mat-cell *matCellDef="let element">
              {{ element.date | date: dateFormat }}
            </td>
          </ng-container>
    
          <!-- Details Column -->
          <ng-container matColumnDef="details">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Details</th>
            <td mat-cell *matCellDef="let element" class="w-1/3">
              <div class="truncate max-w-xs" [matTooltip]="element.details">
                {{ element.details }}
              </div>
            </td>
          </ng-container>
    
          <!-- Doctor Column -->
          <ng-container matColumnDef="doctor">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Doctor</th>
            <td mat-cell *matCellDef="let element">
              <div
                class="flex items-center gap-2"
                [matTooltip]="element.doctor.name"
                >
                <div
                  class="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center text-xs font-bold border border-outline"
                  >
                  {{ element.doctor.initials }}
                </div>
              </div>
            </td>
          </ng-container>
    
          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">
              <button
                mat-icon-button
                [matMenuTriggerFor]="rowMenu"
                [attr.aria-label]="'Actions for ' + element.details"
                >
                <mat-icon aria-hidden="true">more_vert</mat-icon>
              </button>
              <mat-menu #rowMenu="matMenu">
                <button
                  mat-menu-item
                  [attr.aria-label]="'View record: ' + element.details"
                  (click)="openViewHistoryDialog(element)"
                  >
                  <mat-icon aria-hidden="true">visibility</mat-icon> View
                </button>
                <button
                  mat-menu-item
                  [attr.aria-label]="'Edit record: ' + element.details"
                  (click)="openEditHistoryDialog(element)"
                  >
                  <mat-icon aria-hidden="true">edit</mat-icon> Edit
                </button>
                <mat-divider></mat-divider>
                <button
                  mat-menu-item
                  class="text-red-500"
                  [attr.aria-label]="'Delete record: ' + element.details"
                  (click)="deleteHistoryEntry(element)"
                  >
                  <mat-icon color="warn" aria-hidden="true">delete</mat-icon>
                  Delete
                </button>
              </mat-menu>
            </td>
          </ng-container>
    
          <tr
            mat-header-row
            *matHeaderRowDef="displayedHistoryColumns; sticky: true"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedHistoryColumns"
            class="hover:bg-surface-variant"
          ></tr>
          <tr class="mat-mdc-no-data-row" *matNoDataRow>
            <td
              [attr.colspan]="displayedHistoryColumns.length"
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
export class PatientHistoryComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);
  private dialog = inject(MatDialog);
  private patientsService = inject(PatientsService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) sort!: MatSort;

  medicalHistory: MedicalHistoryItem[] = [
    {
      id: 1,
      type: 'SOAP',
      status: 'Locked',
      date: new Date('2024-01-15'),
      details: 'Annual Wellness Exam. Patient healthy.',
      doctor: { name: 'Dr. Sarah Smith', initials: 'SS' },
    },
    {
      id: 2,
      type: 'Prescription',
      status: 'PRN',
      date: new Date('2024-01-15'),
      details: 'Heartworm Prevention (12 months)',
      doctor: { name: 'Dr. Sarah Smith', initials: 'SS' },
    },
    {
      id: 3,
      type: 'Weight',
      status: 'Completed',
      date: new Date('2024-01-15'),
      details: '24.5 kg',
      doctor: { name: 'Tech', initials: 'T' },
    },
    {
      id: 4,
      type: 'File',
      status: 'Uploaded',
      date: new Date('2023-12-10'),
      details: 'Previous Records from ABC Clinic',
      doctor: { name: 'Admin', initials: 'AD' },
    },
    {
      id: 5,
      type: 'Task',
      status: 'Completed',
      date: new Date('2023-11-05'),
      details: 'Follow up call regarding diet change',
      doctor: { name: 'Dr. John Doe', initials: 'JD' },
    },
  ];

  dataSource = new MatTableDataSource(this.medicalHistory);
  displayedHistoryColumns: string[] = [
    'type',
    'status',
    'date',
    'details',
    'doctor',
    'actions',
  ];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openViewHistoryDialog(item: MedicalHistoryItem) {
    const dialogRef = this.dialog.open(PatientHistoryViewDialogComponent, {
      width: '650px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'EDIT') {
        this.openEditHistoryDialog(item);
      }
    });
  }

  openAddHistoryDialog() {
    const patientId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    const dialogRef = this.dialog.open(PatientHistoryDialogComponent, {
      width: '600px',
      data: { patientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (patientId) {
          this.patientsService.addMedicalHistory(patientId, result).subscribe({
            next: (newEntry) => {
               // Assuming the API returns the created entry or we use the local result.
               // We assign a pseudo ID and add to our local array for demo purposes
               const entryToAdd = { ...result, id: Date.now() };
               this.medicalHistory = [entryToAdd, ...this.medicalHistory];
               this.dataSource.data = this.medicalHistory;
               this.snackBar.open('Medical history added successfully', 'Close', { duration: 3000 });
            },
            error: (err) => {
              console.error('Error adding medical history', err);
              // Since there is no actual backend endpoint implementation, we fallback to local update
              const entryToAdd = { ...result, id: Date.now() };
              this.medicalHistory = [entryToAdd, ...this.medicalHistory];
              this.dataSource.data = this.medicalHistory;
              this.snackBar.open('Medical history added locally (API failed)', 'Close', { duration: 3000 });
            }
          });
        }
      }
    });
  }

  openEditHistoryDialog(item: MedicalHistoryItem) {
    const dialogRef = this.dialog.open(PatientHistoryDialogComponent, {
      width: '600px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update local data for demo
        const index = this.medicalHistory.findIndex(h => h.id === item.id);
        if (index !== -1) {
          this.medicalHistory[index] = result;
          this.dataSource.data = [...this.medicalHistory];
          this.snackBar.open('Medical history updated successfully', 'Close', { duration: 3000 });
        }
      }
    });
  }

  deleteHistoryEntry(item: MedicalHistoryItem) {
    if (confirm(`Are you sure you want to delete this entry: "${item.details}"?`)) {
      this.medicalHistory = this.medicalHistory.filter(h => h.id !== item.id);
      this.dataSource.data = this.medicalHistory;
      this.snackBar.open('Medical history entry deleted', 'Close', { duration: 3000 });
    }
  }

  openPrintHistoryDialog() {
    const dialogRef = this.dialog.open(PatientHistoryPrintDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Here we could pass the options to a print service
        console.log('Printing history with options:', result);
        this.snackBar.open('Preparing medical history for print...', 'Close', { duration: 3000 });
        // Simulating the print action
        setTimeout(() => window.print(), 500);
      }
    });
  }
}
