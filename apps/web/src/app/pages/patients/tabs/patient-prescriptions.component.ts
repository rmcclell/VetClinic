import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { PrescriptionItem } from '../patient-tabs.types';
import { DATE_FORMAT } from '../../../core/date-format.token';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientPrescriptionDialogComponent } from './patient-prescription-dialog.component';
import { PatientPrescriptionPrintDialogComponent } from './patient-prescription-print-dialog.component';
import { PatientsService } from '../../../services/patients.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-prescriptions',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
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
          aria-label="Download prescriptions"
        >
          <mat-icon aria-hidden="true">download</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Print"
          aria-label="Print prescriptions"
          (click)="openPrintPrescriptionDialog()"
        >
          <mat-icon aria-hidden="true">print</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Email"
          aria-label="Email prescriptions"
        >
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
            placeholder="Search prescriptions…"
            aria-label="Search prescriptions"
            (input)="applyFilter($event)"
          />
        </mat-form-field>

        <button
          mat-flat-button
          color="primary"
          aria-label="Add a new prescription"
          (click)="openAddPrescriptionDialog()"
        >
          <mat-icon aria-hidden="true">add</mat-icon> Add Prescription
        </button>
      </mat-toolbar>

      <!-- Grid -->
      <div class="overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Prescription Name
            </th>
            <td mat-cell *matCellDef="let element">
              <span class="font-medium">{{ element.name }}</span>
            </td>
          </ng-container>

          <!-- Quantity Column -->
          <ng-container matColumnDef="quantity">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Quantity</th>
            <td mat-cell *matCellDef="let element">{{ element.quantity }}</td>
          </ng-container>

          <!-- Type Column -->
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Type</th>
            <td mat-cell *matCellDef="let element">{{ element.type }}</td>
          </ng-container>

          <!-- Creation Date Column -->
          <ng-container matColumnDef="creationDate">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Creation Date
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.creationDate | date: dateFormat }}
            </td>
          </ng-container>

          <!-- Valid Thru Column -->
          <ng-container matColumnDef="validThru">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Valid Thru
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.validThru | date: dateFormat }}
            </td>
          </ng-container>

          <!-- Refill Count Column -->
          <ng-container matColumnDef="refillCount">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Refills</th>
            <td mat-cell *matCellDef="let element">
              {{ element.refillCount }}
            </td>
          </ng-container>

          <!-- Last Refill Column -->
          <ng-container matColumnDef="lastRefill">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Last Refill
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.lastRefill | date: dateFormat }}
            </td>
          </ng-container>

          <!-- Directions Column -->
          <ng-container matColumnDef="directions">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Directions
            </th>
            <td mat-cell *matCellDef="let element">
              <div [matTooltip]="element.directions" class="truncate max-w-xs">
                {{ element.directions }}
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
                [attr.aria-label]="'Actions for ' + element.name"
              >
                <mat-icon aria-hidden="true">more_vert</mat-icon>
              </button>
              <mat-menu #rowMenu="matMenu">
                <button
                  mat-menu-item
                  [attr.aria-label]="'Edit ' + element.name"
                  (click)="openEditPrescriptionDialog(element)"
                >
                  <mat-icon aria-hidden="true">edit</mat-icon> Edit
                </button>
                <button
                  mat-menu-item
                  [attr.aria-label]="'Print ' + element.name"
                >
                  <mat-icon aria-hidden="true">print</mat-icon> Print
                </button>
                <mat-divider></mat-divider>
                <button
                  mat-menu-item
                  class="text-red-500"
                  [attr.aria-label]="'Delete ' + element.name"
                  (click)="deletePrescription(element)"
                >
                  <mat-icon color="warn" aria-hidden="true">delete</mat-icon>
                  Delete
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr
            mat-header-row
            *matHeaderRowDef="displayedPrescriptionColumns; sticky: true"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedPrescriptionColumns"
            class="hover:bg-surface-variant"
          ></tr>
          <tr class="mat-mdc-no-data-row" *matNoDataRow>
            <td
              [attr.colspan]="displayedPrescriptionColumns.length"
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
export class PatientPrescriptionsComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);
  private dialog = inject(MatDialog);
  private patientsService = inject(PatientsService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) sort!: MatSort;

  prescriptions: PrescriptionItem[] = [
    {
      id: 1,
      name: 'Amoxicillin 250mg',
      quantity: '30 Tabs',
      type: 'Tablet',
      creationDate: new Date('2024-01-15'),
      validThru: new Date('2025-01-15'),
      refillCount: 2,
      lastRefill: new Date('2024-01-15'),
      directions: 'Give 1 tablet twice daily for 14 days.',
    },
    {
      id: 2,
      name: 'Heartgard Plus (Blue)',
      quantity: '6 Chews',
      type: 'Chewable',
      creationDate: new Date('2023-11-10'),
      validThru: new Date('2024-11-10'),
      refillCount: 0,
      lastRefill: new Date('2023-11-10'),
      directions: 'Give 1 chewable monthly for heartworm prevention.',
    },
    {
      id: 3,
      name: 'Carprofen 75mg',
      quantity: '14 Tabs',
      type: 'Tablet',
      creationDate: new Date('2023-12-05'),
      validThru: new Date('2024-12-05'),
      refillCount: 3,
      lastRefill: new Date('2024-01-05'),
      directions: 'Give 1 tablet daily with food for pain.',
    },
  ];

  dataSource = new MatTableDataSource(this.prescriptions);
  displayedPrescriptionColumns: string[] = [
    'name',
    'quantity',
    'type',
    'creationDate',
    'validThru',
    'refillCount',
    'lastRefill',
    'directions',
    'actions',
  ];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditPrescriptionDialog(item: PrescriptionItem) {
    const dialogRef = this.dialog.open(PatientPrescriptionDialogComponent, {
      width: '600px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.prescriptions.findIndex(p => p.id === item.id);
        if (index !== -1) {
          this.prescriptions[index] = result;
          this.dataSource.data = [...this.prescriptions];
          this.snackBar.open('Prescription record updated', 'Close', { duration: 3000 });
        }
      }
    });
  }

  deletePrescription(item: PrescriptionItem) {
    if (confirm(`Are you sure you want to delete the prescription for ${item.name}?`)) {
      this.prescriptions = this.prescriptions.filter(p => p.id !== item.id);
      this.dataSource.data = this.prescriptions;
      this.snackBar.open('Prescription record deleted', 'Close', { duration: 3000 });
    }
  }

  openAddPrescriptionDialog() {
    const patientId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    const dialogRef = this.dialog.open(PatientPrescriptionDialogComponent, {
      width: '600px',
      data: { patientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (patientId) {
          this.patientsService.addPrescription(patientId, result).subscribe({
            next: (newEntry) => {
               const entryToAdd = { ...result, id: Date.now() };
               this.prescriptions = [entryToAdd, ...this.prescriptions];
               this.dataSource.data = this.prescriptions;
               this.snackBar.open('Prescription added successfully', 'Close', { duration: 3000 });
            },
            error: (err) => {
              console.error('Error adding prescription', err);
              const entryToAdd = { ...result, id: Date.now() };
              this.prescriptions = [entryToAdd, ...this.prescriptions];
              this.dataSource.data = this.prescriptions;
              this.snackBar.open('Prescription added locally (API failed)', 'Close', { duration: 3000 });
            }
          });
        }
      }
    });
  }

  openPrintPrescriptionDialog() {
    const dialogRef = this.dialog.open(PatientPrescriptionPrintDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Printing prescriptions with options:', result);
        this.snackBar.open('Preparing prescriptions for print...', 'Close', { duration: 3000 });
        setTimeout(() => window.print(), 500);
      }
    });
  }
}
