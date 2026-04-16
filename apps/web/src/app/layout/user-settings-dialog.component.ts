import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-user-settings-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule
],
  template: `
    <h2
      mat-dialog-title
      class="flex items-center gap-2 border-b border-outline pb-4 m-0"
    >
      <mat-icon color="primary" aria-hidden="true">manage_accounts</mat-icon>
      User Settings
    </h2>

    <mat-dialog-content class="overflow-x-hidden min-h-[400px] pt-8">
      <div class="flex flex-col md:flex-row gap-10 items-start w-full">
        <div
          class="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-4xl font-bold shadow-sm shrink-0 border-4 border-surface shadow-lg"
        >
          SS
        </div>

        <form [formGroup]="userForm" class="flex-1 w-full flex flex-col gap-6">
          <div class="flex flex-col md:flex-row gap-4 text-lg">
            <mat-form-field
              appearance="outline"
              subscriptSizing="dynamic"
              class="flex-1 w-full"
            >
              <mat-label>First Name</mat-label>
              <input matInput formControlName="firstName" class="text-lg" />
            </mat-form-field>
            <mat-form-field
              appearance="outline"
              subscriptSizing="dynamic"
              class="flex-1 w-full"
            >
              <mat-label>Last Name</mat-label>
              <input matInput formControlName="lastName" class="text-lg" />
            </mat-form-field>
          </div>

          <mat-form-field
            appearance="outline"
            subscriptSizing="dynamic"
            class="w-full text-lg"
          >
            <mat-label>Email Address</mat-label>
            <mat-icon matPrefix class="mr-3 opacity-60">email</mat-icon>
            <input
              matInput
              formControlName="email"
              type="email"
              class="text-lg"
            />
          </mat-form-field>

          <mat-form-field
            appearance="outline"
            subscriptSizing="dynamic"
            class="w-full text-lg"
          >
            <mat-label>Role</mat-label>
            <mat-select formControlName="role" class="text-lg">
              <mat-option value="Veterinarian">Veterinarian</mat-option>
              <mat-option value="Vet Tech">Vet Tech</mat-option>
              <mat-option value="Practice Manager">Practice Manager</mat-option>
              <mat-option value="Receptionist">Receptionist</mat-option>
            </mat-select>
            <mat-icon matPrefix class="mr-3 opacity-60">badge</mat-icon>
          </mat-form-field>

          <div
            class="bg-surface-variant/30 p-4 rounded-xl border border-outline mt-2"
          >
            <mat-slide-toggle
              color="primary"
              formControlName="notificationsEnabled"
              class="text-base text-on-surface font-medium"
            >
              Enable Email Notifications for Patient Updates
            </mat-slide-toggle>
          </div>
        </form>
      </div>
    </mat-dialog-content>

    <div
      mat-dialog-actions
      class="justify-end px-6 py-4 bg-surface-variant border-t border-outline mt-6"
    >
      <button mat-button (click)="onCancel()" class="mr-2 rounded-lg">
        Cancel
      </button>
      <button
        mat-flat-button
        color="primary"
        (click)="onSave()"
        [disabled]="userForm.invalid || userForm.pristine"
        class="rounded-lg"
      >
        <mat-icon>save</mat-icon> Save Changes
      </button>
    </div>
  `,
  styles: [
    `
      ::ng-deep .mat-mdc-dialog-surface {
        border-radius: 16px !important;
      }
      ::ng-deep .mat-mdc-dialog-content {
        overflow-x: hidden !important;
      }
    `,
  ],
})
export class UserSettingsDialogComponent {
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<UserSettingsDialogComponent>);

  public userForm = this.fb.group({
    firstName: ['Sarah', Validators.required],
    lastName: ['Smith', Validators.required],
    email: ['sarah.smith@clinic.com', [Validators.required, Validators.email]],
    role: ['Veterinarian', Validators.required],
    notificationsEnabled: [true],
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.userForm.valid) {
      // In a real app, dispatch to a generic AppState service
      this.dialogRef.close(this.userForm.value);
    }
  }
}
