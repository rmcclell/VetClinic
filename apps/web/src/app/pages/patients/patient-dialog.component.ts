import { Component, OnInit, inject } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { PatientsService } from '../../services/patients.service';
import { ClientsService } from '../../services/clients.service';
import { ConfigService } from '../../services/config.service';
import { Patient, Client } from '@vet-clinic/shared-types';

@Component({
  selector: 'app-patient-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
],
  template: `
    <h1 mat-dialog-title>{{ data ? 'Edit' : 'Add' }} Patient</h1>
    <div mat-dialog-content>
      <div class="flex flex-col items-center mb-6">
        <div
          class="w-32 h-32 rounded-full border-2 border-dashed border-(--color-outline) flex items-center justify-center overflow-hidden bg-(--color-surface-variant) mb-3 relative group"
        >
          @if (photoPreview) {
            <img
              [src]="photoPreview"
              class="w-full h-full object-cover"
              alt="Patient photo preview"
            />
            <button
              type="button"
              class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none"
              (click)="fileInput.click()"
              aria-label="Edit photo"
            >
              <mat-icon class="text-white">edit</mat-icon>
            </button>
          } @else {
            <mat-icon
              class="text-on-surface-variant opacity-20 text-4xl w-10 h-10"
              aria-hidden="true"
              >pets</mat-icon
            >
            <button
              type="button"
              class="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent border-none w-full h-full"
              (click)="fileInput.click()"
              aria-label="Add photo"
            ></button>
          }
        </div>
        <button mat-stroked-button type="button" (click)="fileInput.click()">
          <mat-icon>photo_camera</mat-icon>
          {{ photoPreview ? 'Change Photo' : 'Add Photo' }}
        </button>
        <input
          #fileInput
          type="file"
          class="hidden"
          accept="image/*"
          (change)="onFileSelected($event)"
        />
      </div>

      <form [formGroup]="petForm" class="flex flex-col gap-4 mt-2">
        <mat-form-field appearance="outline">
          <mat-label>Patient Name</mat-label>
          <input matInput formControlName="name" />
          @if (petForm.get('name')?.hasError('required')) {
            <mat-error>Name is required</mat-error>
          }
        </mat-form-field>

        <div class="flex gap-4">
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Species</mat-label>
            <mat-select formControlName="species">
              <mat-option value="Dog">Dog</mat-option>
              <mat-option value="Cat">Cat</mat-option>
              <mat-option value="Bird">Bird</mat-option>
              <mat-option value="Reptile">Reptile</mat-option>
              <mat-option value="Other">Other</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Breed</mat-label>
            <input matInput formControlName="breed" />
          </mat-form-field>
        </div>

        <div class="flex gap-4">
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Sex</mat-label>
            <mat-select formControlName="sex">
              <mat-option value="Male">Male</mat-option>
              <mat-option value="Female">Female</mat-option>
              <mat-option value="Neutered Male">Neutered Male</mat-option>
              <mat-option value="Spayed Female">Spayed Female</mat-option>
              <mat-option value="Unknown">Unknown</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label
              >Weight ({{
                configService.config()?.units === 'imperial' ? 'lbs' : 'kg'
              }})</mat-label
            >
            <input matInput type="number" formControlName="weight" />
          </mat-form-field>
        </div>

        <div class="flex gap-4">
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Microchip Number</mat-label>
            <input matInput formControlName="microchipNumber" />
          </mat-form-field>
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Rabies Tag Number</mat-label>
            <input matInput formControlName="rabiesTag" />
          </mat-form-field>
        </div>

        <div class="flex gap-4">
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Color/Markings</mat-label>
            <input matInput formControlName="color" />
          </mat-form-field>
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Preferred Provider</mat-label>
            <input
              matInput
              formControlName="preferredProvider"
              placeholder="e.g. Dr. Sarah Smith"
            />
          </mat-form-field>
        </div>

        <div class="flex gap-4">
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Referral Source</mat-label>
            <input
              matInput
              formControlName="referralSource"
              placeholder="e.g. Google, Friend"
            />
          </mat-form-field>
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Birth Date</mat-label>
            <input matInput type="date" formControlName="birthDate" />
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Client</mat-label>
          <mat-select formControlName="clientId">
            @for (client of clients; track client.id) {
              <mat-option [value]="client.id">
                {{ client.firstName }} {{ client.lastName }}
              </mat-option>
            }
          </mat-select>
          @if (petForm.get('clientId')?.hasError('required')) {
            <mat-error>A client must be selected</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Clinical Notes</mat-label>
          <textarea matInput formControlName="notes" rows="3"></textarea>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions class="justify-end p-4">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        [disabled]="petForm.invalid"
        (click)="onSave()"
      >
        Save
      </button>
    </div>
  `,
})
export class PatientDialogComponent implements OnInit {
  data = inject<Patient | null>(MAT_DIALOG_DATA);

  private fb = inject(FormBuilder);
  private PatientsService = inject(PatientsService);
  private ClientsService = inject(ClientsService);
  public configService = inject(ConfigService);
  private dialogRef = inject(MatDialogRef<PatientDialogComponent>);

  petForm: FormGroup;
  clients: Client[] = [];
  photoPreview: string | null = null;

  constructor() {
    const data = this.data;

    this.petForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      species: [data?.species || 'Dog', Validators.required],
      breed: [data?.breed || ''],
      sex: [data?.sex || 'Unknown'],
      weight: [data?.weight || null],
      microchipNumber: [data?.microchipNumber || ''],
      color: [data?.color || ''],
      birthDate: [
        data?.birthDate
          ? new Date(data.birthDate).toISOString().substring(0, 10)
          : '',
      ],
      notes: [data?.notes || ''],
      clientId: [data?.clientId || '', Validators.required],
      photoUrl: [data?.photoUrl || null],
      rabiesTag: [data?.rabiesTag || ''],
      preferredProvider: [data?.preferredProvider || ''],
      referralSource: [data?.referralSource || ''],
    });
    this.photoPreview = data?.photoUrl || null;
  }

  ngOnInit(): void {
    this.ClientsService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.photoPreview = result;
        this.petForm.patchValue({ photoUrl: result });
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.petForm.valid) {
      const petData = this.petForm.value;
      if (this.data) {
        this.PatientsService.updatePatient(this.data.id, petData).subscribe(
          () => {
            this.dialogRef.close(true);
          },
        );
      } else {
        this.PatientsService.createPatient(petData).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }
}
