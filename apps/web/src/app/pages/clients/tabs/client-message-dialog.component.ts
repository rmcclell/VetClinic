import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client-message-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  template: `
    <form [formGroup]="messageForm" (ngSubmit)="onSave()" class="flex flex-col">
      <h2 mat-dialog-title class="flex items-center gap-3 m-0 py-4 border-b">
        <mat-icon color="primary">send</mat-icon>
        <span class="font-semibold">New Message</span>
      </h2>

      <mat-dialog-content>
        <div class="flex flex-col gap-6 pt-2">
          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Related Patient (Optional)</mat-label>
            <mat-select formControlName="patientId">
              <mat-option [value]="null">General Client Inquiry</mat-option>
              @for (p of data.patients; track p.id) {
                <mat-option [value]="p.id">
                  {{ p.name }} ({{ p.species }})
                </mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Subject</mat-label>
            <input matInput formControlName="subject" placeholder="e.g. Appointment follow-up" />
            @if (messageForm.get('subject')?.hasError('required')) {
              <mat-error>Subject is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Message Body</mat-label>
            <textarea matInput formControlName="body" rows="6" placeholder="Type your message here..."></textarea>
            @if (messageForm.get('body')?.hasError('required')) {
              <mat-error>Message body cannot be empty</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Communication Channel</mat-label>
            <mat-select formControlName="channel">
              <mat-option value="Email">Email</mat-option>
              <mat-option value="SMS">SMS / Text</mat-option>
              <mat-option value="Portal">Client Portal</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="p-6 border-t gap-2">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button
          mat-flat-button
          color="primary"
          type="submit"
          [disabled]="messageForm.invalid"
          class="px-8 py-1 rounded-lg"
        >
          <mat-icon class="mr-2">send</mat-icon>
          Send Message
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
export class ClientMessageDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClientMessageDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  public messageForm = this.fb.group({
    patientId: [null as number | null],
    subject: ['', Validators.required],
    body: ['', Validators.required],
    channel: ['Email', Validators.required],
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.messageForm.valid) {
      this.dialogRef.close(this.messageForm.value);
    }
  }
}
