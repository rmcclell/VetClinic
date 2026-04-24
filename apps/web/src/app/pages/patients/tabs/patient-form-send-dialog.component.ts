import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-patient-form-send-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  template: `
    <h2 mat-dialog-title>Send Form to Client</h2>
    <mat-dialog-content>
      <form [formGroup]="sendForm" class="flex flex-col gap-4 mt-2">
        <mat-form-field appearance="outline">
          <mat-label>Form Template</mat-label>
          <mat-select formControlName="title" required>
            <mat-option value="New Patient Packet">New Patient Packet</mat-option>
            <mat-option value="Surgical Consent">Surgical Consent</mat-option>
            <mat-option value="Boarding Agreement">Boarding Agreement</mat-option>
            <mat-option value="Drop-off Questionnaire">Drop-off Questionnaire</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Client</mat-label>
          <input matInput formControlName="client" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Send Method</mat-label>
          <mat-select formControlName="method" required>
            <mat-option value="Email">Email</mat-option>
            <mat-option value="SMS">SMS</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [disabled]="sendForm.invalid" (click)="onSubmit()">
        Send
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      padding-top: 1rem !important;
    }
  `]
})
export class PatientFormSendDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PatientFormSendDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  sendForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    client: [this.data?.clientName || '', Validators.required],
    method: ['Email', Validators.required],
  });

  onSubmit() {
    if (this.sendForm.valid) {
      // Create properties to match the FormItem structure
      const result = {
        title: this.sendForm.value.title,
        client: this.sendForm.value.client,
        date: new Date(),
        status: 'Sent'
      };
      this.dialogRef.close(result);
    }
  }
}
