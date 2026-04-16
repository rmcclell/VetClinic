import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { DATE_FORMAT } from '../../../core/date-format.token';

@Component({
  selector: 'app-client-appointments',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatDividerModule,
    MatChipsModule,
  ],
  template: `
    <div class="flex flex-col h-full">
      <!-- Main Toolbar -->
      <mat-toolbar class="tab-toolbar">
        <button mat-icon-button aria-label="Download appointments">
          <mat-icon aria-hidden="true">download</mat-icon>
        </button>
        <button mat-icon-button aria-label="Print appointments">
          <mat-icon aria-hidden="true">print</mat-icon>
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
            placeholder="Search appointments..."
            aria-label="Search appointments"
            (input)="applyFilter($event)"
          />
        </mat-form-field>

        <!-- Primary action -->
        <button
          mat-flat-button
          color="primary"
          aria-label="Schedule appointment"
        >
          <mat-icon aria-hidden="true">add</mat-icon>
          <span class="hidden sm:inline ml-1">Schedule Appointment</span>
        </button>
      </mat-toolbar>

      <div class="flex-1 overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <!-- Date Column -->
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Date</th>
            <td
              mat-cell
              *matCellDef="let element"
              class="whitespace-nowrap font-medium"
            >
              {{ element.date | date: dateFormat }}
              <div class="text-xs text-on-surface-variant">
                {{ element.time }}
              </div>
            </td>
          </ng-container>

          <!-- Patient Column -->
          <ng-container matColumnDef="patient">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Patient</th>
            <td mat-cell *matCellDef="let element" class="font-bold">
              {{ element.patient }}
            </td>
          </ng-container>

          <!-- Type Column -->
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Type</th>
            <td mat-cell *matCellDef="let element">
              {{ element.type }}
            </td>
          </ng-container>

          <!-- Provider Column -->
          <ng-container matColumnDef="provider">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Provider</th>
            <td mat-cell *matCellDef="let element">
              {{ element.provider }}
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
            <td mat-cell *matCellDef="let element">
              <mat-chip
                class="min-h-6! h-6! text-[10px] font-bold uppercase"
                [class]="getStatusClass(element.status)"
              >
                {{ element.status }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element" class="w-12">
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
                  <mat-icon aria-hidden="true">edit</mat-icon> Reschedule
                </button>
                <mat-divider></mat-divider>
                <button mat-menu-item class="text-red-500">
                  <mat-icon color="warn" aria-hidden="true">cancel</mat-icon>
                  Cancel
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr
            mat-header-row
            *matHeaderRowDef="displayedColumns; sticky: true"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedColumns"
            class="hover:bg-surface-variant transition-colors"
          ></tr>
          <tr class="mat-mdc-no-data-row" *matNoDataRow>
            <td
              [attr.colspan]="displayedColumns.length"
              class="p-8 text-center text-on-surface-variant"
            >
              No appointments scheduled.
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,
})
export class ClientAppointmentsComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);

  @ViewChild(MatSort) sort!: MatSort;

  dummyData = [
    {
      id: 1,
      date: new Date('2026-04-10'),
      time: '09:00 AM',
      patient: 'Buddy',
      type: 'Annual Exam',
      provider: 'Dr. Smith',
      status: 'Scheduled',
    },
    {
      id: 2,
      date: new Date('2026-03-01'),
      time: '02:30 PM',
      patient: 'Luna',
      type: 'Vaccines',
      provider: 'Dr. Jones',
      status: 'Completed',
    },
    {
      id: 3,
      date: new Date('2025-11-15'),
      time: '11:15 AM',
      patient: 'Buddy',
      type: 'Sick Visit',
      provider: 'Dr. Smith',
      status: 'Completed',
    },
  ];

  dataSource = new MatTableDataSource(this.dummyData);
  displayedColumns: string[] = [
    'date',
    'patient',
    'type',
    'provider',
    'status',
    'actions',
  ];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-50 text-blue-700 border-none';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-none';
      case 'Canceled':
        return 'bg-red-50 text-red-700 border-none';
      default:
        return 'bg-gray-50 text-gray-700 border-none';
    }
  }
}
