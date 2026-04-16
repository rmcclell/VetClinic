import {
  Component,
  OnInit,
  inject,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { PatientsService } from '../../services/patients.service';
import { ConfigService } from '../../services/config.service';
import { Patient } from '@vet-clinic/shared-types';
import { PatientDialogComponent } from './patient-dialog.component';

@Component({
  selector: 'app-patients-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbarModule,
    MatChipsModule
],
  template: `
    <div class="flex flex-col h-full gap-4">
      <!-- Sticky Toolbar -->
      <mat-toolbar
        class="bg-surface rounded-lg mat-elevation-z2 h-auto py-2 px-4 shrink-0 flex flex-wrap gap-4 justify-between"
      >
        <div class="flex gap-3 items-center">
          <div class="bg-surface-variant p-2 rounded-lg">
            <mat-icon class="text-on-surface">pets</mat-icon>
          </div>
          <div class="flex flex-col justify-center">
            <h1 class="text-xl font-bold text-on-surface m-0 leading-tight">
              Patient Directory
            </h1>
            <p class="text-on-surface-variant text-xs m-0">
              Manage and track all pet medical records
            </p>
          </div>
        </div>

        <div class="flex gap-3 items-center grow md:grow-0">
          <mat-form-field
            appearance="outline"
            class="w-full md:w-64"
            subscriptSizing="dynamic"
          >
            <mat-label>Filter patients</mat-label>
            <input
              matInput
              (keyup)="applyFilter($event)"
              placeholder="Search by name, species, client..."
              #input
            />
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
          <button
            mat-flat-button
            color="primary"
            (click)="addPet()"
            class="h-10"
          >
            <mat-icon>add</mat-icon> Add Patient
          </button>
        </div>
      </mat-toolbar>

      <!-- Table Section -->
      <div
        class="flex-1 min-h-0 mat-elevation-z2 rounded-lg overflow-hidden bg-surface flex flex-col"
      >
        @if (dataSource.data.length > 0) {
          <div class="flex-1 overflow-auto custom-scrollbar">
            <table mat-table [dataSource]="dataSource" matSort class="w-full">
              <ng-container matColumnDef="photo">
                <th
                  mat-header-cell
                  *matHeaderCellDef
                  class="bg-surface-variant"
                >
                  Photo
                </th>
                <td mat-cell *matCellDef="let patient">
                  <div
                    class="w-10 h-10 rounded-full overflow-hidden bg-surface-variant flex items-center justify-center border border-outline my-1"
                  >
                    @if (patient.photoUrl) {
                      <img
                        [src]="patient.photoUrl"
                        class="w-full h-full object-cover"
                        [alt]="patient.name"
                      />
                    } @else {
                      <mat-icon class="text-on-surface-variant opacity-30"
                        >pets</mat-icon
                      >
                    }
                  </div>
                </td>
              </ng-container>

              <ng-container matColumnDef="name">
                <th
                  mat-header-cell
                  *matHeaderCellDef
                  mat-sort-header
                  class="bg-surface-variant"
                >
                  Name
                </th>
                <td mat-cell *matCellDef="let patient" class="font-medium">
                  {{ patient.name }}
                </td>
              </ng-container>

              <ng-container matColumnDef="species">
                <th
                  mat-header-cell
                  *matHeaderCellDef
                  mat-sort-header
                  class="bg-surface-variant"
                >
                  Species
                </th>
                <td mat-cell *matCellDef="let patient">
                  <mat-chip-set>
                    <mat-chip
                      [color]="getSpeciesColor(patient.species)"
                      highlighted
                      class="text-[10px] h-6 min-h-0"
                    >
                      {{ patient.species }}
                    </mat-chip>
                  </mat-chip-set>
                </td>
              </ng-container>

              <ng-container matColumnDef="breed">
                <th
                  mat-header-cell
                  *matHeaderCellDef
                  mat-sort-header
                  class="bg-surface-variant"
                >
                  Breed
                </th>
                <td mat-cell *matCellDef="let patient">
                  {{ patient.breed || '-' }}
                </td>
              </ng-container>

              <ng-container matColumnDef="microchipNumber">
                <th
                  mat-header-cell
                  *matHeaderCellDef
                  mat-sort-header
                  class="bg-surface-variant"
                >
                  Microchip
                </th>
                <td
                  mat-cell
                  *matCellDef="let patient"
                  class="text-sm font-mono text-on-surface-variant"
                >
                  {{ patient.microchipNumber || '-' }}
                </td>
              </ng-container>

              <ng-container matColumnDef="rabiesTag">
                <th
                  mat-header-cell
                  *matHeaderCellDef
                  mat-sort-header
                  class="bg-surface-variant"
                >
                  Rabies Tag
                </th>
                <td mat-cell *matCellDef="let patient">
                  @if (patient.rabiesTag) {
                    <mat-chip-set>
                      <mat-chip
                        class="text-[10px] h-6 min-h-0 bg-green-50 text-green-700"
                      >
                        {{ patient.rabiesTag }}
                      </mat-chip>
                    </mat-chip-set>
                  } @else {
                    <span class="text-on-surface-variant opacity-40">-</span>
                  }
                </td>
              </ng-container>

              <ng-container matColumnDef="preferredProvider">
                <th
                  mat-header-cell
                  *matHeaderCellDef
                  mat-sort-header
                  class="bg-surface-variant"
                >
                  Provider
                </th>
                <td mat-cell *matCellDef="let patient" class="text-sm">
                  {{ patient.preferredProvider || '-' }}
                </td>
              </ng-container>

              <ng-container matColumnDef="Client">
                <th
                  mat-header-cell
                  *matHeaderCellDef
                  class="bg-surface-variant"
                >
                  Client
                </th>
                <td mat-cell *matCellDef="let patient">
                  @if (patient.client) {
                    <div class="flex flex-col text-sm py-2">
                      <span class="font-medium line-clamp-1"
                        >{{ patient.client.firstName }}
                        {{ patient.client.lastName }}</span
                      >
                      <span class="text-xs opacity-60">{{
                        patient.client.phone
                      }}</span>
                    </div>
                  } @else {
                    <span>-</span>
                  }
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th
                  mat-header-cell
                  *matHeaderCellDef
                  aria-label="row actions"
                  class="bg-surface-variant"
                >
                  &nbsp;
                </th>
                <td mat-cell *matCellDef="let patient">
                  <div class="flex justify-end gap-1 px-2">
                    <button
                      mat-icon-button
                      color="primary"
                      (click)="$event.stopPropagation(); viewPatient(patient)"
                      matTooltip="View Patient"
                      [attr.aria-label]="'View patient ' + patient.name"
                    >
                      <mat-icon aria-hidden="true">visibility</mat-icon>
                    </button>
                    <button
                      mat-icon-button
                      color="warn"
                      (click)="$event.stopPropagation(); deletePet(patient)"
                      matTooltip="Delete Patient"
                      [attr.aria-label]="'Delete patient ' + patient.name"
                    >
                      <mat-icon aria-hidden="true">delete</mat-icon>
                    </button>
                  </div>
                </td>
              </ng-container>

              <tr
                mat-header-row
                *matHeaderRowDef="displayedColumns"
                sticky
              ></tr>
              <tr
                mat-row
                *matRowDef="let row; columns: displayedColumns"
                class="hover:bg-surface-variant transition-colors cursor-pointer"
                (click)="viewPatient(row)"
              ></tr>

              <tr class="mat-row" *matNoDataRow>
                <td class="mat-cell p-8 text-center" colspan="100">
                  <div class="flex flex-col items-center gap-2 opacity-60">
                    <mat-icon class="text-4xl w-12 h-12">search_off</mat-icon>
                    <span>No patients matching "{{ input.value }}"</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <mat-paginator
            class="shrink-0 border-t border-outline"
            [pageSizeOptions]="[10, 25, 50, 100]"
            showFirstLastButtons
            aria-label="Select page of patients"
          ></mat-paginator>
        } @else {
          <div
            class="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-60"
            role="status"
            aria-live="polite"
          >
            <mat-icon aria-hidden="true">pets</mat-icon>
            <h3 class="text-lg font-medium m-0">No patients found</h3>
            <p class="text-sm mb-6">
              You haven't added any patients to the directory yet.
            </p>
            <button mat-flat-button color="primary" (click)="addPet()">
              <mat-icon>add</mat-icon> Add your first patient
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .mat-toolbar {
        padding: 0;
      }
      table {
        width: 100%;
      }
      .mat-column-actions {
        width: 100px;
      }
      .mat-mdc-row:hover {
        cursor: pointer;
      }
    `,
  ],
})
export class PatientsPageComponent implements OnInit, AfterViewInit {
  private PatientsService = inject(PatientsService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  public configService = inject(ConfigService);

  dataSource = new MatTableDataSource<Patient>([]);
  displayedColumns: string[] = [
    'photo',
    'name',
    'species',
    'breed',
    'microchipNumber',
    'rabiesTag',
    'preferredProvider',
    'Client',
    'actions',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    console.log('PatientsPageComponent: ngOnInit');
    this.loadPatients();
  }

  ngAfterViewInit() {
    console.log('PatientsPageComponent: ngAfterViewInit');
    this.assignPaginatorAndSort();
  }

  private assignPaginatorAndSort() {
    if (this.sort) this.dataSource.sort = this.sort;
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  loadPatients(): void {
    console.log('PatientsPageComponent: loading patients...');
    this.PatientsService.getPatients().subscribe({
      next: (patients) => {
        console.log(
          `PatientsPageComponent: loaded ${patients.length} patients`,
        );
        this.dataSource.data = patients;
        // Re-assign because they might have been inside an @if that just became true
        setTimeout(() => this.assignPaginatorAndSort());
      },
      error: (err) =>
        console.error('PatientsPageComponent: error loading patients', err),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getSpeciesColor(species: string): string {
    const s = species.toLowerCase();
    if (s.includes('dog')) return 'primary';
    if (s.includes('cat')) return 'accent';
    return '';
  }

  addPet(): void {
    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '600px',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPatients();
      }
    });
  }

  editPet(Patient: Patient): void {
    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '600px',
      maxHeight: '90vh',
      data: Patient,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPatients();
      }
    });
  }

  deletePet(Patient: Patient): void {
    if (confirm(`Are you sure you want to delete ${Patient.name}?`)) {
      this.PatientsService.deletePatient(Patient.id).subscribe(() => {
        this.loadPatients();
      });
    }
  }

  viewPatient(patient: Patient): void {
    this.router.navigate(['/patients', patient.id]);
  }
}
