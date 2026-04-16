import { Component, OnInit, inject } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientsService } from '../../../services/clients.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule
],
  template: `
    <div class="p-6">
      <form
        [formGroup]="ownerForm"
        class="flex flex-col gap-4 mt-2 mb-4 max-w-4xl"
      >
        <!-- Basic Info Section -->
        <h3
          class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-0 border-b pb-1"
        >
          Basic Information
        </h3>
        <div class="flex flex-col md:flex-row gap-3">
          <mat-form-field class="flex-1" appearance="outline">
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
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Last Name</mat-label>
            <input matInput formControlName="lastName" placeholder="e.g. Doe" />
            @if (ownerForm.get('lastName')?.hasError('required')) {
              <mat-error>Last name is required</mat-error>
            }
          </mat-form-field>
        </div>

        <!-- Contact Section -->
        <h3
          class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-0 border-b pb-1 mt-2"
        >
          Contact Details
        </h3>
        <mat-form-field appearance="outline">
          <mat-label>Email Address</mat-label>
          <mat-icon matPrefix class="mr-2 opacity-60" aria-hidden="true">email</mat-icon>
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
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Primary Phone</mat-label>
            <mat-icon matPrefix class="mr-2 opacity-60" aria-hidden="true">phone</mat-icon>
            <input matInput formControlName="phone" placeholder="555-0123" />
          </mat-form-field>
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Secondary Phone</mat-label>
            <mat-icon matPrefix class="mr-2 opacity-60" aria-hidden="true">phone_iphone</mat-icon>
            <input
              matInput
              formControlName="secondaryPhone"
              placeholder="555-4567"
            />
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Physical Address</mat-label>
          <mat-icon matPrefix class="mr-2 opacity-60" aria-hidden="true">place</mat-icon>
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
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Date of Birth</mat-label>
            <input matInput type="date" formControlName="dob" />
          </mat-form-field>
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Gender</mat-label>
            <mat-select formControlName="gender">
              <mat-option value="M">Male</mat-option>
              <mat-option value="F">Female</mat-option>
              <mat-option value="Other">Other</mat-option>
              <mat-option value="Unknown">Unknown</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field class="flex-1" appearance="outline">
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
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>License State</mat-label>
            <input
              matInput
              formControlName="driverLicenseState"
              placeholder="e.g. CA"
              maxlength="2"
            />
          </mat-form-field>
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>License Number</mat-label>
            <input
              matInput
              formControlName="driverLicenseNumber"
              placeholder="Number"
            />
          </mat-form-field>
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>License Expiration</mat-label>
            <input matInput type="date" formControlName="driverLicenseExp" />
          </mat-form-field>
        </div>

        <!-- Emergency Contact Section -->
        <h3
          class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-0 border-b pb-1 mt-2"
        >
          Emergency Contact
        </h3>
        <div class="flex flex-col md:flex-row gap-3">
          <mat-form-field class="flex-1" appearance="outline">
            <mat-label>Emergency Contact Name</mat-label>
            <input
              matInput
              formControlName="emergencyContactName"
              placeholder="Name"
            />
          </mat-form-field>
          <mat-form-field class="flex-1" appearance="outline">
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
          class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-0 border-b pb-1 mt-2"
        >
          Internal Notes
        </h3>
        <mat-form-field appearance="outline">
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

        <div class="flex justify-end mt-4 pt-4 border-t border-outline">
          <button
            mat-raised-button
            color="primary"
            [disabled]="ownerForm.invalid || ownerForm.pristine"
            (click)="onSave()"
          >
            <mat-icon aria-hidden="true">save</mat-icon> Save Changes
          </button>
        </div>
      </form>
    </div>
  `,
})
export class ClientEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clientsService = inject(ClientsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  clientId!: number;
  ownerForm: FormGroup;

  constructor() {
    this.ownerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      secondaryPhone: [''],
      address: [''],
      emergencyContactName: [''],
      emergencyContactPhone: [''],
      notes: [''],
      dob: [''],
      gender: [''],
      driverLicenseState: [''],
      driverLicenseNumber: [''],
      driverLicenseExp: [''],
      clientType: ['Regular'],
      active: [true],
    });
  }

  ngOnInit() {
    this.route
      .parent!.paramMap.pipe(
        switchMap((params) => {
          this.clientId = Number(params.get('id'));
          return this.clientsService.getOwner(this.clientId);
        }),
      )
      .subscribe((data) => {
        if (data) {
          this.ownerForm.patchValue({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            phone: data.phone || '',
            secondaryPhone: data.secondaryPhone || '',
            address: data.address || '',
            emergencyContactName: data.emergencyContactName || '',
            emergencyContactPhone: data.emergencyContactPhone || '',
            notes: data.notes || '',
            dob: data.dob
              ? new Date(data.dob).toISOString().substring(0, 10)
              : '',
            gender: data.gender || '',
            driverLicenseState: data.driverLicenseState || '',
            driverLicenseNumber: data.driverLicenseNumber || '',
            driverLicenseExp: data.driverLicenseExp
              ? new Date(data.driverLicenseExp).toISOString().substring(0, 10)
              : '',
            clientType: data.clientType || 'Regular',
            active: data.active ?? true,
          });
        }
      });
  }

  onSave(): void {
    if (this.ownerForm.valid) {
      this.clientsService
        .updateOwner(this.clientId, this.ownerForm.value)
        .subscribe({
          next: () => {
            this.snackBar.open('Client updated successfully', 'Close', {
              duration: 3000,
            });
            this.ownerForm.markAsPristine();
            // Also redirect them back to info tab to see the saved changes
            this.router.navigate(['../info'], { relativeTo: this.route });
          },
          error: (err) => {
            console.error('Failed to update client', err);
            this.snackBar.open('Failed to update client', 'Close', {
              duration: 5000,
            });
          },
        });
    }
  }
}
