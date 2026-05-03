import { Component, inject } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ClientsService } from '../../services/clients.service';
import { Client } from '@vet-clinic/shared-types';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  template: `
    <div class="flex flex-col h-full max-h-[90vh]">
      <h1 mat-dialog-title class="flex items-center gap-3 m-0 py-6 px-8 border-b bg-surface">
        <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
          <mat-icon aria-hidden="true">{{ data ? 'person' : 'person_add' }}</mat-icon>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold tracking-tight">{{ data ? 'Edit' : 'Add New' }} Client</span>
          <span class="text-xs text-on-surface-variant font-medium">{{ data ? 'Update profile information' : 'Create a new client record' }}</span>
        </div>
      </h1>

      <div mat-dialog-content class="p-8 pt-4 overflow-x-hidden">
        <form [formGroup]="clientForm" class="flex flex-col gap-10 mt-4">
          
          <!-- Personal Details Section -->
          <section class="flex flex-col gap-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.15em]">
                <mat-icon class="text-lg w-5 h-5! leading-5">person</mat-icon>
                Personal Details
              </div>
              @if (data?.id) {
                <span class="text-[10px] font-black text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                  ID: C-{{ data?.id }}
                </span>
              }
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName" placeholder="e.g. Michael" />
                @if (clientForm.get('firstName')?.hasError('required')) {
                  <mat-error>First name is required</mat-error>
                }
              </mat-form-field>
              
              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName" placeholder="e.g. Chen" />
                @if (clientForm.get('lastName')?.hasError('required')) {
                  <mat-error>Last name is required</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Date of Birth</mat-label>
                <input matInput [matDatepicker]="dobPicker" formControlName="dob" />
                <mat-datepicker-toggle matIconSuffix [for]="dobPicker"></mat-datepicker-toggle>
                <mat-datepicker #dobPicker></mat-datepicker>
              </mat-form-field>

              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Gender</mat-label>
                <mat-select formControlName="gender">
                  <mat-option value="Male">Male</mat-option>
                  <mat-option value="Female">Female</mat-option>
                  <mat-option value="Other">Other</mat-option>
                  <mat-option value="Unknown">Unknown</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" subscriptSizing="dynamic" class="md:col-span-2">
                <mat-label>Client Type</mat-label>
                <mat-select formControlName="clientType">
                  <mat-option value="Regular">Regular</mat-option>
                  <mat-option value="VIP">VIP</mat-option>
                  <mat-option value="Employee">Employee</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </section>

          <!-- Contact Information Section -->
          <section class="flex flex-col gap-5">
            <div class="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.15em]">
              <mat-icon class="text-lg w-5 h-5! leading-5">contact_phone</mat-icon>
              Contact Information
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <mat-form-field appearance="outline" subscriptSizing="dynamic" class="md:col-span-2">
                <mat-label>Email Address</mat-label>
                <mat-icon matPrefix class="mr-2 opacity-40">email</mat-icon>
                <input matInput formControlName="email" type="email" placeholder="name@example.com" />
                @if (clientForm.get('email')?.hasError('email')) {
                  <mat-error>Invalid email format</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Primary Phone</mat-label>
                <mat-icon matPrefix class="mr-2 opacity-40">smartphone</mat-icon>
                <input matInput formControlName="phone" placeholder="555-0101" />
              </mat-form-field>

              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Secondary Phone</mat-label>
                <mat-icon matPrefix class="mr-2 opacity-40">phone_iphone</mat-icon>
                <input matInput formControlName="secondaryPhone" placeholder="Optional" />
              </mat-form-field>

              <mat-form-field appearance="outline" subscriptSizing="dynamic" class="md:col-span-2">
                <mat-label>Physical Address</mat-label>
                <mat-icon matPrefix class="mr-2 opacity-40">place</mat-icon>
                <textarea matInput formControlName="address" rows="2" placeholder="Street, City, State, Zip"></textarea>
              </mat-form-field>
            </div>
          </section>

          <!-- Identification Section -->
          <section class="flex flex-col gap-5">
            <div class="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-[0.15em]">
              <mat-icon class="text-lg w-5 h-5! leading-5">badge</mat-icon>
              Identification
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>DL State</mat-label>
                <input matInput formControlName="driverLicenseState" placeholder="e.g. IL" maxlength="2" />
              </mat-form-field>
              
              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>DL Number</mat-label>
                <input matInput formControlName="driverLicenseNumber" placeholder="ID Number" />
              </mat-form-field>

              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>DL Expiration</mat-label>
                <input matInput [matDatepicker]="dlPicker" formControlName="driverLicenseExp" />
                <mat-datepicker-toggle matIconSuffix [for]="dlPicker"></mat-datepicker-toggle>
                <mat-datepicker #dlPicker></mat-datepicker>
              </mat-form-field>
            </div>
          </section>

          <!-- Emergency Contact Section -->
          <section class="flex flex-col gap-5">
            <div class="flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-[0.15em]">
              <mat-icon class="text-lg w-5 h-5! leading-5">contact_emergency</mat-icon>
              Emergency Contact
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Contact Name</mat-label>
                <input matInput formControlName="emergencyContactName" placeholder="Name" />
              </mat-form-field>
              
              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Contact Phone</mat-label>
                <input matInput formControlName="emergencyContactPhone" placeholder="Phone" />
              </mat-form-field>
            </div>
          </section>

          <!-- Preferences & Account Settings Section -->
          <section class="flex flex-col gap-5">
            <div class="flex items-center gap-2 text-orange-600 font-black text-[10px] uppercase tracking-[0.15em]">
              <mat-icon class="text-lg w-5 h-5! leading-5">settings_suggest</mat-icon>
              Preferences & Account Settings
            </div>
            
            <div class="flex flex-col gap-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div class="flex flex-col">
                    <span class="text-sm font-bold text-gray-800">Email Notifications</span>
                    <span class="text-[10px] text-gray-500">Appointments & Comm</span>
                  </div>
                  <mat-slide-toggle color="primary" [checked]="true"></mat-slide-toggle>
                </div>

                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div class="flex flex-col">
                    <span class="text-sm font-bold text-gray-800">SMS Alerts</span>
                    <span class="text-[10px] text-gray-500">Urgent Reminders</span>
                  </div>
                  <mat-slide-toggle color="primary" [checked]="true"></mat-slide-toggle>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-gray-800">Active Account Status</span>
                  <span class="text-xs text-gray-500">Enable billing and portal access</span>
                </div>
                <mat-slide-toggle formControlName="active" color="primary"></mat-slide-toggle>
              </div>

              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Internal Administrative Notes</mat-label>
                <textarea matInput formControlName="notes" rows="3" placeholder="Special instructions..."></textarea>
              </mat-form-field>
            </div>
          </section>

        </form>
      </div>

      <div mat-dialog-actions class="justify-end px-8 py-6 bg-surface-variant/30 border-t border-outline gap-3">
        <button mat-button (click)="onCancel()" class="px-6 rounded-xl font-bold">Cancel</button>
        <button
          mat-flat-button
          color="primary"
          [disabled]="clientForm.invalid"
          (click)="onSave()"
          class="px-8 rounded-xl font-bold shadow-lg"
        >
          <mat-icon class="mr-2">save</mat-icon> {{ data ? 'Update' : 'Create' }} Profile
        </button>
      </div>
    </div>
  `,
  styles: [`
    .mat-mdc-dialog-content {
      max-height: none !important;
    }
  `]
})
export class ClientDialogComponent {
  data = inject<Client | null>(MAT_DIALOG_DATA);

  private fb = inject(FormBuilder);
  private ClientsService = inject(ClientsService);
  private dialogRef = inject(MatDialogRef<ClientDialogComponent>);

  clientForm: FormGroup;

  constructor() {
    const data = this.data;

    this.clientForm = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      email: [data?.email || '', [Validators.email]],
      phone: [data?.phone || ''],
      secondaryPhone: [data?.secondaryPhone || ''],
      address: [data?.address || ''],
      emergencyContactName: [data?.emergencyContactName || ''],
      emergencyContactPhone: [data?.emergencyContactPhone || ''],
      notes: [data?.notes || ''],
      dob: [data?.dob ? new Date(data.dob) : null],
      gender: [data?.gender || ''],
      driverLicenseState: [data?.driverLicenseState || ''],
      driverLicenseNumber: [data?.driverLicenseNumber || ''],
      driverLicenseExp: [data?.driverLicenseExp ? new Date(data.driverLicenseExp) : null],
      clientType: [data?.clientType || 'Regular'],
      active: [data?.active ?? true],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;
      if (this.data) {
        this.ClientsService.updateClient(this.data.id, clientData).subscribe(
          () => {
            this.dialogRef.close(true);
          },
        );
      } else {
        this.ClientsService.createClient(clientData).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }
}
