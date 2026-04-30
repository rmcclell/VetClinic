import { Component, inject } from '@angular/core';
import {
  FormBuilder,
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
    MatSlideToggleModule,
  ],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSave()" class="flex flex-col">
      <h2 mat-dialog-title class="flex items-center gap-3 border-b">
        <mat-icon color="primary">manage_accounts</mat-icon>
        <span class="font-semibold">User Settings</span>
      </h2>

      <mat-dialog-content>
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-x-10 gap-y-8">
          <!-- Profile Section -->
          <div class="flex flex-col items-center gap-4">
            <div
              class="w-28 h-28 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold border-4 border-surface shadow-md"
            >
              SS
            </div>
            <button mat-button color="primary" type="button" class="text-xs uppercase tracking-wider">
              Change Photo
            </button>
          </div>

          <!-- Form Fields -->
          <div class="flex flex-col gap-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName" placeholder="e.g. Sarah" />
                @if (userForm.get('firstName')?.hasError('required')) {
                  <mat-error>Required</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName" placeholder="e.g. Smith" />
                @if (userForm.get('lastName')?.hasError('required')) {
                  <mat-error>Required</mat-error>
                }
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Email Address</mat-label>
              <mat-icon matPrefix class="opacity-50 mr-2">email</mat-icon>
              <input matInput formControlName="email" type="email" placeholder="sarah@example.com" />
              @if (userForm.get('email')?.hasError('email')) {
                <mat-error>Invalid email</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Role</mat-label>
              <mat-icon matPrefix class="opacity-50 mr-2">badge</mat-icon>
              <mat-select formControlName="role">
                <mat-option value="Veterinarian">Veterinarian</mat-option>
                <mat-option value="Vet Tech">Vet Tech</mat-option>
                <mat-option value="Practice Manager">Practice Manager</mat-option>
                <mat-option value="Receptionist">Receptionist</mat-option>
              </mat-select>
            </mat-form-field>

            <div class="mt-2 p-4 rounded-xl bg-secondary/5 border border-outline/50">
              <mat-slide-toggle formControlName="notificationsEnabled" color="primary">
                Enable email notifications
              </mat-slide-toggle>
            </div>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="p-6 border-t gap-2">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button
          mat-flat-button
          color="primary"
          type="submit"
          [disabled]="userForm.invalid || userForm.pristine"
          class="px-8 py-1 rounded-lg"
        >
          <mat-icon class="mr-2">save</mat-icon>
          Save Changes
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
      this.dialogRef.close(this.userForm.value);
    }
  }
}
