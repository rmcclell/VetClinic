import { Component, inject } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { SettingsFormService } from '../settings-form.service';

@Component({
  selector: 'app-settings-preferences',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
],
  template: `
    <div class="p-4 sm:p-8">
      <form
        [formGroup]="settingsService.settingsForm"
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Measurement Units</mat-label>
          <mat-select formControlName="units">
            <mat-option value="metric">Metric (kg, cm)</mat-option>
            <mat-option value="imperial">Imperial (lb, in)</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Default Date Format</mat-label>
          <mat-select formControlName="dateFormat">
            <mat-option value="MM/dd/yyyy">MM/DD/YYYY</mat-option>
            <mat-option value="dd/MM/yyyy">DD/MM/YYYY</mat-option>
            <mat-option value="yyyy-MM-dd">YYYY-MM-DD</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Tax Rate (%)</mat-label>
          <input matInput type="number" formControlName="taxRate" step="0.01" />
          <mat-icon
            matPrefix
            class="mr-2 text-on-surface-variant opacity-60"
            aria-hidden="true"
            >percent</mat-icon
          >
        </mat-form-field>
      </form>
    </div>
  `,
})
export class SettingsPreferencesComponent {
  public settingsService = inject(SettingsFormService);
}
