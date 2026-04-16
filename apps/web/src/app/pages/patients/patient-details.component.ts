import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientsService } from '../../services/patients.service';
import { ConfigService } from '../../services/config.service';
import { PatientDialogComponent } from './patient-dialog.component';
import { Patient } from '@vet-clinic/shared-types';
import { Observable, switchMap, BehaviorSubject, combineLatest } from 'rxjs';
import { PATIENT_TAB_LINKS } from './patient-tabs.types';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  template: `
    <div class="flex justify-between items-center mb-4">
      <button mat-button routerLink="/patients">
        <mat-icon aria-hidden="true">arrow_back</mat-icon> Back to Directory
      </button>
      <button
        mat-icon-button
        (click)="toggleSidebar()"
        [matTooltip]="isSidebarOpen ? 'Collapse Panel' : 'Expand Panel'"
        [attr.aria-label]="
          isSidebarOpen ? 'Collapse side panel' : 'Expand side panel'
        "
        [attr.aria-expanded]="isSidebarOpen"
        aria-controls="patient-sidebar"
        class="text-(--color-on-surface-variant)"
      >
        <mat-icon aria-hidden="true">{{
          isSidebarOpen ? 'sidebar' : 'dock'
        }}</mat-icon>
      </button>
    </div>

    @if (patient$ | async; as patient) {
      <div class="flex gap-0 relative flex-1">
        <!-- Main Content -->
        <div
          class="flex-1 min-w-0 min-h-0 flex flex-col gap-6 transition-[margin-right] duration-300 ease-in-out"
          [style.marginRight]="isSidebarOpen ? '320px' : '0'"
        >
          <!-- Patient Header Card -->
          <mat-card
            class="p-4 sm:p-6 bg-(--color-surface) border-(--color-outline) border-solid border rounded-3xl shadow-sm overflow-hidden"
          >
            <div
              class="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 items-center md:items-start transition-all"
            >
              <!-- Column 1: Avatar (Auto-sized/Fixed) -->
              <div
                class="shrink-0 w-32 h-32 rounded-full overflow-hidden border-2 border-(--color-outline) bg-(--color-surface-variant) shadow-inner flex items-center justify-center"
              >
                @if (patient.photoUrl) {
                  <img
                    [src]="patient.photoUrl"
                    class="w-full h-full object-cover"
                    [alt]="patient.name"
                  />
                } @else {
                  <mat-icon class="text-6xl opacity-20" aria-hidden="true"
                    >pets</mat-icon
                  >
                }
              </div>

              <!-- Column 2: Details Content (Fills remaining space) -->
              <div class="flex-1 w-full min-w-0 flex flex-col gap-4 md:gap-6">
                <!-- Row 1: Identity and Action Buttons -->
                <div
                  class="flex flex-col xl:flex-row justify-between xl:items-center gap-6"
                >
                  <div class="text-center md:text-left flex-1 min-w-0">
                    <h1
                      class="text-2xl sm:text-3xl lg:text-4xl font-extrabold m-0 text-slate-900 dark:text-(--color-on-surface) leading-none mb-2 tracking-tight truncate"
                    >
                      {{ patient.name }}
                    </h1>
                    <div
                      class="flex flex-wrap items-center justify-center md:justify-start gap-x-3 text-sm text-(--color-on-surface-variant) font-semibold tracking-wide"
                    >
                      <span>{{ patient.species }}</span>
                      <span class="opacity-30" aria-hidden="true">•</span>
                      <span>{{ patient.breed || 'Unknown Breed' }}</span>
                      <span class="opacity-30 select-none" aria-hidden="true"
                        >•</span
                      >
                      <span>{{ patient.sex || 'Unknown Sex' }}</span>
                      <span class="opacity-30 select-none" aria-hidden="true"
                        >•</span
                      >
                      <span>{{ getAge(patient.birthDate) }}</span>
                    </div>
                  </div>

                  <!-- Primary Actions (Pill Buttons) -->
                  <div
                    class="flex flex-row gap-2 shrink-0 justify-center md:justify-start"
                  >
                    <button
                      mat-flat-button
                      (click)="editPatient(patient)"
                      class="h-9 px-4 md:px-6 rounded-lg bg-slate-100 text-indigo-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-sky-300 font-bold shadow-sm transition-all border border-transparent active:scale-95 text-sm"
                    >
                      <mat-icon class="text-base" aria-hidden="true">edit</mat-icon> Edit
                    </button>
                    <button
                      mat-stroked-button
                      aria-label="Print patient record"
                      class="h-9 px-4 md:px-6 rounded-lg border border-(--color-outline) text-(--color-on-surface) hover:bg-slate-50 dark:hover:bg-slate-800 font-bold active:scale-95 text-sm"
                    >
                      <mat-icon class="text-base" aria-hidden="true"
                        >print</mat-icon
                      >
                      Print
                    </button>
                  </div>
                </div>

                <!-- Row 2: Information Grid -->
                <div
                  class="grid grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-4 pt-4 border-t border-(--color-outline) border-solid w-full"
                >
                  <div class="flex flex-col gap-1.5 text-center md:text-left">
                    <span
                      class="text-xs font-black text-slate-400 dark:text-(--color-on-surface-variant) uppercase tracking-widest opacity-80"
                      >Client</span
                    >
                    <a
                      class="text-lg font-extrabold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline truncate"
                      [routerLink]="['/clients', patient.clientId]"
                      [attr.aria-label]="
                        'View client: ' +
                        (patient.client
                          ? patient.client.firstName +
                            ' ' +
                            patient.client.lastName
                          : 'Unknown')
                      "
                    >
                      {{
                        patient.client
                          ? patient.client.firstName +
                            ' ' +
                            patient.client.lastName
                          : 'Unknown'
                      }}
                    </a>
                  </div>
                  <div class="flex flex-col gap-1.5 text-center md:text-left">
                    <span
                      class="text-xs font-black text-slate-400 dark:text-(--color-on-surface-variant) uppercase tracking-widest opacity-80"
                      >Color</span
                    >
                    <div
                      class="text-lg font-extrabold text-slate-900 dark:text-(--color-on-surface)"
                    >
                      {{ patient.color || '-' }}
                    </div>
                  </div>
                  <div class="flex flex-col gap-1.5 text-center md:text-left">
                    <span
                      class="text-xs font-black text-slate-400 dark:text-(--color-on-surface-variant) uppercase tracking-widest opacity-80"
                      >Weight</span
                    >
                    <div
                      class="text-lg font-extrabold text-slate-900 dark:text-(--color-on-surface)"
                    >
                      {{
                        patient.weight
                          ? patient.weight +
                            ' ' +
                            (configService.config()?.units === 'imperial'
                              ? 'lbs'
                              : 'kg')
                          : '-'
                      }}
                    </div>
                  </div>
                  <div class="flex flex-col gap-1.5 text-center md:text-left">
                    <span
                      class="text-xs font-black text-slate-400 dark:text-(--color-on-surface-variant) uppercase tracking-widest opacity-80"
                      >Microchip</span
                    >
                    <div
                      class="text-base font-extrabold text-slate-900 dark:text-(--color-on-surface) font-mono uppercase tracking-tight"
                    >
                      {{ patient.microchipNumber || '-' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </mat-card>

          <!-- Tabs Section -->
          <mat-card class="flex-1 flex flex-col min-h-0">
            <nav mat-tab-nav-bar [tabPanel]="tabPanel" class="w-full" aria-label="Patient details sections">
              @for (link of links; track link.path) {
                <a
                  mat-tab-link
                  [routerLink]="link.path"
                  routerLinkActive
                  #rla="routerLinkActive"
                  [active]="rla.isActive"
                  [attr.aria-current]="rla.isActive ? 'page' : null"
                >
                  {{ link.label }}
                  @if (link.count !== undefined) {
                    <span
                      class="ml-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                      >{{ link.count }}</span
                    >
                  }
                </a>
              }
            </nav>
            <mat-tab-nav-panel #tabPanel class="flex-1">
              <router-outlet></router-outlet>
            </mat-tab-nav-panel>
          </mat-card>
        </div>

        <!-- Right Sidebar: animate using the css right property (not translateX) to avoid horizontal scrollbar -->
        <!-- Toggle tab: separate fixed element so it stays visible even when panel is hidden -->
        <button
          (click)="toggleSidebar()"
          [matTooltip]="isSidebarOpen ? 'Collapse panel' : 'Expand panel'"
          matTooltipPosition="left"
          [attr.aria-label]="
            isSidebarOpen ? 'Collapse side panel' : 'Expand side panel'
          "
          [attr.aria-expanded]="isSidebarOpen"
          aria-controls="patient-sidebar"
          class="fixed z-20 top-1/2 -translate-y-1/2 flex items-center justify-center bg-(--color-surface) border border-r-0 border-(--color-outline) rounded-l-lg shadow-md cursor-pointer hover:bg-(--color-surface-variant) transition-[right] duration-300"
          [style.right]="isSidebarOpen ? '320px' : '0px'"
          style="width:28px; height:56px; transition: right 0.3s cubic-bezier(0.4,0,0.2,1);"
        >
          <mat-icon
            class="text-base text-(--color-on-surface-variant)"
            [style.transform]="
              isSidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)'
            "
            style="transition: transform 0.3s ease;"
          >
            chevron_right
          </mat-icon>
        </button>

        <!-- Sidebar panel: use right property to slide off-screen cleanly -->
        <div
          class="fixed top-16 bottom-0 z-10 flex items-stretch"
          [style.right]="isSidebarOpen ? '0px' : '-320px'"
          style="width:320px; transition: right 0.3s cubic-bezier(0.4,0,0.2,1);"
        >
          <!-- Sidebar panel -->
          <aside
            id="patient-sidebar"
            class="sidebar-panel flex-1 bg-(--color-surface) border-l border-(--color-outline) overflow-y-auto flex flex-col shadow-xl"
          >
            <div class="p-4 flex flex-col gap-6">
              <!-- Quick Actions -->
              <div class="flex gap-2">
                <button
                  mat-flat-button
                  color="primary"
                  class="flex-1 py-6 text-lg"
                >
                  <mat-icon aria-hidden="true">check_circle</mat-icon> Check In
                </button>
                <button
                  mat-icon-button
                  [matMenuTriggerFor]="menu"
                  aria-label="More patient options"
                  class="border"
                >
                  <mat-icon aria-hidden="true">more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item>
                    <mat-icon aria-hidden="true">content_copy</mat-icon> Duplicate
                  </button>
                  <button mat-menu-item>
                    <mat-icon aria-hidden="true">share</mat-icon> Share
                  </button>
                  <button mat-menu-item class="text-red-500">
                    <mat-icon color="warn" aria-hidden="true">delete</mat-icon> Delete
                  </button>
                </mat-menu>
              </div>

              <mat-divider></mat-divider>

              <section>
                <h3
                  class="text-sm font-bold text-(--color-on-surface-variant) uppercase mb-3 flex items-center justify-between"
                >
                  Upcoming Appointments
                  <button
                    mat-icon-button
                    class="w-6 h-6 leading-6"
                    aria-label="Add new appointment"
                  >
                    <mat-icon class="text-base" aria-hidden="true"
                      >add</mat-icon
                    >
                  </button>
                </h3>
                <div
                  class="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-100 dark:border-blue-900 mb-2"
                >
                  <div
                    class="font-bold text-blue-800 dark:text-blue-300 text-sm"
                  >
                    Tomorrow, 10:00 AM
                  </div>
                  <div class="text-xs text-blue-600 dark:text-blue-400">
                    Wellness Exam
                  </div>
                  <div class="text-xs text-blue-500 dark:text-blue-500 mt-1">
                    Dr. Smith
                  </div>
                </div>
              </section>

              <mat-divider></mat-divider>

              <section>
                <h3
                  class="text-sm font-bold text-(--color-on-surface-variant) uppercase mb-3 flex items-center justify-between"
                >
                  Reminders
                  <span
                    class="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full"
                    aria-label="1 reminder due"
                    >1 Due</span
                  >
                </h3>
                <div
                  class="flex items-center gap-3 p-2 bg-red-50 dark:bg-red-950 rounded border border-red-100 dark:border-red-900"
                >
                  <mat-icon class="text-red-500 text-lg"
                    aria-hidden="true"
                    >notifications_active</mat-icon
                  >
                  <div>
                    <div
                      class="text-sm font-bold text-red-700 dark:text-red-400"
                    >
                      Rabies Vaccine
                    </div>
                    <div class="text-xs text-red-500">Due: 2 days ago</div>
                  </div>
                </div>
              </section>

              <mat-divider></mat-divider>

              <section>
                <h3
                  class="text-sm font-bold text-(--color-on-surface-variant) uppercase mb-3"
                >
                  Boarding Status
                </h3>
                <div class="text-sm text-(--color-on-surface-variant) italic">
                  Not currently checked in.
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    } @else {
      <div class="flex justify-center items-center h-64">
        <mat-spinner diameter="40"></mat-spinner>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        box-sizing: border-box;
      }
      aside.sidebar-panel {
        scrollbar-width: none;
      }
      aside.sidebar-panel::-webkit-scrollbar {
        display: none;
      }
    `,
  ],
})
export class PatientDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private patientsService = inject(PatientsService);
  private dialog = inject(MatDialog);
  public configService = inject(ConfigService);

  patient$: Observable<Patient> | undefined;
  refresh$ = new BehaviorSubject<boolean>(true);
  isSidebarOpen = false;

  links = PATIENT_TAB_LINKS;

  ngOnInit() {
    this.patient$ = combineLatest([this.route.paramMap, this.refresh$]).pipe(
      switchMap(([params, _]) => {
        const id = Number(params.get('id'));
        return this.patientsService.getPatient(id);
      }),
    );
  }

  editPatient(patient: Patient): void {
    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: patient,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refresh$.next(true);
      }
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  getAge(birthDate: Date | string | undefined | null): string {
    if (!birthDate) return 'Age Unknown';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age + ' yrs';
  }
}
