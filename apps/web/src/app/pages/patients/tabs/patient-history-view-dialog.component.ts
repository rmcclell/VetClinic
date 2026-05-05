import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MedicalHistoryItem } from '../patient-tabs.types';

@Component({
  selector: 'app-patient-history-view-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
  ],
  template: `
    <div class="flex flex-col h-full max-h-[90vh]">
      <h2 mat-dialog-title class="flex items-center justify-between m-0 py-6 px-8 border-b bg-surface">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-sm">
            <mat-icon aria-hidden="true">visibility</mat-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-bold tracking-tight">Medical Record Detail</span>
            <span class="text-xs text-on-surface-variant font-medium">Recorded on {{ data.date | date:'longDate' }}</span>
          </div>
        </div>
        <button mat-icon-button mat-dialog-close aria-label="Close dialog">
          <mat-icon aria-hidden="true">close</mat-icon>
        </button>
      </h2>

      <div mat-dialog-content class="p-8 pt-6 overflow-y-auto">
        <div class="flex flex-col gap-8">
          
          <!-- Summary Row -->
          <div class="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface-variant/20 rounded-2xl border border-outline/50">
            <div class="flex flex-col gap-1">
              <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Record Type</span>
              <div class="flex items-center gap-2 font-black text-lg text-on-surface">
                <mat-icon class="text-blue-600">{{ getTypeIcon(data.type) }}</mat-icon>
                {{ data.type }}
              </div>
            </div>

            <div class="flex flex-col gap-1 items-end">
              <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Status</span>
              <span
                [ngClass]="{
                  'bg-emerald-100 text-emerald-700': data.status === 'Completed',
                  'bg-gray-100 text-gray-700': data.status === 'Locked',
                  'bg-blue-100 text-blue-700': data.status === 'PRN',
                  'bg-purple-100 text-purple-700': data.status === 'Uploaded'
                }"
                class="px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-current/20"
              >
                {{ data.status }}
              </span>
            </div>
          </div>

          <!-- Content Section -->
          <section class="flex flex-col gap-4">
            <div class="flex items-center gap-2 text-on-surface-variant/70">
              <mat-icon class="text-sm w-4 h-4">notes</mat-icon>
              <span class="uppercase tracking-widest text-[10px] font-bold">Clinical Notes & Details</span>
            </div>
            <div class="text-on-surface leading-relaxed whitespace-pre-wrap p-6 bg-surface border border-outline rounded-2xl shadow-sm italic font-serif text-lg">
              "{{ data.details }}"
            </div>
          </section>

          <!-- Attending Professional -->
          <section class="flex flex-col gap-4">
            <div class="flex items-center gap-2 text-on-surface-variant/70">
              <mat-icon class="text-sm w-4 h-4">person</mat-icon>
              <span class="uppercase tracking-widest text-[10px] font-bold">Attending Professional</span>
            </div>
            <div class="flex items-center gap-4 p-4 border border-outline rounded-2xl bg-surface-variant/10">
              <div class="w-12 h-12 rounded-full bg-surface-variant text-on-surface flex items-center justify-center text-sm font-black border border-outline shadow-inner">
                {{ data.doctor.initials }}
              </div>
              <div class="flex flex-col">
                <span class="font-bold text-on-surface">{{ data.doctor.name }}</span>
                <span class="text-xs text-on-surface-variant">Veterinary Specialist</span>
              </div>
            </div>
          </section>

        </div>
      </div>

      <div mat-dialog-actions class="justify-end px-8 py-6 bg-surface-variant/30 border-t border-outline gap-3">
        <button mat-stroked-button (click)="onEdit()" class="px-6 rounded-xl font-bold h-12">
          <mat-icon class="mr-2">edit</mat-icon> Modify Record
        </button>
        <button mat-flat-button color="primary" mat-dialog-close class="px-8 rounded-xl font-bold h-12 shadow-lg">
          Done
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 650px;
      max-width: 95vw;
    }
  `]
})
export class PatientHistoryViewDialogComponent {
  private dialogRef = inject(MatDialogRef<PatientHistoryViewDialogComponent>);
  public data = inject(MAT_DIALOG_DATA) as MedicalHistoryItem;

  getTypeIcon(type: string): string {
    switch (type) {
      case 'SOAP': return 'description';
      case 'Prescription': return 'medication';
      case 'File': return 'attach_file';
      case 'Weight': return 'monitor_weight';
      case 'Task': return 'check_circle';
      default: return 'info';
    }
  }

  onEdit(): void {
    this.dialogRef.close('EDIT');
  }
}
