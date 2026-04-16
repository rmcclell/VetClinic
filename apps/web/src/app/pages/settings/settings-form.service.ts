import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsFormService {
  private fb = inject(FormBuilder);
  public configService = inject(ConfigService);
  private snackBar = inject(MatSnackBar);

  public settingsForm: FormGroup;
  public logoPreview$ = new BehaviorSubject<string | null>(null);

  constructor() {
    this.settingsForm = this.fb.group({
      name: ['', Validators.required],
      logoUrl: [null],
      email: ['', [Validators.email]],
      phone: [''],
      address: [''],
      units: ['metric'],
      dateFormat: ['MM/dd/yyyy'],
      hoursOfOperation: [''],
      websiteUrl: [''],
      taxRate: [0],
    });
  }

  public initForm(): void {
    const config = this.configService.config();
    if (config) {
      this.populateForm(config);
    } else {
      setTimeout(() => {
        const c = this.configService.config();
        if (c) this.populateForm(c);
      }, 500);
    }
  }

  private populateForm(config: any): void {
    this.settingsForm.patchValue(config);
    this.logoPreview$.next(config.logoUrl || null);
  }

  public updateLogo(logoUrl: string): void {
    this.logoPreview$.next(logoUrl);
    this.settingsForm.patchValue({ logoUrl });
    this.settingsForm.markAsDirty();
  }

  public saveSettings(): void {
    if (this.settingsForm.valid) {
      this.configService.updateConfig(this.settingsForm.value).subscribe({
        next: () => {
          this.snackBar.open('Settings saved successfully', 'Close', {
            duration: 3000,
          });
          this.settingsForm.markAsPristine();
        },
        error: (err) => {
          console.error('Failed to save settings', err);
          this.snackBar.open('Error saving settings', 'Close', {
            duration: 5000,
          });
        },
      });
    }
  }
}
