import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SettingsFormService } from '../settings-form.service';

@Component({
  selector: 'app-settings-branding',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <div class="p-8">
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <div class="flex flex-col items-center">
          <div
            class="w-48 h-32 border-2 border-dashed border-outline rounded flex items-center justify-center bg-surface-variant mb-3 relative group overflow-hidden"
          >
            @if (settingsService.logoPreview$ | async; as logoUrl) {
              <img
                [src]="logoUrl"
                class="h-full w-full object-contain"
                alt="Clinic Logo Preview"
              />
              <button
                type="button"
                class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none"
                (click)="fileInput.click()"
                aria-label="Edit Clinic Logo"
              >
                <mat-icon class="text-white">edit</mat-icon>
              </button>
            } @else {
              <mat-icon
                class="text-on-surface-variant opacity-20 text-4xl w-10 h-10"
                aria-hidden="true"
                >business</mat-icon
              >
              <button
                type="button"
                class="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent border-none w-full h-full"
                (click)="fileInput.click()"
                aria-label="Upload Clinic Logo"
              ></button>
            }
          </div>
          <button mat-stroked-button type="button" (click)="fileInput.click()">
            <mat-icon aria-hidden="true">photo_camera</mat-icon>
            Upload Logo
          </button>
          <input
            #fileInput
            type="file"
            class="hidden"
            accept="image/*"
            (change)="onLogoSelected($event)"
          />
        </div>

        <form
          [formGroup]="settingsService.settingsForm"
          class="flex-1 flex flex-col gap-4 w-full"
        >
          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Clinic Name</mat-label>
            <input
              matInput
              formControlName="name"
              placeholder="e.g. Springfield Veterinary Clinic"
            />
            @if (
              settingsService.settingsForm.get('name')?.hasError('required')
            ) {
              <mat-error>Name is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Website URL</mat-label>
            <input
              matInput
              formControlName="websiteUrl"
              placeholder="https://www.example.com"
            />
          </mat-form-field>
        </form>
      </div>
    </div>
  `,
})
export class SettingsBrandingComponent {
  public settingsService = inject(SettingsFormService);

  onLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.settingsService.updateLogo(result);
      };
      reader.readAsDataURL(file);
    }
  }
}
