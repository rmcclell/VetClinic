import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LabItem } from '../patient-tabs.types';

@Component({
  selector: 'app-patient-lab-view-dialog',
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
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm">
            <mat-icon aria-hidden="true">science</mat-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-bold tracking-tight">Lab Report</span>
            <span class="text-xs text-on-surface-variant font-medium italic">{{ data.type }} • {{ data.date | date:'longDate' }}</span>
          </div>
        </div>
        <button mat-icon-button mat-dialog-close aria-label="Close dialog">
          <mat-icon aria-hidden="true">close</mat-icon>
        </button>
      </h2>

      <div mat-dialog-content class="p-8 pt-6 overflow-y-auto bg-[#fafafa]">
        <div class="flex flex-col gap-8">
          
          <!-- Summary Header -->
          <div class="bg-white p-6 rounded-3xl shadow-sm border border-outline/30 flex justify-between items-center">
            <div class="flex flex-col gap-1">
              <span class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Result Status</span>
              <div class="flex items-center gap-2 text-emerald-600 font-bold">
                <mat-icon class="text-sm w-4 h-4">verified</mat-icon>
                Final Report Released
              </div>
            </div>
            <div class="flex flex-col items-end gap-1">
              <span class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Requested By</span>
              <span class="font-bold text-on-surface text-sm">{{ data.addedBy }}</span>
            </div>
          </div>

          <!-- Lab Details -->
          <section class="flex flex-col gap-4">
            <h3 class="text-xs font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
              <mat-icon class="text-sm w-4 h-4">description</mat-icon>
              Report Details
            </h3>
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-outline/30 min-h-[200px] flex flex-col gap-6">
              <div class="flex flex-col gap-2">
                <span class="text-xl font-bold text-on-surface">{{ data.details }}</span>
                <p class="text-sm text-on-surface-variant leading-relaxed">
                  Comprehensive diagnostic analysis performed using automated spectrophotometry and microscopic examination. All values were calibrated against age and species-specific reference intervals.
                </p>
              </div>
              
              <mat-divider></mat-divider>

              <!-- Mock Result Table -->
              <div class="flex flex-col gap-3">
                <div class="grid grid-cols-3 gap-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant pb-2 border-b">
                  <span>Parameter</span>
                  <span class="text-center">Result</span>
                  <span class="text-right">Reference Range</span>
                </div>
                <div class="grid grid-cols-3 gap-4 text-sm font-medium py-1">
                  <span>WBC</span>
                  <span class="text-center font-bold">8.4 x10^3/µL</span>
                  <span class="text-right opacity-60">5.5 - 19.5</span>
                </div>
                <div class="grid grid-cols-3 gap-4 text-sm font-medium py-1">
                  <span>HCT</span>
                  <span class="text-center font-bold text-amber-600">32.1 % (L)</span>
                  <span class="text-right opacity-60">35.0 - 52.0</span>
                </div>
                <div class="grid grid-cols-3 gap-4 text-sm font-medium py-1">
                  <span>PLT</span>
                  <span class="text-center font-bold">342 x10^3/µL</span>
                  <span class="text-right opacity-60">175 - 500</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Attachments -->
          <section class="flex flex-col gap-4">
             <h3 class="text-xs font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
              <mat-icon class="text-sm w-4 h-4">attach_file</mat-icon>
              Original Documents
            </h3>
            <div class="flex gap-4">
              <div class="flex-1 p-4 bg-surface rounded-2xl border border-outline flex items-center gap-3 cursor-pointer hover:bg-surface-variant/50 transition-colors">
                <div class="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                  <mat-icon>picture_as_pdf</mat-icon>
                </div>
                <div class="flex flex-col">
                  <span class="text-xs font-bold">full_report.pdf</span>
                  <span class="text-[10px] opacity-60">2.4 MB • PDF Document</span>
                </div>
              </div>
              <div class="flex-1 p-4 bg-surface rounded-2xl border border-outline flex items-center gap-3 cursor-pointer hover:bg-surface-variant/50 transition-colors">
                <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <mat-icon>image</mat-icon>
                </div>
                <div class="flex flex-col">
                  <span class="text-xs font-bold">results_chart.png</span>
                  <span class="text-[10px] opacity-60">1.1 MB • Image File</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      <div mat-dialog-actions class="justify-end px-8 py-6 bg-surface-variant/30 border-t border-outline gap-3">
        <button mat-stroked-button color="primary" class="px-6 rounded-xl font-bold h-12">
          <mat-icon class="mr-2">file_download</mat-icon> Download Report
        </button>
        <button mat-flat-button color="primary" mat-dialog-close class="px-8 rounded-xl font-bold h-12 shadow-lg">
          Close Review
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
export class PatientLabViewDialogComponent {
  public data = inject(MAT_DIALOG_DATA) as LabItem;
}
