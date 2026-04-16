import { Component, inject } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SettingsFormService } from '../settings-form.service';

@Component({
  selector: 'app-settings-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
],
  template: `
    <div class="p-8">
      <form
        [formGroup]="settingsService.settingsForm"
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Email Address</mat-label>
          <input
            matInput
            type="email"
            formControlName="email"
            placeholder="contact@clinic.com"
          />
          <mat-icon
            matPrefix
            class="mr-2 text-on-surface-variant opacity-60"
            aria-hidden="true"
            >email</mat-icon
          >
        </mat-form-field>

        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Phone Number</mat-label>
          <input
            matInput
            formControlName="phone"
            placeholder="(555) 000-0000"
          />
          <mat-icon
            matPrefix
            class="mr-2 text-on-surface-variant opacity-60"
            aria-hidden="true"
            >phone</mat-icon
          >
        </mat-form-field>

        <mat-form-field
          appearance="outline"
          subscriptSizing="dynamic"
          class="md:col-span-2"
        >
          <mat-label>Mailing Address</mat-label>
          <textarea
            matInput
            formControlName="address"
            rows="3"
            placeholder="123 Vet Lane, Springfield..."
          ></textarea>
          <mat-icon
            matPrefix
            class="mr-2 text-on-surface-variant opacity-60"
            aria-hidden="true"
            >place</mat-icon
          >
        </mat-form-field>

        <mat-form-field
          appearance="outline"
          subscriptSizing="dynamic"
          class="md:col-span-2"
        >
          <mat-label>Hours of Operation</mat-label>
          <input
            matInput
            formControlName="hoursOfOperation"
            placeholder="Mon-Fri: 9AM-6PM, Sat: 10AM-2PM"
          />
          <mat-icon
            matPrefix
            class="mr-2 text-on-surface-variant opacity-60"
            aria-hidden="true"
            >schedule</mat-icon
          >
        </mat-form-field>
      </form>
    </div>
  `,
})
export class SettingsContactComponent {
  public settingsService = inject(SettingsFormService);
}
