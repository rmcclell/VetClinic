import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PatientFormItem } from '../patient-tabs.types';

@Component({
  selector: 'app-patient-form-view-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  template: `
    <div class="flex flex-col h-full max-h-[90vh]">
      <h2 mat-dialog-title class="flex items-center justify-between m-0 py-6 px-8 border-b bg-surface">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-sm">
            <mat-icon aria-hidden="true">article</mat-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-bold tracking-tight">{{ data.name }}</span>
            <span class="text-xs text-on-surface-variant font-medium italic">Shared on {{ data.dateShared | date:'longDate' }}</span>
          </div>
        </div>
        <button mat-icon-button mat-dialog-close aria-label="Close dialog">
          <mat-icon aria-hidden="true">close</mat-icon>
        </button>
      </h2>

      <div mat-dialog-content class="p-8 pt-6 overflow-y-auto">
        <div class="flex flex-col gap-8">
          
          <!-- Metadata Bar -->
          <div class="flex flex-wrap items-center gap-6 p-4 bg-surface-variant/20 rounded-2xl border border-outline/50">
            <div class="flex flex-col gap-1">
              <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Status</span>
              <div class="flex items-center gap-2 font-black text-sm" 
                   [ngClass]="{'text-indigo-600': data.status === 'Shared', 'text-amber-600': data.status === 'Draft'}">
                <mat-icon class="text-sm w-4 h-4">{{ data.status === 'Shared' ? 'check_circle' : 'edit_note' }}</mat-icon>
                {{ data.status }}
              </div>
            </div>

            <mat-divider vertical class="h-8"></mat-divider>

            <div class="flex flex-col gap-1">
              <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Completion</span>
              <div class="flex items-center gap-2 font-black text-sm text-on-surface">
                <mat-icon class="text-sm w-4 h-4 text-emerald-600">query_builder</mat-icon>
                Not Started
              </div>
            </div>
          </div>

          <!-- Form Content Placeholder -->
          <section class="flex flex-col gap-6">
            <div class="flex items-center justify-between border-b border-outline/30 pb-2">
              <span class="uppercase tracking-widest text-[10px] font-black text-on-surface-variant">Form Fields & Responses</span>
              <span class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">V1.0.4</span>
            </div>

            <div class="flex flex-col gap-6">
              <!-- Mock Field 1 -->
              <div class="flex flex-col gap-2 p-5 rounded-2xl bg-surface border border-outline shadow-sm">
                <label class="text-xs font-bold text-on-surface opacity-70">1. Reason for visit</label>
                <div class="text-sm text-on-surface-variant italic p-3 bg-surface-variant/10 rounded-xl border border-dashed border-outline">
                  No response provided yet...
                </div>
              </div>

              <!-- Mock Field 2 -->
              <div class="flex flex-col gap-2 p-5 rounded-2xl bg-surface border border-outline shadow-sm">
                <label class="text-xs font-bold text-on-surface opacity-70">2. Current medications or allergies</label>
                <div class="text-sm text-on-surface-variant italic p-3 bg-surface-variant/10 rounded-xl border border-dashed border-outline">
                  No response provided yet...
                </div>
              </div>

              <!-- Mock Field 3 -->
              <div class="flex flex-col gap-2 p-5 rounded-2xl bg-surface border border-outline shadow-sm">
                <label class="text-xs font-bold text-on-surface opacity-70">3. Acknowledgment of services</label>
                <div class="flex items-center gap-2 text-sm text-on-surface-variant">
                  <mat-icon class="text-amber-500">pending</mat-icon>
                  Pending signature
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      <div mat-dialog-actions class="justify-end px-8 py-6 bg-surface-variant/30 border-t border-outline gap-3">
        <button mat-stroked-button color="warn" class="px-6 rounded-xl font-bold h-12">
          <mat-icon class="mr-2">cancel_presentation</mat-icon> Revoke Access
        </button>
        <button mat-flat-button color="primary" mat-dialog-close class="px-8 rounded-xl font-bold h-12 shadow-lg">
          Finish Review
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 700px;
      max-width: 95vw;
    }
  `]
})
export class PatientFormViewDialogComponent {
  public data = inject(MAT_DIALOG_DATA) as PatientFormItem;
}
