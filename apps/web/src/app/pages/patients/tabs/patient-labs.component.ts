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
import { MatDividerModule } from '@angular/material/divider';
import { LabItem } from '../patient-tabs.types';
import { DATE_FORMAT } from '../../../core/date-format.token';

@Component({
  selector: 'app-patient-labs',
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
    MatTooltipModule,
    MatDividerModule,
  ],
  template: `
    <div class="flex flex-col h-full">
      <!-- Main Toolbar -->
      <mat-toolbar class="tab-toolbar">
        <button
          mat-icon-button
          matTooltip="View all"
          aria-label="View all lab reports"
        >
          <mat-icon aria-hidden="true">visibility</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Documents"
          aria-label="View lab documents"
        >
          <mat-icon aria-hidden="true">description</mat-icon>
        </button>
        <button mat-icon-button matTooltip="Notes" aria-label="View lab notes">
          <mat-icon aria-hidden="true">note</mat-icon>
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
            placeholder="Search lab reports…"
            aria-label="Search lab reports"
            (input)="applyFilter($event)"
          />
        </mat-form-field>

        <button
          mat-flat-button
          color="primary"
          aria-label="Add a new lab report"
        >
          <mat-icon aria-hidden="true">add</mat-icon> Add Lab
        </button>
      </mat-toolbar>

      <!-- Grid -->
      <div class="overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <!-- Type Column -->
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="w-32">
              Type
            </th>
            <td mat-cell *matCellDef="let element">
              <div class="flex items-center gap-2">
                <mat-icon class="text-on-surface-variant" aria-hidden="true"
                  >description</mat-icon
                >
                {{ element.type }}
              </div>
            </td>
          </ng-container>

          <!-- Details Column -->
          <ng-container matColumnDef="details">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Details</th>
            <td
              mat-cell
              *matCellDef="let element"
              class="font-medium text-primary"
            >
              {{ element.details }}
            </td>
          </ng-container>

          <!-- Date Column -->
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="w-40">
              Date
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.date | date: dateFormat }}
            </td>
          </ng-container>

          <!-- Added By Column -->
          <ng-container matColumnDef="addedBy">
            <th mat-header-cell *matHeaderCellDef mat-sort-header class="w-40">
              Added By
            </th>
            <td mat-cell *matCellDef="let element">{{ element.addedBy }}</td>
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
                  [attr.aria-label]="'View ' + element.details"
                >
                  <mat-icon aria-hidden="true">visibility</mat-icon> View
                </button>
                <button
                  mat-menu-item
                  [attr.aria-label]="'Download ' + element.details"
                >
                  <mat-icon aria-hidden="true">download</mat-icon> Download
                </button>
                <mat-divider></mat-divider>
                <button
                  mat-menu-item
                  class="text-red-500"
                  [attr.aria-label]="'Delete ' + element.details"
                >
                  <mat-icon color="warn" aria-hidden="true">delete</mat-icon>
                  Delete
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr
            mat-header-row
            *matHeaderRowDef="displayedLabColumns; sticky: true"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedLabColumns"
            class="hover:bg-surface-variant"
          ></tr>
          <tr class="mat-mdc-no-data-row" *matNoDataRow>
            <td
              [attr.colspan]="displayedLabColumns.length"
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
export class PatientLabsComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);

  @ViewChild(MatSort) sort!: MatSort;

  labItems: LabItem[] = [
    {
      id: 1,
      type: 'Document',
      details: '_IDEXX_Result_299414557_2025-11-24.pdf',
      date: new Date('2025-11-24'),
      addedBy: '',
    },
    {
      id: 2,
      type: 'Document',
      details: '_IDEXX_Result_299727350_2025-11-22.pdf',
      date: new Date('2025-11-22'),
      addedBy: '',
    },
  ];

  dataSource = new MatTableDataSource(this.labItems);
  displayedLabColumns: string[] = [
    'type',
    'details',
    'date',
    'addedBy',
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
