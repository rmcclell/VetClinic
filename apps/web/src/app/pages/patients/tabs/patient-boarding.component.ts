import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { BoardingReservation } from '../patient-tabs.types';
import { DATE_FORMAT } from '../../../core/date-format.token';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientBoardingDialogComponent } from './patient-boarding-dialog.component';
import { PatientBoardingPrintDialogComponent } from './patient-boarding-print-dialog.component';
import { PatientsService } from '../../../services/patients.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-boarding',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
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
          aria-label="Download boarding records"
        >
          <mat-icon aria-hidden="true">download</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Print"
          aria-label="Print boarding records"
          (click)="openPrintBoardingDialog()"
        >
          <mat-icon aria-hidden="true">print</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Email"
          aria-label="Email boarding records"
        >
          <mat-icon aria-hidden="true">email</mat-icon>
        </button>

        <mat-slide-toggle
          color="primary"
          [(ngModel)]="showPastCanceled"
          aria-label="Show past and canceled reservations"
          class="text-sm shrink-0"
        >
          Show Past/Canceled
        </mat-slide-toggle>

        <mat-form-field
          appearance="outline"
          subscriptSizing="dynamic"
          class="grow mx-2"
        >
          <mat-icon matPrefix aria-hidden="true">search</mat-icon>
          <input
            matInput
            type="search"
            placeholder="Search reservations…"
            aria-label="Search boarding reservations"
            (input)="applyFilter($event)"
          />
        </mat-form-field>

        <button
          mat-flat-button
          color="primary"
          aria-label="Add a new boarding reservation"
          (click)="openAddBoardingDialog()"
        >
          <mat-icon aria-hidden="true">add</mat-icon> Add Reservation
        </button>
      </mat-toolbar>

      <!-- Grid -->
      <div class="overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <!-- Check In Column -->
          <ng-container matColumnDef="checkIn">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Check In</th>
            <td mat-cell *matCellDef="let element" class="font-medium">
              <div class="flex items-center gap-1">
                {{ element.checkIn | date: dateFormat }}
                <mat-icon
                  class="text-blue-500 text-sm h-4 w-4 text-[16px] leading-4"
                  aria-hidden="true"
                >
                  vertical_align_bottom
                </mat-icon>
              </div>
            </td>
          </ng-container>

          <!-- Check Out Column -->
          <ng-container matColumnDef="checkOut">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Check Out</th>
            <td mat-cell *matCellDef="let element">
              <div class="flex items-center gap-1">
                {{ element.checkOut | date: dateFormat }}
                <mat-icon
                  class="text-on-surface-variant h-4 w-4 text-[16px] leading-4"
                  aria-hidden="true"
                >
                  vertical_align_top
                </mat-icon>
              </div>
            </td>
          </ng-container>

          <!-- Client Column -->
          <ng-container matColumnDef="client">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Client</th>
            <td mat-cell *matCellDef="let element">{{ element.client }}</td>
          </ng-container>

          <!-- Boarding Resource Column -->
          <ng-container matColumnDef="resource">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Boarding Resource
            </th>
            <td mat-cell *matCellDef="let element">{{ element.resource }}</td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
            <td mat-cell *matCellDef="let element">
              <mat-chip
                [class.bg-green-100]="element.status === 'Active'"
                [class.text-green-800]="element.status === 'Active'"
                [class.bg-blue-100]="element.status === 'Reserved'"
                [class.text-blue-800]="element.status === 'Reserved'"
                [class.bg-gray-100]="element.status === 'Completed'"
                [class.text-gray-800]="element.status === 'Completed'"
                [class.bg-red-100]="element.status === 'Canceled'"
                [class.text-red-800]="element.status === 'Canceled'"
                class="min-h-6 h-6 text-xs border-none"
              >
                {{ element.status }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Boarding Details Column -->
          <ng-container matColumnDef="details">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Boarding Details
            </th>
            <td mat-cell *matCellDef="let element">{{ element.details }}</td>
          </ng-container>

          <!-- Notes Column -->
          <ng-container matColumnDef="notes">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Notes</th>
            <td
              mat-cell
              *matCellDef="let element"
              class="text-on-surface-variant italic"
            >
              {{ element.notes }}
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
                  'Actions for reservation ' + element.resource
                "
              >
                <mat-icon aria-hidden="true">more_vert</mat-icon>
              </button>
              <mat-menu #rowMenu="matMenu">
                <button
                  mat-menu-item
                  [attr.aria-label]="'Edit reservation for ' + element.resource"
                  (click)="openEditBoardingDialog(element)"
                >
                  <mat-icon aria-hidden="true">edit</mat-icon> Edit
                </button>
                <mat-divider></mat-divider>
                <button
                  mat-menu-item
                  class="text-red-500"
                  [attr.aria-label]="
                    'Delete reservation for ' + element.resource
                  "
                  (click)="deleteBoarding(element)"
                >
                  <mat-icon color="warn" aria-hidden="true">delete</mat-icon>
                  Delete
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr
            mat-header-row
            *matHeaderRowDef="displayedBoardingColumns; sticky: true"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedBoardingColumns"
            class="hover:bg-surface-variant"
          ></tr>
          <tr class="mat-mdc-no-data-row" *matNoDataRow>
            <td
              [attr.colspan]="displayedBoardingColumns.length"
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
export class PatientBoardingComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);
  private dialog = inject(MatDialog);
  private patientsService = inject(PatientsService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) sort!: MatSort;

  showPastCanceled = false;

  boardingReservations: BoardingReservation[] = [
    {
      id: 1,
      checkIn: new Date('2026-03-10'),
      checkOut: new Date('2026-03-15'),
      client: 'Chandler McClelland',
      resource: 'Kennel 04',
      status: 'Reserved',
      details: 'Standard Boarding',
      notes: 'Bring own food',
    },
    {
      id: 2,
      checkIn: new Date('2025-12-20'),
      checkOut: new Date('2025-12-27'),
      client: 'Chandler McClelland',
      resource: 'Suite A',
      status: 'Completed',
      details: 'Luxury Suite',
      notes: '',
    },
  ];

  dataSource = new MatTableDataSource(this.boardingReservations);
  displayedBoardingColumns: string[] = [
    'checkIn',
    'checkOut',
    'client',
    'resource',
    'status',
    'details',
    'notes',
    'actions',
  ];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditBoardingDialog(item: BoardingReservation) {
    const dialogRef = this.dialog.open(PatientBoardingDialogComponent, {
      width: '600px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.boardingReservations.findIndex(b => b.id === item.id);
        if (index !== -1) {
          this.boardingReservations[index] = result;
          this.dataSource.data = [...this.boardingReservations];
          this.snackBar.open('Boarding reservation updated successfully', 'Close', { duration: 3000 });
        }
      }
    });
  }

  deleteBoarding(item: BoardingReservation) {
    if (confirm(`Are you sure you want to delete the boarding reservation for ${item.resource}?`)) {
      this.boardingReservations = this.boardingReservations.filter(b => b.id !== item.id);
      this.dataSource.data = this.boardingReservations;
      this.snackBar.open('Boarding reservation deleted', 'Close', { duration: 3000 });
    }
  }

  openAddBoardingDialog() {
    const patientId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    const dialogRef = this.dialog.open(PatientBoardingDialogComponent, {
      width: '600px',
      data: { patientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (patientId) {
          this.patientsService.addBoarding(patientId, result).subscribe({
            next: (newEntry) => {
               const entryToAdd = { ...result, id: Date.now() };
               this.boardingReservations = [entryToAdd, ...this.boardingReservations];
               this.dataSource.data = this.boardingReservations;
               this.snackBar.open('Boarding reservation added successfully', 'Close', { duration: 3000 });
            },
            error: (err) => {
              console.error('Error adding boarding reservation', err);
              const entryToAdd = { ...result, id: Date.now() };
              this.boardingReservations = [entryToAdd, ...this.boardingReservations];
              this.dataSource.data = this.boardingReservations;
              this.snackBar.open('Boarding reservation added locally (API failed)', 'Close', { duration: 3000 });
            }
          });
        }
      }
    });
  }

  openPrintBoardingDialog() {
    const dialogRef = this.dialog.open(PatientBoardingPrintDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Printing boarding history with options:', result);
        this.snackBar.open('Preparing boarding history for print...', 'Close', { duration: 3000 });
        setTimeout(() => window.print(), 500);
      }
    });
  }
}
