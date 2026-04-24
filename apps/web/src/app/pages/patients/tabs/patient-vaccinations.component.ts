import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { VaccinationItem } from '../patient-tabs.types';
import { DATE_FORMAT } from '../../../core/date-format.token';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientVaccinationDialogComponent } from './patient-vaccination-dialog.component';
import { PatientsService } from '../../../services/patients.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-vaccinations',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
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
          aria-label="Download vaccination records"
        >
          <mat-icon aria-hidden="true">download</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Print"
          aria-label="Print vaccination records"
        >
          <mat-icon aria-hidden="true">print</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Email"
          aria-label="Email vaccination records"
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
            placeholder="Search vaccinations…"
            aria-label="Search vaccinations"
            (input)="applyFilter($event)"
          />
        </mat-form-field>

        <button
          mat-flat-button
          color="primary"
          aria-label="Add a new vaccination record"
          (click)="openAddVaccinationDialog()"
        >
          <mat-icon aria-hidden="true">add</mat-icon> Add Vaccine
        </button>
      </mat-toolbar>

      <!-- Grid -->
      <div class="overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <!-- Vaccination Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Vaccination
            </th>
            <td mat-cell *matCellDef="let element">
              <span class="font-medium">{{ element.name }}</span>
            </td>
          </ng-container>

          <!-- Due Date Column -->
          <ng-container matColumnDef="dueDate">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Due Date</th>
            <td mat-cell *matCellDef="let element">
              {{ element.dueDate | date: dateFormat }}
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
            <td mat-cell *matCellDef="let element">
              <mat-chip
                [class.bg-green-100]="element.status === 'Up to Date'"
                [class.text-green-800]="element.status === 'Up to Date'"
                [class.bg-red-100]="element.status === 'Overdue'"
                [class.text-red-800]="element.status === 'Overdue'"
                [class.bg-yellow-100]="element.status === 'Due Soon'"
                [class.text-yellow-800]="element.status === 'Due Soon'"
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
                [attr.aria-label]="'Actions for ' + element.name"
              >
                <mat-icon aria-hidden="true">more_vert</mat-icon>
              </button>
              <mat-menu #rowMenu="matMenu">
                <button
                  mat-menu-item
                  [attr.aria-label]="'Edit ' + element.name"
                >
                  <mat-icon aria-hidden="true">edit</mat-icon> Edit
                </button>
                <button
                  mat-menu-item
                  [attr.aria-label]="'Mark ' + element.name + ' as done'"
                >
                  <mat-icon aria-hidden="true">check</mat-icon> Mark as Done
                </button>
                <mat-divider></mat-divider>
                <button
                  mat-menu-item
                  class="text-red-500"
                  [attr.aria-label]="'Delete ' + element.name"
                >
                  <mat-icon color="warn" aria-hidden="true">delete</mat-icon>
                  Delete
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr
            mat-header-row
            *matHeaderRowDef="displayedVaccinationColumns; sticky: true"
          ></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedVaccinationColumns"
            class="hover:bg-surface-variant"
          ></tr>
          <tr class="mat-mdc-no-data-row" *matNoDataRow>
            <td
              [attr.colspan]="displayedVaccinationColumns.length"
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
export class PatientVaccinationsComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);
  private dialog = inject(MatDialog);
  private patientsService = inject(PatientsService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) sort!: MatSort;

  vaccinations: VaccinationItem[] = [
    {
      id: 1,
      name: 'Rabies 3-Year',
      dueDate: new Date('2024-05-20'),
      status: 'Up to Date',
    },
    {
      id: 2,
      name: 'Bordetella',
      dueDate: new Date('2024-02-15'),
      status: 'Due Soon',
    },
    { id: 3, name: 'DHPP', dueDate: new Date('2023-12-01'), status: 'Overdue' },
  ];

  dataSource = new MatTableDataSource(this.vaccinations);
  displayedVaccinationColumns: string[] = [
    'name',
    'dueDate',
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

  openAddVaccinationDialog() {
    const patientId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    const dialogRef = this.dialog.open(PatientVaccinationDialogComponent, {
      width: '400px',
      data: { patientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (patientId) {
          this.patientsService.addVaccination(patientId, result).subscribe({
            next: (newEntry) => {
               const entryToAdd = { ...result, id: Date.now() };
               this.vaccinations = [entryToAdd, ...this.vaccinations];
               this.dataSource.data = this.vaccinations;
               this.snackBar.open('Vaccination added successfully', 'Close', { duration: 3000 });
            },
            error: (err) => {
              console.error('Error adding vaccination', err);
              const entryToAdd = { ...result, id: Date.now() };
              this.vaccinations = [entryToAdd, ...this.vaccinations];
              this.dataSource.data = this.vaccinations;
              this.snackBar.open('Vaccination added locally (API failed)', 'Close', { duration: 3000 });
            }
          });
        }
      }
    });
  }
}
