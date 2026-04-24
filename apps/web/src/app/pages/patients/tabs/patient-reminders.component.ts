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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ReminderItem } from '../patient-tabs.types';
import { DATE_FORMAT } from '../../../core/date-format.token';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientReminderDialogComponent } from './patient-reminder-dialog.component';
import { PatientReminderPrintDialogComponent } from './patient-reminder-print-dialog.component';
import { PatientsService } from '../../../services/patients.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-reminders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
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
          matTooltip="Send reminders"
          aria-label="Send reminders"
        >
          <mat-icon aria-hidden="true">send</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Download"
          aria-label="Download reminders"
        >
          <mat-icon aria-hidden="true">download</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Print"
          aria-label="Print reminders"
          (click)="openPrintReminderDialog()"
        >
          <mat-icon aria-hidden="true">print</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Email"
          aria-label="Email reminders"
        >
          <mat-icon aria-hidden="true">email</mat-icon>
        </button>

        <mat-slide-toggle
          color="primary"
          [checked]="showCompleted"
          (change)="onToggleCompleted($event)"
          aria-label="Show completed reminders"
          class="text-sm mx-1 shrink-0"
        >
          Show Completed
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
            placeholder="Search reminders…"
            aria-label="Search reminders"
            (input)="applyFilter($event)"
          />
        </mat-form-field>

        <button mat-flat-button color="primary" aria-label="Add a new reminder" (click)="openAddReminderDialog()">
          <mat-icon aria-hidden="true">add</mat-icon> Add Reminder
        </button>
      </mat-toolbar>

      <!-- Grid -->
      <div class="overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
            <td
              mat-cell
              *matCellDef="let element"
              class="font-medium"
              [class.text-red-500]="element.status === 'Overdue'"
            >
              {{ element.name }}
            </td>
          </ng-container>

          <!-- Due Date Column -->
          <ng-container matColumnDef="dueDate">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Due Date</th>
            <td mat-cell *matCellDef="let element">
              <div class="flex items-center gap-1">
                {{ element.dueDate | date: dateFormat }}
                <mat-icon
                  class="text-blue-500 text-sm h-4 w-4 text-[16px] leading-4"
                  aria-hidden="true"
                >
                  vertical_align_bottom
                </mat-icon>
              </div>
            </td>
          </ng-container>

          <!-- Trigger Product Column -->
          <ng-container matColumnDef="triggerProduct">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Trigger Product
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.triggerProduct }}
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
            <td mat-cell *matCellDef="let element">
              <span
                class="px-2 py-0.5 rounded-full text-xs font-semibold"
                [class.bg-red-100]="element.status === 'Overdue'"
                [class.text-red-700]="element.status === 'Overdue'"
                [class.bg-yellow-100]="element.status === 'Due Soon'"
                [class.text-yellow-700]="element.status === 'Due Soon'"
                [class.bg-blue-100]="element.status === 'Upcoming'"
                [class.text-blue-700]="element.status === 'Upcoming'"
                [class.bg-green-100]="element.status === 'Completed'"
                [class.text-green-700]="element.status === 'Completed'"
              >
                {{ element.status }}
              </span>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">
              <button
                mat-icon-button
                [matMenuTriggerFor]="rowMenu"
                [attr.aria-label]="'Actions for reminder: ' + element.name"
              >
                <mat-icon aria-hidden="true">more_vert</mat-icon>
              </button>
              <mat-menu #rowMenu="matMenu">
                <button
                  mat-menu-item
                  [attr.aria-label]="'Edit reminder: ' + element.name"
                >
                  <mat-icon aria-hidden="true">edit</mat-icon> Edit
                </button>
                <mat-divider></mat-divider>
                <button
                  mat-menu-item
                  class="text-red-500"
                  [attr.aria-label]="'Delete reminder: ' + element.name"
                >
                  <mat-icon color="warn" aria-hidden="true">delete</mat-icon>
                  Delete
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr
            mat-header-row
            *matHeaderRowDef="displayedReminderColumns; sticky: true"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedReminderColumns"
            class="hover:bg-surface-variant"
          ></tr>
          <tr class="mat-mdc-no-data-row" *matNoDataRow>
            <td
              [attr.colspan]="displayedReminderColumns.length"
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
export class PatientRemindersComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);
  private dialog = inject(MatDialog);
  private patientsService = inject(PatientsService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) sort!: MatSort;

  showCompleted = false;

  reminders: ReminderItem[] = [
    {
      id: 1,
      name: 'FVRCP Vaccine - 1yr',
      dueDate: new Date('2026-01-29'),
      triggerProduct: 'FVRCP Vaccination - 1 year',
      status: 'Overdue',
    },
  ];

  dataSource = new MatTableDataSource(this.reminders);
  displayedReminderColumns: string[] = [
    'name',
    'dueDate',
    'triggerProduct',
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

  onToggleCompleted(event: { checked: boolean }) {
    this.showCompleted = event.checked;
    this.dataSource.filterPredicate = (data: ReminderItem) =>
      this.showCompleted ? data.status === 'Completed' : true;
    this.dataSource.filter = this.dataSource.filter || ' ';
    if (!this.showCompleted && this.dataSource.filter === ' ') {
      this.dataSource.filter = '';
    }
  }

  openAddReminderDialog() {
    const patientId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    const dialogRef = this.dialog.open(PatientReminderDialogComponent, {
      width: '600px',
      data: { patientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (patientId) {
          this.patientsService.addReminder(patientId, result).subscribe({
            next: (newEntry) => {
               const entryToAdd = { ...result, id: Date.now() };
               this.reminders = [entryToAdd, ...this.reminders];
               this.dataSource.data = this.reminders;
               this.snackBar.open('Reminder added successfully', 'Close', { duration: 3000 });
            },
            error: (err) => {
              console.error('Error adding reminder', err);
              const entryToAdd = { ...result, id: Date.now() };
              this.reminders = [entryToAdd, ...this.reminders];
              this.dataSource.data = this.reminders;
              this.snackBar.open('Reminder added locally (API failed)', 'Close', { duration: 3000 });
            }
          });
        }
      }
    });
  }

  openPrintReminderDialog() {
    const dialogRef = this.dialog.open(PatientReminderPrintDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Printing reminders with options:', result);
        this.snackBar.open('Preparing reminders for print...', 'Close', { duration: 3000 });
        setTimeout(() => window.print(), 500);
      }
    });
  }
}
