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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PatientsService } from '../../../services/patients.service';
import { ClientsService } from '../../../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { ClientFormDialogComponent } from './client-form-dialog.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-client-forms',
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
    MatDialogModule,
    MatSnackBarModule,
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
            placeholder="Search forms..."
            aria-label="Search forms"
            (input)="applyFilter($event)"
          />
        </mat-form-field>
        <button mat-flat-button color="primary" aria-label="Add Form" (click)="openSendFormDialog()">
          <mat-icon aria-hidden="true">add</mat-icon>
          <span class="hidden sm:inline ml-1">Send Form</span>
        </button>
      </mat-toolbar>

      <div class="flex-1 overflow-auto">
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <ng-container matColumnDef="dateSent">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Date Sent</th>
            <td mat-cell *matCellDef="let element" class="whitespace-nowrap">
              {{ element.dateSent | date: dateFormat }}
            </td>
          </ng-container>

          <ng-container matColumnDef="formName">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Form</th>
            <td
              mat-cell
              *matCellDef="let element"
              class="font-bold text-blue-600 hover:underline cursor-pointer"
            >
              {{ element.formName }}
            </td>
          </ng-container>

          <ng-container matColumnDef="patient">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Patient</th>
            <td mat-cell *matCellDef="let element">{{ element.patient }}</td>
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
                [attr.aria-label]="'Options for form ' + element.formName"
              >
                <mat-icon aria-hidden="true">more_vert</mat-icon>
              </button>
              <mat-menu #rowMenu="matMenu">
                <button mat-menu-item>
                  <mat-icon aria-hidden="true">visibility</mat-icon> View Form
                </button>
                <button mat-menu-item>
                  <mat-icon aria-hidden="true">forward_to_inbox</mat-icon>
                  Resend
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
              No forms found.
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,
})
export class ClientFormsComponent implements AfterViewInit {
  readonly dateFormat = inject(DATE_FORMAT);
  private dialog = inject(MatDialog);
  private patientsService = inject(PatientsService);
  private clientsService = inject(ClientsService);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) sort!: MatSort;

  dummyData = [
    {
      id: 1,
      dateSent: new Date('2026-03-31'),
      formName: 'New Client Registration',
      patient: 'N/A',
      status: 'Completed',
    },
    {
      id: 2,
      dateSent: new Date('2026-04-10'),
      formName: 'Canine Spay Consent Form',
      patient: 'Luna',
      status: 'Pending',
    },
  ];

  dataSource = new MatTableDataSource(this.dummyData);
  displayedColumns: string[] = [
    'dateSent',
    'formName',
    'patient',
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

  async openSendFormDialog() {
    const clientId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    if (!clientId) return;

    try {
      const client = await firstValueFrom(this.clientsService.getClient(clientId));
      const dialogRef = this.dialog.open(ClientFormDialogComponent, {
        width: '600px',
        data: { 
          clientId,
          patients: client.patients || [] 
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.patientsService.sendForm(result.patientId || 0, result).subscribe({
            next: () => {
              const patientName = client.patients?.find(p => p.id === result.patientId)?.name || 'N/A';
              const templateNames: {[key: string]: string} = {
                '1': 'New Client Registration',
                '2': 'Surgery Consent Form',
                '3': 'Anesthesia Consent',
                '4': 'Vaccine Waiver',
                '5': 'Boarding Agreement'
              };
              const newEntry = {
                id: Date.now(),
                dateSent: new Date(),
                formName: templateNames[result.templateId] || 'Digital Form',
                patient: patientName,
                status: 'Pending'
              };
              this.dummyData = [newEntry, ...this.dummyData];
              this.dataSource.data = this.dummyData;
              this.snackBar.open('Form sent successfully', 'Close', { duration: 3000 });
            },
            error: (err) => {
              console.error('Error sending form:', err);
              this.snackBar.open('Error sending form', 'Close', { duration: 3000 });
            }
          });
        }
      });
    } catch (err) {
      console.error('Error fetching client patients:', err);
      this.snackBar.open('Error loading patient data', 'Close', { duration: 3000 });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'bg-orange-50 text-orange-700';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  }
}
