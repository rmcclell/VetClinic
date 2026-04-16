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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DATE_FORMAT } from '../../../core/date-format.token';

@Component({
  selector: 'app-client-tasks',
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
    MatSlideToggleModule,
  ],
  template: `
    <div class="flex flex-col h-full">
      <mat-toolbar class="tab-toolbar">
        <mat-slide-toggle
          color="primary"
          [checked]="showOnlyCompleted"
          (change)="
            showOnlyCompleted = !showOnlyCompleted;
            dataSource.data = showOnlyCompleted ? dummyData : activeData
          "
          class="text-sm shrink-0"
        >
          Show Completed Tasks
        </mat-slide-toggle>
        <span class="flex-grow"></span>
        <mat-form-field
          appearance="outline"
          subscriptSizing="dynamic"
          class="w-64 text-sm mx-2"
        >
          <mat-icon matPrefix aria-hidden="true">search</mat-icon>
          <input
            matInput
            type="search"
            placeholder="Search tasks..."
            aria-label="Search tasks"
            (input)="applyFilter($event)"
          />
        </mat-form-field>
        <button mat-flat-button color="primary" aria-label="Add Task">
          <mat-icon aria-hidden="true">add</mat-icon>
          <span class="hidden sm:inline ml-1">Add Task</span>
        </button>
      </mat-toolbar>

      <div class="flex-1 overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <ng-container matColumnDef="dueDate">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Due Date</th>
            <td mat-cell *matCellDef="let element" class="whitespace-nowrap">
              {{ element.dueDate | date: dateFormat }}
            </td>
          </ng-container>

          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Task</th>
            <td mat-cell *matCellDef="let element" class="font-bold">
              {{ element.title }}
            </td>
          </ng-container>

          <ng-container matColumnDef="assignedTo">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Assignee</th>
            <td mat-cell *matCellDef="let element">{{ element.assignedTo }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
            <td mat-cell *matCellDef="let element">
              <mat-chip
                class="min-h-6! h-6! text-[10px] font-bold uppercase border-none"
                [class]="
                  element.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-orange-50 text-orange-700'
                "
              >
                {{ element.status }}
              </mat-chip>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element" class="w-12">
              <button
                mat-icon-button
                [matMenuTriggerFor]="rowMenu"
                [attr.aria-label]="'Options for task ' + element.title"
              >
                <mat-icon aria-hidden="true">more_vert</mat-icon>
              </button>
              <mat-menu #rowMenu="matMenu">
                <button mat-menu-item>
                  <mat-icon aria-hidden="true">check_circle</mat-icon> Mark
                  Finished
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
              No tasks found.
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,
})
export class ClientTasksComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);

  @ViewChild(MatSort) sort!: MatSort;

  showOnlyCompleted = false;

  dummyData = [
    {
      id: 1,
      dueDate: new Date('2026-04-12'),
      title: 'Call regarding test results',
      assignedTo: 'Dr. Jones',
      status: 'Pending',
    },
    {
      id: 2,
      dueDate: new Date('2026-03-30'),
      title: 'Schedule follow-up',
      assignedTo: 'Front Desk',
      status: 'Completed',
    },
  ];
  activeData = this.dummyData.filter((d) => d.status === 'Pending');
  dataSource = new MatTableDataSource(this.activeData);
  displayedColumns: string[] = [
    'dueDate',
    'title',
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
}
