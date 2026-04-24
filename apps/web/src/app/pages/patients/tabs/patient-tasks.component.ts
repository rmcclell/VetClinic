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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { PatientTask } from '../patient-tabs.types';
import { DATE_FORMAT } from '../../../core/date-format.token';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientTaskDialogComponent } from './patient-task-dialog.component';
import { PatientsService } from '../../../services/patients.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="flex flex-col h-full">
      <!-- Main Toolbar -->
      <mat-toolbar class="tab-toolbar">
        <mat-slide-toggle
          color="primary"
          [checked]="showOnlyCompleted"
          (change)="onToggleCompleted($event)"
          aria-label="Show only completed tasks"
          class="text-sm shrink-0"
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
            placeholder="Search tasks…"
            aria-label="Search tasks"
            (input)="applyFilter($event)"
          />
        </mat-form-field>

        <button mat-flat-button color="primary" aria-label="Add a new task" (click)="openAddTaskDialog()">
          <mat-icon aria-hidden="true">add</mat-icon> Add Task
        </button>
      </mat-toolbar>

      <!-- Grid -->
      <div class="overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <!-- Due Date Column -->
          <ng-container matColumnDef="dueDate">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Due Date</th>
            <td mat-cell *matCellDef="let element" class="font-medium">
              {{ element.dueDate | date: dateFormat }}
            </td>
          </ng-container>

          <!-- Priority Column -->
          <ng-container matColumnDef="priority">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Priority</th>
            <td mat-cell *matCellDef="let element">
              <div class="flex items-center gap-1">
                <mat-icon
                  class="h-4 w-4 text-[16px]"
                  aria-hidden="true"
                  [class.text-green-500]="element.priority === 'Low'"
                  [class.text-yellow-500]="element.priority === 'Medium'"
                  [class.text-orange-500]="element.priority === 'High'"
                  [class.text-red-500]="element.priority === 'Critical'"
                >
                  flag
                </mat-icon>
                {{ element.priority }}
              </div>
            </td>
          </ng-container>

          <!-- Title Column -->
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Title</th>
            <td mat-cell *matCellDef="let element" class="font-medium">
              {{ element.title }}
            </td>
          </ng-container>

          <!-- Description Column -->
          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Description
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.description }}
            </td>
          </ng-container>

          <!-- Assigned To Column -->
          <ng-container matColumnDef="assignedTo">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Assigned To
            </th>
            <td mat-cell *matCellDef="let element">
              <div class="flex items-center gap-2">
                <div
                  class="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center text-xs font-bold text-on-surface border border-outline"
                  [attr.aria-label]="element.assignedTo"
                >
                  {{ getInitials(element.assignedTo) }}
                </div>
                {{ element.assignedTo }}
              </div>
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
            <td mat-cell *matCellDef="let element">
              <mat-chip
                [class.bg-gray-100]="element.status === 'Pending'"
                [class.text-gray-800]="element.status === 'Pending'"
                [class.bg-blue-100]="element.status === 'In Progress'"
                [class.text-blue-800]="element.status === 'In Progress'"
                [class.bg-green-100]="element.status === 'Completed'"
                [class.text-green-800]="element.status === 'Completed'"
                class="min-h-6 h-6 text-xs border-none"
              >
                {{ element.status }}
              </mat-chip>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">
              <button
                mat-icon-button
                [matMenuTriggerFor]="rowMenu"
                [attr.aria-label]="'Actions for task: ' + element.title"
              >
                <mat-icon aria-hidden="true">more_vert</mat-icon>
              </button>
              <mat-menu #rowMenu="matMenu">
                <button
                  mat-menu-item
                  [attr.aria-label]="'Edit task: ' + element.title"
                >
                  <mat-icon aria-hidden="true">edit</mat-icon> Edit
                </button>
                <button
                  mat-menu-item
                  [attr.aria-label]="'Mark complete: ' + element.title"
                >
                  <mat-icon aria-hidden="true">check_circle</mat-icon> Mark
                  Complete
                </button>
                <mat-divider></mat-divider>
                <button
                  mat-menu-item
                  class="text-red-500"
                  [attr.aria-label]="'Delete task: ' + element.title"
                >
                  <mat-icon color="warn" aria-hidden="true">delete</mat-icon>
                  Delete
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr
            mat-header-row
            *matHeaderRowDef="displayedTaskColumns; sticky: true"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedTaskColumns"
            class="hover:bg-surface-variant"
          ></tr>
          <tr class="mat-mdc-no-data-row" *matNoDataRow>
            <td
              [attr.colspan]="displayedTaskColumns.length"
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
export class PatientTasksComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);
  private dialog = inject(MatDialog);
  private patientsService = inject(PatientsService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) sort!: MatSort;

  showOnlyCompleted = false;

  patientTasks: PatientTask[] = [
    {
      id: 1,
      dueDate: new Date('2026-02-20'),
      priority: 'High',
      title: 'Call Owner',
      description: 'Discuss bloodwork results',
      assignedTo: 'Dr. Smith',
      status: 'Pending',
    },
    {
      id: 2,
      dueDate: new Date('2026-02-18'),
      priority: 'Medium',
      title: 'Prepare Meds',
      description: 'Get heartworm prevention ready for pickup',
      assignedTo: 'Tech Sarah',
      status: 'In Progress',
    },
    {
      id: 3,
      dueDate: new Date('2026-02-10'),
      priority: 'Low',
      title: 'Send Reminder',
      description: 'Email about upcoming vaccine',
      assignedTo: 'Reception',
      status: 'Completed',
    },
  ];

  dataSource = new MatTableDataSource(this.patientTasks);
  displayedTaskColumns: string[] = [
    'dueDate',
    'priority',
    'title',
    'description',
    'assignedTo',
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
    this.showOnlyCompleted = event.checked;
    this.dataSource.filterPredicate = (data: PatientTask) =>
      this.showOnlyCompleted ? data.status === 'Completed' : true;
    // Trigger re-filter
    this.dataSource.filter = this.dataSource.filter || ' ';
    if (!this.showOnlyCompleted && this.dataSource.filter === ' ') {
      this.dataSource.filter = '';
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  openAddTaskDialog() {
    const patientId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    const dialogRef = this.dialog.open(PatientTaskDialogComponent, {
      width: '600px',
      data: { patientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (patientId) {
          this.patientsService.addTask(patientId, result).subscribe({
            next: (newEntry) => {
               const entryToAdd = { ...result, id: Date.now() };
               this.patientTasks = [entryToAdd, ...this.patientTasks];
               this.dataSource.data = this.patientTasks;
               this.snackBar.open('Task added successfully', 'Close', { duration: 3000 });
            },
            error: (err) => {
              console.error('Error adding task', err);
              const entryToAdd = { ...result, id: Date.now() };
              this.patientTasks = [entryToAdd, ...this.patientTasks];
              this.dataSource.data = this.patientTasks;
              this.snackBar.open('Task added locally (API failed)', 'Close', { duration: 3000 });
            }
          });
        }
      }
    });
  }
}
