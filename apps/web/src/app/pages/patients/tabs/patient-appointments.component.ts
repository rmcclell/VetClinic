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
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { AppointmentHistoryItem } from '../patient-tabs.types';
import { DATE_FORMAT } from '../../../core/date-format.token';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientAppointmentDialogComponent } from './patient-appointment-dialog.component';
import { PatientsService } from '../../../services/patients.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatChipsModule,
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
          aria-label="Download appointment records"
        >
          <mat-icon aria-hidden="true">download</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Print"
          aria-label="Print appointment records"
        >
          <mat-icon aria-hidden="true">print</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Email"
          aria-label="Email appointment records"
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
            placeholder="Search appointments…"
            aria-label="Search appointments"
            (input)="applyFilter($event)"
          />
        </mat-form-field>

        <button
          mat-flat-button
          color="primary"
          aria-label="Add a new appointment"
          (click)="openAddAppointmentDialog()"
        >
          <mat-icon aria-hidden="true">add</mat-icon> Add Appt
        </button>
      </mat-toolbar>

      <!-- Summary Bar -->
      <div
        class="tab-summary-bar"
        role="status"
        aria-label="Appointment summary"
      >
        <span class="summary-stat">
          <strong class="text-indigo-600">{{ upcomingCount }}</strong>
          <span>Upcoming</span>
        </span>
        <span class="summary-stat">
          <strong class="text-red-500">{{ canceledCount }}</strong>
          <span>Canceled</span>
        </span>
        <span class="summary-stat">
          <strong>{{ noShowCount }}</strong>
          <span>No Show</span>
        </span>
      </div>

      <!-- Grid -->
      <div class="overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <!-- Date Column -->
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Date</th>
            <td mat-cell *matCellDef="let element" class="font-medium">
              {{ element.date | date: dateFormat }}
            </td>
          </ng-container>

          <!-- Time Column -->
          <ng-container matColumnDef="time">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="hidden sm:table-cell">Time</th>
            <td mat-cell *matCellDef="let element" class="hidden sm:table-cell">{{ element.time }}</td>
          </ng-container>

          <!-- Client Column -->
          <ng-container matColumnDef="client">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="hidden sm:table-cell">Client</th>
            <td mat-cell *matCellDef="let element" class="hidden sm:table-cell">
              <button
                type="button"
                class="text-blue-500 hover:underline cursor-pointer bg-transparent border-none p-0"
                [attr.aria-label]="'View client: ' + element.client"
              >
                {{ element.client }}
              </button>
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
            <td mat-cell *matCellDef="let element">
              <mat-chip
                [class.bg-indigo-50]="
                  element.status === 'Upcoming' ||
                  element.status === 'Pending Confirmation'
                "
                [class.text-indigo-700]="
                  element.status === 'Upcoming' ||
                  element.status === 'Pending Confirmation'
                "
                [class.bg-red-50]="
                  element.status === 'Canceled' || element.status === 'No Show'
                "
                [class.text-red-700]="
                  element.status === 'Canceled' || element.status === 'No Show'
                "
                [class.bg-green-50]="element.status === 'Completed'"
                [class.text-green-700]="element.status === 'Completed'"
                class="min-h-6 h-6 text-xs border-none"
              >
                {{ element.status }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Type Column -->
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="hidden sm:table-cell">
              Appointment Type
            </th>
            <td mat-cell *matCellDef="let element" class="hidden sm:table-cell">{{ element.type }}</td>
          </ng-container>

          <!-- Provider Column -->
          <ng-container matColumnDef="provider">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="hidden sm:table-cell">Provider</th>
            <td mat-cell *matCellDef="let element" class="hidden sm:table-cell">{{ element.provider }}</td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">
              <button
                mat-icon-button
                [matMenuTriggerFor]="rowMenu"
                [attr.aria-label]="
                  'Actions for appointment on ' +
                  (element.date | date: dateFormat)
                "
              >
                <mat-icon aria-hidden="true">more_vert</mat-icon>
              </button>
              <mat-menu #rowMenu="matMenu">
                <button mat-menu-item>
                  <mat-icon aria-hidden="true">edit</mat-icon> Edit
                </button>
                <button mat-menu-item>
                  <mat-icon aria-hidden="true">cancel</mat-icon> Cancel
                </button>
                <mat-divider></mat-divider>
                <button mat-menu-item class="text-red-500">
                  <mat-icon color="warn" aria-hidden="true">delete</mat-icon>
                  Delete
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr
            mat-header-row
            *matHeaderRowDef="displayedAppointmentColumns; sticky: true"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedAppointmentColumns"
            class="hover:bg-surface-variant"
          ></tr>
          <tr class="mat-mdc-no-data-row" *matNoDataRow>
            <td
              [attr.colspan]="displayedAppointmentColumns.length"
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
export class PatientAppointmentsComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);
  private dialog = inject(MatDialog);
  private patientsService = inject(PatientsService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) sort!: MatSort;

  appointmentHistory: AppointmentHistoryItem[] = [
    {
      id: 1,
      date: new Date('2025-12-22'),
      time: '1:55 PM',
      client: 'Chandler McClelland',
      status: 'Canceled',
      type: 'Sick Exam',
      provider: 'Dr. Stensland',
    },
    {
      id: 2,
      date: new Date('2025-11-16'),
      time: '10:00 AM',
      client: 'Chandler McClelland',
      status: 'Pending Confirmation',
      type: 'Wellness Exam',
      provider: 'Dr. Stensland',
    },
    {
      id: 3,
      date: new Date('2025-11-14'),
      time: '7:00 PM',
      client: 'Chandler McClelland',
      status: 'Canceled',
      type: 'Wellness Exam',
      provider: 'Dr. Stensland',
    },
    {
      id: 4,
      date: new Date('2025-11-10'),
      time: '4:05 PM',
      client: 'Chandler McClelland',
      status: 'Upcoming',
      type: 'Tech Appt',
      provider: 'Chandler-Tech Appt',
    },
    {
      id: 5,
      date: new Date('2025-11-03'),
      time: '10:00 AM',
      client: 'Chandler McClelland',
      status: 'Canceled',
      type: 'Tech Appt',
      provider: 'Chandler-Tech Appt',
    },
    {
      id: 6,
      date: new Date('2025-11-03'),
      time: '9:15 AM',
      client: 'Chandler McClelland',
      status: 'Canceled',
      type: 'Tech Appt',
      provider: 'Chandler-Tech Appt',
    },
    {
      id: 7,
      date: new Date('2025-10-29'),
      time: '1:00 PM',
      client: 'Chandler McClelland',
      status: 'Canceled',
      type: 'Tech Appt',
      provider: 'Chandler-Tech Appt',
    },
  ];

  dataSource = new MatTableDataSource(this.appointmentHistory);
  displayedAppointmentColumns: string[] = [
    'date',
    'time',
    'client',
    'status',
    'type',
    'provider',
    'actions',
  ];

  get upcomingCount() {
    return this.appointmentHistory.filter(
      (a) => a.status === 'Upcoming' || a.status === 'Pending Confirmation',
    ).length;
  }
  get canceledCount() {
    return this.appointmentHistory.filter((a) => a.status === 'Canceled')
      .length;
  }
  get noShowCount() {
    return this.appointmentHistory.filter((a) => a.status === 'No Show').length;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddAppointmentDialog() {
    const patientId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    const dialogRef = this.dialog.open(PatientAppointmentDialogComponent, {
      width: '600px',
      data: { patientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (patientId) {
          this.patientsService.addAppointment(patientId, result).subscribe({
            next: (newEntry) => {
               const entryToAdd = { ...result, id: Date.now() };
               this.appointmentHistory = [entryToAdd, ...this.appointmentHistory];
               this.dataSource.data = this.appointmentHistory;
               this.snackBar.open('Appointment added successfully', 'Close', { duration: 3000 });
            },
            error: (err) => {
              console.error('Error adding appointment', err);
              const entryToAdd = { ...result, id: Date.now() };
              this.appointmentHistory = [entryToAdd, ...this.appointmentHistory];
              this.dataSource.data = this.appointmentHistory;
              this.snackBar.open('Appointment added locally (API failed)', 'Close', { duration: 3000 });
            }
          });
        }
      }
    });
  }
}
