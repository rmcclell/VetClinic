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
  selector: 'app-client-form-dialog',
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
    <form [formGroup]="formRequestGroup" (ngSubmit)="onSave()" class="flex flex-col">
      <h2 mat-dialog-title class="flex items-center gap-3 m-0 py-4 border-b">
        <mat-icon color="primary">description</mat-icon>
        <span class="font-semibold">Send Digital Form</span>
      </h2>

      <mat-dialog-content>
        <div class="flex flex-col gap-6 pt-2">
          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Select Patient (Optional)</mat-label>
            <mat-select formControlName="patientId">
              <mat-option [value]="null">N/A - General Client Form</mat-option>
              @for (p of data.patients; track p.id) {
                <mat-option [value]="p.id">
                  {{ p.name }} ({{ p.species }})
                </mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Form Template</mat-label>
            <mat-select formControlName="templateId">
              <mat-option value="1">New Client Registration</mat-option>
              <mat-option value="2">Surgery Consent Form</mat-option>
              <mat-option value="3">Anesthesia Consent</mat-option>
              <mat-option value="4">Vaccine Waiver</mat-option>
              <mat-option value="5">Boarding Agreement</mat-option>
            </mat-select>
            @if (formRequestGroup.get('templateId')?.hasError('required')) {
              <mat-error>Please select a form template</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Delivery Method</mat-label>
            <mat-select formControlName="deliveryMethod">
              <mat-option value="Email">Email</mat-option>
              <mat-option value="SMS">SMS / Text Message</mat-option>
              <mat-option value="Both">Both Email and SMS</mat-option>
              <mat-option value="In-Clinic">In-Clinic Tablet</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Additional Message to Client</mat-label>
            <textarea matInput formControlName="message" rows="3" placeholder="e.g. Please fill this out before your appointment..."></textarea>
          </mat-form-field>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="p-6 border-t gap-2">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button
          mat-flat-button
          color="primary"
          type="submit"
          [disabled]="formRequestGroup.invalid"
          class="px-8 py-1 rounded-lg"
        >
          <mat-icon class="mr-2">send</mat-icon>
          Send Form
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
export class ClientFormDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClientFormDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  public formRequestGroup = this.fb.group({
    patientId: [null as number | null],
    templateId: ['', Validators.required],
    deliveryMethod: ['Email', Validators.required],
    message: [''],
  });

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.formRequestGroup.valid) {
      this.dialogRef.close(this.formRequestGroup.value);
    }
  }
}
