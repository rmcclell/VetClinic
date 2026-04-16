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
  selector: 'app-client-messaging',
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
      <mat-toolbar class="tab-toolbar">
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
            placeholder="Search messages..."
            aria-label="Search messages"
            (input)="applyFilter($event)"
          />
        </mat-form-field>
        <button mat-flat-button color="primary" aria-label="New Message">
          <mat-icon aria-hidden="true">add</mat-icon>
          <span class="hidden sm:inline ml-1">New Message</span>
        </button>
      </mat-toolbar>

      <div class="flex-1 overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Date/Time</th>
            <td mat-cell *matCellDef="let element" class="whitespace-nowrap">
              {{ element.date | date: dateFormat }} {{ element.time }}
            </td>
          </ng-container>

          <ng-container matColumnDef="direction">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Direction</th>
            <td mat-cell *matCellDef="let element">
              <div class="flex items-center gap-1">
                <mat-icon
                  class="text-sm! w-4! h-4! leading-4!"
                  [class]="
                    element.direction === 'Inbound'
                      ? 'text-blue-500'
                      : 'text-green-500'
                  "
                >
                  {{
                    element.direction === 'Inbound'
                      ? 'call_received'
                      : 'call_made'
                  }}
                </mat-icon>
                <span
                  class="text-xs font-bold uppercase text-on-surface-variant"
                  >{{ element.direction }}</span
                >
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="subject">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Subject / Snippet
            </th>
            <td
              mat-cell
              *matCellDef="let element"
              class="font-medium truncate max-w-[200px]"
              [title]="element.subject"
            >
              {{ element.subject }}
            </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
            <td mat-cell *matCellDef="let element">
              <mat-chip
                class="min-h-6! h-6! text-[10px] font-bold uppercase border-none"
                [class]="getStatusClass(element.status)"
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
                [attr.aria-label]="'Options for message ' + element.subject"
              >
                <mat-icon aria-hidden="true">more_vert</mat-icon>
              </button>
              <mat-menu #rowMenu="matMenu">
                <button mat-menu-item>
                  <mat-icon aria-hidden="true">visibility</mat-icon> Read Thread
                </button>
                <button mat-menu-item>
                  <mat-icon aria-hidden="true">reply</mat-icon> Reply
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
            [class.font-bold]="row.status === 'Unread'"
          ></tr>
          <tr class="mat-mdc-no-data-row" *matNoDataRow>
            <td
              [attr.colspan]="displayedColumns.length"
              class="p-8 text-center text-on-surface-variant"
            >
              No messages found.
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,
})
export class ClientMessagingComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);

  @ViewChild(MatSort) sort!: MatSort;

  dummyData = [
    {
      id: 1,
      date: new Date('2026-04-03'),
      time: '10:45 AM',
      direction: 'Inbound',
      subject: "Question regarding Luna's medication",
      status: 'Unread',
    },
    {
      id: 2,
      date: new Date('2026-03-25'),
      time: '02:30 PM',
      direction: 'Outbound',
      subject: 'Lab Results for Buddy',
      status: 'Delivered',
    },
  ];

  dataSource = new MatTableDataSource(this.dummyData);
  displayedColumns: string[] = [
    'date',
    'direction',
    'subject',
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
      case 'Unread':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  }
}
