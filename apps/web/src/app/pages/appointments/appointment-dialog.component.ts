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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppointmentsService } from '../../services/appointments.service';
import { ClientsService } from '../../services/clients.service';
import { PatientsService } from '../../services/patients.service';
import { Appointment, Client, Patient } from '@vet-clinic/shared-types';

@Component({
  selector: 'app-appointment-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
],
  template: `
    <h1 mat-dialog-title>{{ data ? 'Edit' : 'Book' }} Appointment</h1>
    <div mat-dialog-content>
      <form [formGroup]="appointmentForm" class="flex flex-col gap-4 mt-2">
        <mat-form-field appearance="outline">
          <mat-label>Client</mat-label>
          <mat-select
            formControlName="clientId"
            (selectionChange)="onClientChange($event.value)"
          >
            @for (client of clients; track client.id) {
              <mat-option [value]="client.id">
                {{ client.firstName }} {{ client.lastName }}
              </mat-option>
            }
          </mat-select>
          @if (appointmentForm.get('clientId')?.hasError('required')) {
            <mat-error>Client is required</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Patient</mat-label>
          <mat-select formControlName="patientId">
            @for (patient of filteredPatients; track patient.id) {
              <mat-option [value]="patient.id">
                {{ patient.name }} ({{ patient.species }})
              </mat-option>
            }
            @if (filteredPatients.length === 0) {
              <mat-option disabled>Please select a Client first</mat-option>
            }
          </mat-select>
          @if (appointmentForm.get('patientId')?.hasError('required')) {
            <mat-error>Patient is required</mat-error>
          }
        </mat-form-field>

        <div class="flex gap-4 flex-wrap">
          <mat-form-field class="flex-1 min-w-36" appearance="outline">
            <mat-label>Date</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="date" />
            <mat-datepicker-toggle
              matSuffix
              [for]="picker"
            ></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <mat-form-field class="flex-1 min-w-36" appearance="outline">
            <mat-label>Time</mat-label>
            <input matInput type="time" formControlName="time" />
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Duration (minutes)</mat-label>
          <mat-select formControlName="duration">
            <mat-option [value]="15">15 min</mat-option>
            <mat-option [value]="30">30 min</mat-option>
            <mat-option [value]="45">45 min</mat-option>
            <mat-option [value]="60">60 min</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Notes / Reason for Visit</mat-label>
          <textarea
            matInput
            formControlName="description"
            rows="3"
            placeholder="e.g. Annual vaccination checkup"
          ></textarea>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions class="justify-end p-4">
      <button mat-button (click)="onCancel()" aria-label="Cancel and close dialog">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        [disabled]="appointmentForm.invalid"
        (click)="onSave()"
        [attr.aria-label]="data && $any(data).id ? 'Update appointment' : 'Book appointment'"
      >
        {{ data && $any(data).id ? 'Update' : 'Book' }}
      </button>
    </div>
  `,
})
export class AppointmentDialogComponent implements OnInit {
  data = inject<Appointment | {
    date?: Date;
} | null>(MAT_DIALOG_DATA);

  private fb = inject(FormBuilder);
  private appointmentsService = inject(AppointmentsService);
  private ClientsService = inject(ClientsService);
  private PatientsService = inject(PatientsService);
  private dialogRef = inject(MatDialogRef<AppointmentDialogComponent>);

  appointmentForm: FormGroup;
  clients: Client[] = [];
  allPatients: Patient[] = [];
  filteredPatients: Patient[] = [];

  constructor() {
    const data = this.data;

    const dataAsApt = data as Appointment;
    const dataAsDateObj = data as { date?: Date };

    const initialDate =
      data && 'date' in data && dataAsDateObj.date
        ? dataAsDateObj.date
        : data && 'startTime' in data && dataAsApt.startTime
          ? new Date(dataAsApt.startTime)
          : new Date();

    const timeStr = initialDate.toTimeString().substring(0, 5);

    this.appointmentForm = this.fb.group({
      clientId: [(data as Appointment)?.clientId || '', Validators.required],
      patientId: [(data as Appointment)?.patientId || '', Validators.required],
      date: [initialDate, Validators.required],
      time: [timeStr, Validators.required],
      duration: [30, Validators.required],
      description: [(data as Appointment)?.description || ''],
      status: [(data as Appointment)?.status || 'Scheduled'],
    });
  }

  ngOnInit(): void {
    this.ClientsService.getClients().subscribe((clients) => {
      this.clients = clients;
    });

    this.PatientsService.getPatients().subscribe((patients) => {
      this.allPatients = patients;
      if (this.appointmentForm.get('clientId')?.value) {
        this.onClientChange(this.appointmentForm.get('clientId')?.value);
      }
    });
  }

  onClientChange(clientId: number): void {
    this.filteredPatients = this.allPatients.filter(
      (p) => p.clientId === clientId,
    );
    if (
      !this.filteredPatients.find(
        (p) => p.id === this.appointmentForm.get('patientId')?.value,
      )
    ) {
      this.appointmentForm.patchValue({ patientId: '' });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.appointmentForm.valid) {
      const val = this.appointmentForm.value;
      const startTime = new Date(val.date);
      const [hours, minutes] = val.time.split(':');
      startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + val.duration);

      const appointmentData = {
        clientId: val.clientId,
        patientId: val.patientId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        description: val.description,
        status: val.status,
      };

      if (this.data && 'id' in this.data) {
        this.appointmentsService
          .updateAppointment(this.data.id, appointmentData)
          .subscribe(() => {
            this.dialogRef.close(true);
          });
      } else {
        this.appointmentsService
          .createAppointment(appointmentData)
          .subscribe(() => {
            this.dialogRef.close(true);
          });
      }
    }
  }
}
