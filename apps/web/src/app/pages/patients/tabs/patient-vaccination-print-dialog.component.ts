import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-patient-vaccination-print-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  template: `
    <h2 mat-dialog-title>Print Vaccination Certificate</h2>
    <mat-dialog-content>
      <form [formGroup]="printForm" class="flex flex-col gap-4 mt-2">
        <div class="flex flex-col gap-2 p-2">
          <mat-checkbox formControlName="includeRabiesTag" color="primary">Include Rabies Tag Info</mat-checkbox>
          <mat-checkbox formControlName="includeClinicLogo" color="primary">Include Clinic Logo</mat-checkbox>
          <mat-checkbox formControlName="requireDoctorSignature" color="primary">Require Doctor Signature Line</mat-checkbox>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" (click)="onSubmit()">
        Print Certificate
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      padding-top: 1rem !important;
    }
  `]
})
export class PatientVaccinationPrintDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PatientVaccinationPrintDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);

  printForm: FormGroup = this.fb.group({
    includeRabiesTag: [true],
    includeClinicLogo: [true],
    requireDoctorSignature: [true],
  });

  onSubmit() {
    this.dialogRef.close(this.printForm.value);
  }
}
