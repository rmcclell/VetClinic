import { Component, OnInit, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { SettingsFormService } from './settings-form.service';

@Component({
  selector: 'app-clinic-settings',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
],
  template: `
    <div class="max-w-4xl mx-auto p-4 sm:p-6 h-full flex flex-col">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-on-surface m-0">
            Clinic Settings
          </h1>
          <p class="text-on-surface-variant opacity-80 mt-1 hidden sm:block">
            Manage clinic branding, contact information, and system preferences.
          </p>
        </div>
        <button
          mat-raised-button
          color="primary"
          [disabled]="
            settingsService.settingsForm.pristine ||
            settingsService.settingsForm.invalid
          "
          (click)="saveSettings()"
          aria-label="Save settings changes"
          class="shrink-0"
        >
          <mat-icon class="mr-2" aria-hidden="true">save</mat-icon> Save Changes
        </button>
      </div>

      <mat-card
        class="p-0 border border-outline bg-surface flex flex-col flex-1 shadow-sm rounded-3xl min-h-125"
      >
        <nav mat-tab-nav-bar [tabPanel]="tabPanel" class="w-full" aria-label="Settings sections">
          @for (link of links; track link.path) {
            <a
              mat-tab-link
              [routerLink]="link.path"
              routerLinkActive
              #rla="routerLinkActive"
              [active]="rla.isActive"
              [attr.aria-current]="rla.isActive ? 'page' : null"
            >
              <span class="font-bold">{{ link.label }}</span>
            </a>
          }
        </nav>
        <mat-tab-nav-panel
          #tabPanel
          class="flex-1 overflow-auto bg-surface-variant/20"
        >
          <router-outlet></router-outlet>
        </mat-tab-nav-panel>
      </mat-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class ClinicSettingsComponent implements OnInit {
  public settingsService = inject(SettingsFormService);

  links = [
    { label: 'Branding', path: 'branding' },
    { label: 'Contact Info', path: 'contact' },
    { label: 'System Preferences', path: 'systemPreferences' },
  ];

  ngOnInit(): void {
    this.settingsService.initForm();
  }

  saveSettings(): void {
    this.settingsService.saveSettings();
  }
}
