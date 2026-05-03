import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';

export interface MessageSettings {
  autoReply: boolean;
  autoReplyMessage: string;
  signature: string;
  emailNotifications: boolean;
}

@Component({
  selector: 'app-message-settings-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDividerModule
  ],
  template: `
    <div class="flex flex-col h-full max-h-[90vh]">
      <h1 mat-dialog-title class="flex items-center gap-3 m-0 py-6 px-8 border-b bg-surface">
        <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
          <mat-icon aria-hidden="true">settings</mat-icon>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold tracking-tight">Message Settings</span>
          <span class="text-xs text-on-surface-variant font-medium">Configure your inbox preferences</span>
        </div>
      </h1>

      <div mat-dialog-content class="p-8 pt-6 overflow-x-hidden">
        <form [formGroup]="settingsForm" class="flex flex-col gap-6">
          
          <!-- General Settings -->
          <section class="flex flex-col gap-4">
            <h3 class="text-sm font-bold text-primary uppercase tracking-widest m-0 flex items-center gap-2">
              <mat-icon class="text-base w-4 h-4">notifications</mat-icon> Notifications
            </h3>
            
            <div class="flex items-center justify-between p-4 bg-surface-variant rounded-xl border border-outline">
              <div class="flex flex-col">
                <span class="text-sm font-bold text-on-surface">Email Notifications</span>
                <span class="text-xs text-on-surface-variant">Receive alerts for new client messages</span>
              </div>
              <mat-slide-toggle color="primary" formControlName="emailNotifications"></mat-slide-toggle>
            </div>
          </section>

          <mat-divider></mat-divider>

          <!-- Auto-Reply Settings -->
          <section class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-primary uppercase tracking-widest m-0 flex items-center gap-2">
                <mat-icon class="text-base w-4 h-4">auto_mode</mat-icon> Auto-Reply
              </h3>
              <mat-slide-toggle color="primary" formControlName="autoReply"></mat-slide-toggle>
            </div>
            
            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Auto-Reply Message</mat-label>
              <textarea matInput formControlName="autoReplyMessage" rows="4" placeholder="Thank you for your message. We will respond within 24 hours."></textarea>
            </mat-form-field>
          </section>

          <mat-divider></mat-divider>

          <!-- Signature Settings -->
          <section class="flex flex-col gap-4">
            <h3 class="text-sm font-bold text-primary uppercase tracking-widest m-0 flex items-center gap-2">
              <mat-icon class="text-base w-4 h-4">draw</mat-icon> Email Signature
            </h3>
            
            <mat-form-field appearance="outline" subscriptSizing="dynamic">
              <mat-label>Signature</mat-label>
              <textarea matInput formControlName="signature" rows="4" placeholder="Your signature here..."></textarea>
            </mat-form-field>
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
          class="px-8 rounded-xl font-bold shadow-lg"
        >
          <mat-icon class="mr-2 text-sm">save</mat-icon> Save Preferences
        </button>
      </div>
    </div>
  `,
  styles: [`
    .mat-mdc-dialog-content {
      max-height: none !important;
    }
  `]
})
export class MessageSettingsDialogComponent {
  data = inject<MessageSettings>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<MessageSettingsDialogComponent>);

  settingsForm: FormGroup;

  constructor() {
    this.settingsForm = this.fb.group({
      autoReply: [this.data?.autoReply ?? false],
      autoReplyMessage: [{
        value: this.data?.autoReplyMessage || 'Thank you for your message. Our clinic hours are Monday-Friday 8AM to 6PM. We will respond as soon as possible.',
        disabled: !(this.data?.autoReply ?? false)
      }],
      signature: [this.data?.signature || 'Springfield Vet Clinic\n123 Healing Way\n555-0199'],
      emailNotifications: [this.data?.emailNotifications ?? true]
    });

    // Toggle disabled state of textarea based on slide toggle
    this.settingsForm.get('autoReply')?.valueChanges.subscribe(enabled => {
      const msgControl = this.settingsForm.get('autoReplyMessage');
      if (enabled) {
        msgControl?.enable();
      } else {
        msgControl?.disable();
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.settingsForm.valid) {
      // Get raw value to include disabled fields if necessary, or just value.
      this.dialogRef.close(this.settingsForm.getRawValue());
    }
  }
}
