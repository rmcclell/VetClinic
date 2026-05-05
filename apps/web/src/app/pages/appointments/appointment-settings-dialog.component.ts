import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-appointment-settings-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatCheckboxModule,
  ],
  template: `
    <div class="flex flex-col h-full max-h-[90vh]">
      <h2 mat-dialog-title class="flex items-center gap-3 m-0 py-6 px-8 border-b bg-surface">
        <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-sm">
          <mat-icon aria-hidden="true">settings_applications</mat-icon>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold tracking-tight">Appointment Settings</span>
          <span class="text-xs text-on-surface-variant font-medium">Configure calendar behavior and defaults</span>
        </div>
      </h2>

      <div mat-dialog-content class="p-8 pt-6 overflow-y-auto">
        <form [formGroup]="settingsForm" class="flex flex-col gap-8">
          
          <!-- Calendar Section -->
          <section>
            <div class="flex items-center gap-2 mb-4 text-primary font-bold">
              <mat-icon class="text-sm w-4 h-4">calendar_month</mat-icon>
              <span class="uppercase tracking-widest text-[10px]">Calendar Display</span>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
                <mat-label>Start Hour</mat-label>
                <mat-select formControlName="startHour">
                  @for (hour of hours; track hour) {
                    <mat-option [value]="hour">{{ hour }}:00</mat-option>
                  }
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
                <mat-label>End Hour</mat-label>
                <mat-select formControlName="endHour">
                  @for (hour of hours; track hour) {
                    <mat-option [value]="hour">{{ hour }}:00</mat-option>
                  }
                </mat-select>
              </mat-form-field>
            </div>
          </section>

          <mat-divider></mat-divider>

          <!-- Defaults Section -->
          <section>
            <div class="flex items-center gap-2 mb-4 text-primary font-bold">
              <mat-icon class="text-sm w-4 h-4">timer</mat-icon>
              <span class="uppercase tracking-widest text-[10px]">Appointment Defaults</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
                <mat-label>Default Duration</mat-label>
                <mat-select formControlName="defaultDuration">
                  <mat-option [value]="15">15 Minutes</mat-option>
                  <mat-option [value]="30">30 Minutes</mat-option>
                  <mat-option [value]="45">45 Minutes</mat-option>
                  <mat-option [value]="60">60 Minutes</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
                <mat-label>Buffer Time (min)</mat-label>
                <input matInput type="number" formControlName="bufferTime">
              </mat-form-field>
            </div>
          </section>

          <mat-divider></mat-divider>

          <!-- Working Days Section -->
          <section>
            <div class="flex items-center gap-2 mb-4 text-primary font-bold">
              <mat-icon class="text-sm w-4 h-4">event_available</mat-icon>
              <span class="uppercase tracking-widest text-[10px]">Working Days</span>
            </div>
            
            <div class="flex flex-wrap gap-x-6 gap-y-2 p-4 bg-surface-variant/30 rounded-2xl border border-outline/50">
              <mat-checkbox formControlName="mon">Monday</mat-checkbox>
              <mat-checkbox formControlName="tue">Tuesday</mat-checkbox>
              <mat-checkbox formControlName="wed">Wednesday</mat-checkbox>
              <mat-checkbox formControlName="thu">Thursday</mat-checkbox>
              <mat-checkbox formControlName="fri">Friday</mat-checkbox>
              <mat-checkbox formControlName="sat">Saturday</mat-checkbox>
              <mat-checkbox formControlName="sun">Sunday</mat-checkbox>
            </div>
          </section>

          <mat-divider></mat-divider>

          <!-- Notifications Section -->
          <section>
            <div class="flex items-center gap-2 mb-4 text-primary font-bold">
              <mat-icon class="text-sm w-4 h-4">notifications_active</mat-icon>
              <span class="uppercase tracking-widest text-[10px]">Notifications</span>
            </div>
            
            <div class="flex flex-col gap-4">
              <mat-slide-toggle formControlName="emailReminders" color="primary">
                Send automatic email reminders (24h before)
              </mat-slide-toggle>
              <mat-slide-toggle formControlName="smsReminders" color="primary">
                Send SMS notifications for new bookings
              </mat-slide-toggle>
            </div>
          </section>

        </form>
      </div>

      <div mat-dialog-actions class="justify-end px-8 py-6 bg-surface-variant/30 border-t border-outline gap-3">
        <button mat-button (click)="onCancel()" class="px-6 rounded-xl font-bold">Cancel</button>
        <button 
          mat-flat-button 
          color="primary" 
          [disabled]="settingsForm.invalid" 
          (click)="onSave()"
          class="px-10 rounded-xl font-bold shadow-lg"
        >
          Save Settings
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 550px;
      max-width: 95vw;
    }
  `]
})
export class AppointmentSettingsDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AppointmentSettingsDialogComponent>);

  hours = Array.from({ length: 24 }, (_, i) => i);
  
  settingsForm: FormGroup = this.fb.group({
    startHour: [8],
    endHour: [18],
    defaultDuration: [30],
    bufferTime: [5],
    mon: [true],
    tue: [true],
    wed: [true],
    thu: [true],
    fri: [true],
    sat: [false],
    sun: [false],
    emailReminders: [true],
    smsReminders: [false],
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.settingsForm.valid) {
      this.dialogRef.close(this.settingsForm.value);
    }
  }
}
