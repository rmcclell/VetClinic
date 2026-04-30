import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-client-patient-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  template: `
    <form [formGroup]="patientForm" (ngSubmit)="onSave()" class="flex flex-col">
      <h2 mat-dialog-title class="flex items-center gap-3 m-0 py-4 border-b">
        <mat-icon color="primary">pets</mat-icon>
        <span class="font-semibold">Add New Patient</span>
      </h2>

      <mat-dialog-content>
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8">
          <!-- Profile Section -->
          <div class="flex flex-col items-center gap-4">
            <div
              class="w-28 h-28 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold border-4 border-surface shadow-md"
            >
              <mat-icon class="text-5xl w-12 h-12 leading-12">pets</mat-icon>
            </div>
            <button mat-button color="primary" type="button" class="text-xs uppercase tracking-wider">
              Upload Photo
            </button>
          </div>

          <!-- Form Fields -->
          <div class="flex flex-col gap-6">
            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Patient Name</mat-label>
              <input matInput formControlName="name" placeholder="e.g. Buddy" />
              @if (patientForm.get('name')?.hasError('required')) {
                <mat-error>Name is required</mat-error>
              }
            </mat-form-field>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Species</mat-label>
                <mat-select formControlName="species">
                  <mat-option value="Dog">Dog</mat-option>
                  <mat-option value="Cat">Cat</mat-option>
                  <mat-option value="Bird">Bird</mat-option>
                  <mat-option value="Exotic">Exotic</mat-option>
                  <mat-option value="Other">Other</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Breed</mat-label>
                <input matInput formControlName="breed" placeholder="e.g. Golden Retriever" />
              </mat-form-field>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Sex</mat-label>
                <mat-select formControlName="sex">
                  <mat-option value="Male">Male</mat-option>
                  <mat-option value="Female">Female</mat-option>
                  <mat-option value="Neutered Male">Neutered Male</mat-option>
                  <mat-option value="Spayed Female">Spayed Female</mat-option>
                  <mat-option value="Unknown">Unknown</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Birth Date</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="birthDate" />
                <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Weight</mat-label>
                <input matInput type="number" formControlName="weight" placeholder="0.0" />
              </mat-form-field>

              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Microchip #</mat-label>
                <input matInput formControlName="microchipNumber" placeholder="Optional" />
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Notes</mat-label>
              <textarea matInput formControlName="notes" rows="3" placeholder="Any special needs or temperament issues..."></textarea>
            </mat-form-field>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="p-6 border-t gap-2">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button
          mat-flat-button
          color="primary"
          type="submit"
          [disabled]="patientForm.invalid"
          class="px-8 py-1 rounded-lg"
        >
          <mat-icon class="mr-2">save</mat-icon>
          Add Patient
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .mat-mdc-dialog-title {
        padding: 24px 24px 20px !important;
        margin: 0 !important;
        display: flex !important;
        align-items: center;
      }
      .mat-mdc-dialog-content {
        padding: 32px 24px !important;
        max-height: 70vh;
        overflow-x: hidden !important;
      }
      .mat-mdc-dialog-actions {
        padding: 16px 24px !important;
        margin-bottom: 0 !important;
      }
    `,
  ],
})
export class ClientPatientDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClientPatientDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  public patientForm = this.fb.group({
    name: ['', Validators.required],
    species: ['Dog', Validators.required],
    breed: [''],
    sex: ['Unknown'],
    weight: [null as number | null],
    microchipNumber: [''],
    birthDate: [null as Date | null],
    notes: [''],
    clientId: [this.data?.clientId],
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.patientForm.valid) {
      this.dialogRef.close(this.patientForm.value);
    }
  }
}
