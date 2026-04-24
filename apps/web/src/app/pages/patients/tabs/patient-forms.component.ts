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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { FormItem } from '../patient-tabs.types';
import { DATE_FORMAT } from '../../../core/date-format.token';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientFormDialogComponent } from './patient-form-dialog.component';
import { PatientFormSendDialogComponent } from './patient-form-send-dialog.component';
import { PatientFormPrintDialogComponent } from './patient-form-print-dialog.component';
import { PatientsService } from '../../../services/patients.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-forms',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="flex flex-col gap-6 overflow-auto p-0">
      <div class="flex flex-col">
        <mat-toolbar class="tab-toolbar">
          <button
            mat-icon-button
            matTooltip="Download"
            aria-label="Download client forms"
          >
            <mat-icon aria-hidden="true">download</mat-icon>
          </button>
          <button
            mat-icon-button
            matTooltip="Print"
            aria-label="Print client forms"
            (click)="openPrintFormDialog()"
          >
            <mat-icon aria-hidden="true">print</mat-icon>
          </button>
          <button
            mat-icon-button
            matTooltip="Email"
            aria-label="Email client forms"
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
              placeholder="Search client forms…"
              aria-label="Search client forms"
              (input)="applyClientFilter($event)"
            />
          </mat-form-field>

          <button
            mat-flat-button
            color="primary"
            aria-label="Send a form to the client"
            (click)="openSendFormDialog()"
          >
            <mat-icon aria-hidden="true">send</mat-icon> Send Form
          </button>
        </mat-toolbar>

        <div class="overflow-auto">
          <table
            mat-table
            [dataSource]="clientDataSource"
            #clientSort="matSort"
            matSort
            class="w-full"
          >
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Date</th>
              <td mat-cell *matCellDef="let element">
                {{ element.date | date: dateFormat }}
              </td>
            </ng-container>

            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Title</th>
              <td
                mat-cell
                *matCellDef="let element"
                class="font-medium text-blue-600 hover:underline cursor-pointer"
              >
                {{ element.title }}
              </td>
            </ng-container>

            <ng-container matColumnDef="client">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Client</th>
              <td mat-cell *matCellDef="let element">{{ element.client }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
              <td mat-cell *matCellDef="let element">
                <mat-chip
                  [class.bg-green-100]="element.status === 'Completed'"
                  [class.text-green-800]="element.status === 'Completed'"
                  [class.bg-blue-100]="element.status === 'Sent'"
                  [class.text-blue-800]="element.status === 'Sent'"
                  class="min-h-6 h-6 text-xs border-none"
                >
                  {{ element.status }}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="dateCompleted">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>
                Date Completed
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element.dateCompleted | date: dateFormat }}
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let element">
                <button
                  mat-icon-button
                  [matMenuTriggerFor]="clientRowMenu"
                  [attr.aria-label]="'Actions for form: ' + element.title"
                >
                  <mat-icon aria-hidden="true">more_vert</mat-icon>
                </button>
                <mat-menu #clientRowMenu="matMenu">
                  <button
                    mat-menu-item
                    [attr.aria-label]="'View form: ' + element.title"
                  >
                    <mat-icon aria-hidden="true">visibility</mat-icon> View
                  </button>
                  <button
                    mat-menu-item
                    [attr.aria-label]="'Resend form: ' + element.title"
                  >
                    <mat-icon aria-hidden="true">send</mat-icon> Resend
                  </button>
                  <mat-divider></mat-divider>
                  <button
                    mat-menu-item
                    class="text-red-500"
                    [attr.aria-label]="'Delete form: ' + element.title"
                  >
                    <mat-icon color="warn" aria-hidden="true">delete</mat-icon>
                    Delete
                  </button>
                </mat-menu>
              </td>
            </ng-container>

            <tr
              mat-header-row
              *matHeaderRowDef="displayedClientFormColumns; sticky: true"
            ></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedClientFormColumns"
              class="hover:bg-surface-variant"
            ></tr>
            <tr class="mat-mdc-no-data-row" *matNoDataRow>
              <td
                [attr.colspan]="displayedClientFormColumns.length"
                class="p-8 text-center text-on-surface-variant"
              >
                No records found
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- ── Internal Forms ─────────────────────────────────────────── -->
      <div class="flex flex-col">
        <mat-toolbar class="tab-toolbar">
          <span class="font-semibold text-sm shrink-0">Internal Forms</span>

          <button
            mat-icon-button
            matTooltip="Download"
            aria-label="Download internal forms"
          >
            <mat-icon aria-hidden="true">download</mat-icon>
          </button>
          <button
            mat-icon-button
            matTooltip="Print"
            aria-label="Print internal forms"
            (click)="openPrintFormDialog()"
          >
            <mat-icon aria-hidden="true">print</mat-icon>
          </button>
          <button
            mat-icon-button
            matTooltip="Email"
            aria-label="Email internal forms"
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
              placeholder="Search internal forms…"
              aria-label="Search internal forms"
              (input)="applyInternalFilter($event)"
            />
          </mat-form-field>

          <button
            mat-flat-button
            color="primary"
            aria-label="Create a new internal form"
            (click)="openAddFormDialog()"
          >
            <mat-icon aria-hidden="true">add</mat-icon> Add Form
          </button>
        </mat-toolbar>

        <div class="overflow-auto">
          <table
            mat-table
            [dataSource]="internalDataSource"
            #internalSort="matSort"
            matSort
            class="w-full"
          >
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Date</th>
              <td mat-cell *matCellDef="let element">
                {{ element.date | date: dateFormat }}
              </td>
            </ng-container>

            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Title</th>
              <td
                mat-cell
                *matCellDef="let element"
                class="font-medium text-blue-600 hover:underline cursor-pointer"
              >
                {{ element.title }}
              </td>
            </ng-container>

            <ng-container matColumnDef="client">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Client</th>
              <td mat-cell *matCellDef="let element">{{ element.client }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
              <td mat-cell *matCellDef="let element">
                <mat-chip
                  [class.bg-gray-100]="element.status === 'Draft'"
                  [class.text-gray-800]="element.status === 'Draft'"
                  [class.bg-yellow-100]="element.status === 'Pending'"
                  [class.text-yellow-800]="element.status === 'Pending'"
                  class="min-h-6 h-6 text-xs border-none"
                >
                  {{ element.status }}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="dateCompleted">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>
                Date Completed
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element.dateCompleted | date: dateFormat }}
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let element">
                <button
                  mat-icon-button
                  [matMenuTriggerFor]="internalRowMenu"
                  [attr.aria-label]="'Actions for form: ' + element.title"
                >
                  <mat-icon aria-hidden="true">more_vert</mat-icon>
                </button>
                <mat-menu #internalRowMenu="matMenu">
                  <button
                    mat-menu-item
                    [attr.aria-label]="'Edit form: ' + element.title"
                  >
                    <mat-icon aria-hidden="true">edit</mat-icon> Edit
                  </button>
                  <mat-divider></mat-divider>
                  <button
                    mat-menu-item
                    class="text-red-500"
                    [attr.aria-label]="'Delete form: ' + element.title"
                  >
                    <mat-icon color="warn" aria-hidden="true">delete</mat-icon>
                    Delete
                  </button>
                </mat-menu>
              </td>
            </ng-container>

            <tr
              mat-header-row
              *matHeaderRowDef="displayedClientFormColumns; sticky: true"
            ></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedClientFormColumns"
              class="hover:bg-surface-variant"
            ></tr>
            <tr class="mat-mdc-no-data-row" *matNoDataRow>
              <td
                [attr.colspan]="displayedClientFormColumns.length"
                class="p-8 text-center text-on-surface-variant"
              >
                No records found
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class PatientFormsComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);
  private dialog = inject(MatDialog);
  private patientsService = inject(PatientsService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  @ViewChild('clientSort') clientSort!: MatSort;
  @ViewChild('internalSort') internalSort!: MatSort;

  clientForms: FormItem[] = [
    {
      id: 1,
      date: new Date('2025-11-20'),
      title: 'New Patient Packet',
      client: 'Chandler McClelland',
      status: 'Completed',
      dateCompleted: new Date('2025-11-21'),
    },
    {
      id: 2,
      date: new Date('2025-11-21'),
      title: 'Surgical Consent',
      client: 'Chandler McClelland',
      status: 'Sent',
    },
  ];

  internalForms: FormItem[] = [
    {
      id: 3,
      date: new Date('2025-11-22'),
      title: 'Anesthesia Log',
      client: 'Chandler McClelland',
      status: 'Draft',
    },
  ];

  clientDataSource = new MatTableDataSource(this.clientForms);
  internalDataSource = new MatTableDataSource(this.internalForms);
  displayedClientFormColumns: string[] = [
    'date',
    'title',
    'client',
    'status',
    'dateCompleted',
    'actions',
  ];

  ngAfterViewInit() {
    this.clientDataSource.sort = this.clientSort;
    this.internalDataSource.sort = this.internalSort;
  }

  applyClientFilter(event: Event) {
    this.clientDataSource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
  }

  applyInternalFilter(event: Event) {
    this.internalDataSource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
  }

  openAddFormDialog() {
    const patientId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    const dialogRef = this.dialog.open(PatientFormDialogComponent, {
      width: '600px',
      data: { patientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (patientId) {
          this.patientsService.addForm(patientId, result).subscribe({
            next: (newEntry) => {
               const entryToAdd = { ...result, id: Date.now() };
               this.internalForms = [entryToAdd, ...this.internalForms];
               this.internalDataSource.data = this.internalForms;
               this.snackBar.open('Form added successfully', 'Close', { duration: 3000 });
            },
            error: (err) => {
              console.error('Error adding form', err);
              const entryToAdd = { ...result, id: Date.now() };
              this.internalForms = [entryToAdd, ...this.internalForms];
              this.internalDataSource.data = this.internalForms;
              this.snackBar.open('Form added locally (API failed)', 'Close', { duration: 3000 });
            }
          });
        }
      }
    });
  }

  openSendFormDialog() {
    const patientId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    // Ideally we would look up the client name, but we can just leave it blank for the user to fill based on our form setup
    const dialogRef = this.dialog.open(PatientFormSendDialogComponent, {
      width: '600px',
      data: { patientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (patientId) {
          this.patientsService.sendForm(patientId, result).subscribe({
            next: (newEntry) => {
               const entryToAdd = { ...result, id: Date.now() };
               this.clientForms = [entryToAdd, ...this.clientForms];
               this.clientDataSource.data = this.clientForms;
               this.snackBar.open('Form sent successfully', 'Close', { duration: 3000 });
            },
            error: (err) => {
              console.error('Error sending form', err);
              const entryToAdd = { ...result, id: Date.now() };
              this.clientForms = [entryToAdd, ...this.clientForms];
              this.clientDataSource.data = this.clientForms;
              this.snackBar.open('Form sent locally (API failed)', 'Close', { duration: 3000 });
            }
          });
        }
      }
    });
  }

  openPrintFormDialog() {
    const dialogRef = this.dialog.open(PatientFormPrintDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Printing forms with options:', result);
        this.snackBar.open('Preparing forms for print...', 'Close', { duration: 3000 });
        setTimeout(() => window.print(), 500);
      }
    });
  }
}
