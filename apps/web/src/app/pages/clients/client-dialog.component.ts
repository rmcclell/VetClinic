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

@Component({
  selector: 'app-client-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatSlideToggleModule
],
  template: `
    <h1 mat-dialog-title class="flex items-center gap-2">
      <mat-icon color="primary" aria-hidden="true">{{
        data ? 'person' : 'person_add'
      }}</mat-icon>
      {{ data ? 'Edit' : 'Add New' }} Client
    </h1>

    <div mat-dialog-content>
      <form [formGroup]="ownerForm" class="flex flex-col gap-4 mt-2 mb-4">
        <!-- Basic Info Section -->
        <h3
          class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-0 border-b pb-1"
        >
          Basic Information
        </h3>
        <div class="flex flex-col md:flex-row gap-3">
          <mat-form-field
            class="flex-1"
            appearance="outline"
            subscriptSizing="dynamic"
          >
            <mat-label>First Name</mat-label>
            <input
              matInput
              formControlName="firstName"
              placeholder="e.g. John"
            />
            @if (ownerForm.get('firstName')?.hasError('required')) {
              <mat-error>First name is required</mat-error>
            }
          </mat-form-field>
          <mat-form-field
            class="flex-1"
            appearance="outline"
            subscriptSizing="dynamic"
          >
            <mat-label>Last Name</mat-label>
            <input matInput formControlName="lastName" placeholder="e.g. Doe" />
            @if (ownerForm.get('lastName')?.hasError('required')) {
              <mat-error>Last name is required</mat-error>
            }
          </mat-form-field>
        </div>

        <!-- Contact Section -->
        <h3
          class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-0 border-b pb-1"
        >
          Contact Details
        </h3>
        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Email Address</mat-label>
          <mat-icon matPrefix class="mr-2 opacity-60">email</mat-icon>
          <input
            matInput
            formControlName="email"
            type="email"
            placeholder="client@example.com"
          />
          @if (ownerForm.get('email')?.hasError('email')) {
            <mat-error>Please enter a valid email address</mat-error>
          }
        </mat-form-field>

        <div class="flex flex-col md:flex-row gap-3">
          <mat-form-field
            class="flex-1"
            appearance="outline"
            subscriptSizing="dynamic"
          >
            <mat-label>Primary Phone</mat-label>
            <mat-icon matPrefix class="mr-2 opacity-60">phone</mat-icon>
            <input matInput formControlName="phone" placeholder="555-0123" />
          </mat-form-field>
          <mat-form-field
            class="flex-1"
            appearance="outline"
            subscriptSizing="dynamic"
          >
            <mat-label>Secondary Phone</mat-label>
            <mat-icon matPrefix class="mr-2 opacity-60">phone_iphone</mat-icon>
            <input
              matInput
              formControlName="secondaryPhone"
              placeholder="555-4567"
            />
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Physical Address</mat-label>
          <mat-icon matPrefix class="mr-2 opacity-60">place</mat-icon>
          <textarea
            matInput
            formControlName="address"
            rows="2"
            placeholder="Street, City, State, Zip"
          ></textarea>
        </mat-form-field>

        <!-- Demographics Section -->
        <h3
          class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-0 border-b pb-1 mt-2"
        >
          Demographics
        </h3>
        <div class="flex flex-col md:flex-row gap-3">
          <mat-form-field
            class="flex-1"
            appearance="outline"
            subscriptSizing="dynamic"
          >
            <mat-label>Date of Birth</mat-label>
            <input matInput type="date" formControlName="dob" />
          </mat-form-field>
          <mat-form-field
            class="flex-1"
            appearance="outline"
            subscriptSizing="dynamic"
          >
            <mat-label>Gender</mat-label>
            <mat-select formControlName="gender">
              <mat-option value="M">Male</mat-option>
              <mat-option value="F">Female</mat-option>
              <mat-option value="Other">Other</mat-option>
              <mat-option value="Unknown">Unknown</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field
            class="flex-1"
            appearance="outline"
            subscriptSizing="dynamic"
          >
            <mat-label>Client Type</mat-label>
            <mat-select formControlName="clientType">
              <mat-option value="Regular">Regular</mat-option>
              <mat-option value="VIP">VIP</mat-option>
              <mat-option value="Employee">Employee</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <!-- Identity Section -->
        <h3
          class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-0 border-b pb-1 mt-2"
        >
          Identity
        </h3>
        <div class="flex flex-col md:flex-row gap-3">
          <mat-form-field
            class="flex-1"
            appearance="outline"
            subscriptSizing="dynamic"
          >
            <mat-label>License State</mat-label>
            <input
              matInput
              formControlName="driverLicenseState"
              placeholder="e.g. CA"
              maxlength="2"
            />
          </mat-form-field>
          <mat-form-field
            class="flex-1"
            appearance="outline"
            subscriptSizing="dynamic"
          >
            <mat-label>License Number</mat-label>
            <input
              matInput
              formControlName="driverLicenseNumber"
              placeholder="Number"
            />
          </mat-form-field>
          <mat-form-field
            class="flex-1"
            appearance="outline"
            subscriptSizing="dynamic"
          >
            <mat-label>License Expiration</mat-label>
            <input matInput type="date" formControlName="driverLicenseExp" />
          </mat-form-field>
        </div>

        <!-- Emergency Contact Section -->
        <h3
          class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-0 border-b pb-1"
        >
          Emergency Contact
        </h3>
        <div class="flex flex-col md:flex-row gap-3">
          <mat-form-field
            class="flex-1"
            appearance="outline"
            subscriptSizing="dynamic"
          >
            <mat-label>Emergency Contact Name</mat-label>
            <input
              matInput
              formControlName="emergencyContactName"
              placeholder="Name"
            />
          </mat-form-field>
          <mat-form-field
            class="flex-1"
            appearance="outline"
            subscriptSizing="dynamic"
          >
            <mat-label>Emergency Contact Phone</mat-label>
            <input
              matInput
              formControlName="emergencyContactPhone"
              placeholder="Phone"
            />
          </mat-form-field>
        </div>

        <!-- Notes Section -->
        <h3
          class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-0 border-b pb-1"
        >
          Internal Notes
        </h3>
        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Administrative Notes</mat-label>
          <textarea
            matInput
            formControlName="notes"
            rows="3"
            placeholder="Any special instructions or notes..."
          ></textarea>
        </mat-form-field>

        <!-- Account Status -->
        <h3
          class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-0 border-b pb-1 mt-2"
        >
          Account Status
        </h3>
        <div class="py-2">
          <mat-slide-toggle formControlName="active" color="primary"
            >Active Client</mat-slide-toggle
          >
        </div>
      </form>
    </div>

    <div
      mat-dialog-actions
      class="justify-end px-6 py-4 bg-surface-variant border-t border-outline"
    >
      <button mat-button (click)="onCancel()" class="mr-2">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        [disabled]="ownerForm.invalid"
        (click)="onSave()"
      >
        <mat-icon>save</mat-icon> {{ data ? 'Update' : 'Create' }} Client
      </button>
    </div>
  `,
})
export class ClientDialogComponent {
  data = inject<Client | null>(MAT_DIALOG_DATA);

  private fb = inject(FormBuilder);
  private ClientsService = inject(ClientsService);
  private dialogRef = inject(MatDialogRef<ClientDialogComponent>);

  ownerForm: FormGroup;

  constructor() {
    const data = this.data;

    this.ownerForm = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      email: [data?.email || '', [Validators.email]],
      phone: [data?.phone || ''],
      secondaryPhone: [data?.secondaryPhone || ''],
      address: [data?.address || ''],
      emergencyContactName: [data?.emergencyContactName || ''],
      emergencyContactPhone: [data?.emergencyContactPhone || ''],
      notes: [data?.notes || ''],
      dob: [data?.dob ? new Date(data.dob).toISOString().substring(0, 10) : ''],
      gender: [data?.gender || ''],
      driverLicenseState: [data?.driverLicenseState || ''],
      driverLicenseNumber: [data?.driverLicenseNumber || ''],
      driverLicenseExp: [
        data?.driverLicenseExp
          ? new Date(data.driverLicenseExp).toISOString().substring(0, 10)
          : '',
      ],
      clientType: [data?.clientType || 'Regular'],
      active: [data?.active ?? true],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.ownerForm.valid) {
      const ownerData = this.ownerForm.value;
      if (this.data) {
        this.ClientsService.updateOwner(this.data.id, ownerData).subscribe(
          () => {
            this.dialogRef.close(true);
          },
        );
      } else {
        this.ClientsService.createOwner(ownerData).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }
}
