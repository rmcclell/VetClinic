import { Component, OnInit, inject, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { AppointmentsService } from '../../services/appointments.service';
import { AppointmentDialogComponent } from './appointment-dialog.component';
import { AppointmentSettingsDialogComponent } from './appointment-settings-dialog.component';
import { Appointment } from '@vet-clinic/shared-types';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subscription,
} from 'rxjs';

type ViewMode = 'day' | 'week' | 'month';

interface CalendarDay {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  appointments: Appointment[];
}

@Component({
  selector: 'app-appointments-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
  ],
  template: `
  <mat-toolbar class="bg-surface-variant border-b border-outline h-18! px-6">
      <div class="flex gap-3 w-full md:w-auto grow items-center">
        <div class="bg-surface-variant border border-outline p-2 rounded-lg" aria-hidden="true">
          <mat-icon class="text-on-surface" aria-hidden="true">calendar_today</mat-icon>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-on-surface m-0">Appointments</h1>
          <p class="text-on-surface-variant text-sm opacity-80">Manage client appointments</p>
        </div>
      </div>
      <div class="flex gap-3 w-full md:w-auto items-center">
        <button mat-icon-button class="md:hidden" (click)="sidebarVisible = !sidebarVisible"
          [attr.aria-expanded]="sidebarVisible"
          aria-controls="appointment-sidebar"
          aria-label="Toggle calendar filters and mini calendar">
          <mat-icon aria-hidden="true">tune</mat-icon>
        </button>
        <button mat-raised-button color="primary" class="h-10" (click)="bookAppointment()">
          <mat-icon class="mr-2" aria-hidden="true">add</mat-icon>
          <span class="hidden sm:inline">Book Appointment</span>
          <span class="sm:hidden">Book</span>
        </button>
        <button mat-icon-button class="ml-2" (click)="openSettings()" aria-label="Appointment Settings">
          <mat-icon aria-hidden="true">settings</mat-icon>
        </button>
      </div>
    </mat-toolbar>
    <div class="flex h-full min-h-0 gap-6 mt-6">
      @if (sidebarVisible) {
        <div class="fixed inset-0 bg-black/40 z-30 md:hidden" (click)="sidebarVisible = false" aria-hidden="true"></div>
      }
      <!-- Left Sidebar (Mini Calendar & Filters) -->
      <aside class="w-72 shrink-0 flex-col gap-6 min-h-0 hidden md:flex
                    fixed md:static top-0 left-0 h-full z-40 md:z-auto
                    bg-surface md:bg-transparent p-4 md:p-0
                    overflow-y-auto md:overflow-visible shadow-xl md:shadow-none"
             id="appointment-sidebar"
             [style.display]="sidebarVisible ? 'flex' : null"
             aria-label="Calendar sidebar">


        <mat-card class="p-2 border-none shadow-sm">
          <mat-calendar aria-label="Mini calendar for date navigation" [selected]="selectedDate$ | async" (selectedChange)="onDateSelect($event)"></mat-calendar>
        </mat-card>

        <mat-card class="flex-1 p-4 shadow-sm min-h-0">
          <h3 class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-4">Quick Stats</h3>
          <div class="flex flex-col gap-3">
             <div class="flex justify-between items-center text-sm">
               <span class="text-on-surface-variant">Total Today</span>
               <span class="font-bold text-primary">{{todayAppointmentsCount$ | async}}</span>
             </div>
             <mat-divider></mat-divider>
             <div class="flex justify-between items-center text-sm">
               <span class="text-on-surface-variant">Pending</span>
               <span class="font-bold text-orange-500">{{pendingCount$ | async}}</span>
             </div>
          </div>
        </mat-card>
      </aside>

      <!-- Main Calendar Area -->
      <section class="flex-1 flex flex-col bg-surface rounded-xl border border-outline overflow-hidden" aria-label="Appointments calendar">
        
        <!-- Calendar Header -->
        <header class="p-4 border-b border-outline flex flex-wrap items-center gap-2 justify-between bg-surface-variant">
          <div class="flex items-center gap-2 flex-wrap">
            <h2 class="text-xl font-bold text-on-surface m-0">
              {{viewTitle$ | async}}
            </h2>
            <div class="flex bg-surface rounded-lg border border-outline p-1">
              <button mat-icon-button (click)="navigate(-1)" matTooltip="Previous" aria-label="Previous period">
                <mat-icon class="text-on-surface" aria-hidden="true">chevron_left</mat-icon>
              </button>
              <button mat-button class="mx-1 font-medium text-on-surface" (click)="today()">Today</button>
              <button mat-icon-button (click)="navigate(1)" matTooltip="Next" aria-label="Next period">
                <mat-icon class="text-on-surface" aria-hidden="true">chevron_right</mat-icon>
              </button>
            </div>
          </div>

          <mat-button-toggle-group [value]="viewMode$ | async" (change)="onViewModeChange($event.value)" class="bg-surface" aria-label="Calendar view">
            <mat-button-toggle value="day">Day</mat-button-toggle>
            <mat-button-toggle value="week">Week</mat-button-toggle>
            <mat-button-toggle value="month">Month</mat-button-toggle>
          </mat-button-toggle-group>
        </header>

        <!-- Dynamic View Content -->
        <div class="flex-1 overflow-auto relative custom-scrollbar">
          
          <!-- Month View -->
          @if ((viewMode$ | async) === 'month') {
            <div class="grid grid-cols-7 h-full min-h-150">
              @for (dayName of weekDays; track dayName) {
                <div role="columnheader" [attr.aria-label]="dayName" class="p-2 text-center text-xs font-bold text-on-surface-variant bg-surface-variant uppercase border-b border-r last:border-r-0">
                  {{dayName}}
                </div>
              }
              @for (day of monthDays$ | async; track day.date.getTime()) {
                <div class="min-h-25 border-b border-r last:border-r-0 p-1 flex flex-col transition-colors hover:bg-gray-50/50"
                     [class.bg-blue-50/20]="day.isToday"
                     [class.opacity-40]="!day.isCurrentMonth">
                  <div class="flex justify-between items-center p-1">
                    <span class="text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full"
                          [class.bg-primary]="day.isToday"
                          [class.text-on-primary]="day.isToday">
                      {{day.date.getDate()}}
                    </span>
                  </div>
                  <div class="flex-1 flex flex-col gap-1 overflow-hidden">
                    @for (apt of day.appointments; track apt.id) {
                      <button class="text-xs p-1 rounded truncate shadow-sm cursor-pointer w-full text-left border-none"
                           [style.background-color]="getStatusColor(apt.status)"
                           (click)="editAppointment(apt)"
                           [attr.aria-label]="getTimeLabel(apt.startTime) + ' - ' + apt.patient?.name">
                        <span class="font-bold">{{getTimeLabel(apt.startTime)}}</span> {{apt.patient?.name}}
                      </button>
                    }
                  </div>
                </div>
              }
            </div>
          }

          <!-- Week/Day View -->
          @if ((viewMode$ | async) !== 'month') {
             <div class="flex h-full">
                <!-- Time Labels Column -->
                <div class="w-16 shrink-0 border-r bg-surface-variant">
                  <div class="h-10 border-b"></div>
                  @for (hour of hours; track hour) {
                    <div class="h-20 text-xs text-on-surface-variant text-center pt-2 border-b">{{hour}}:00</div>
                  }
                </div>
                
                <!-- Days Columns -->
               <div class="flex-1 flex divide-x overflow-x-auto" role="grid">
                   @for (day of weekDays$ | async; track day.date.getTime()) {
                     <div class="flex-1 min-w-37.5 flex flex-col relative">
                        <div class="h-10 border-b p-2 text-center text-xs font-bold uppercase sticky top-0 bg-surface z-10"
                             [class.text-primary]="day.isToday"
                             [class.bg-blue-50/30]="day.isToday">
                          {{day.date | date:'EEE d'}}
                        </div>
                        <div class="flex-1 relative bg-grid-pattern">
                          @for (hour of hours; track hour) {
                            <div class="h-20 border-b pointer-events-none"></div>
                          }
                          <!-- Appointment Slots -->
                          @for (apt of day.appointments; track apt.id) {
                            <button class="absolute left-1 right-1 rounded border shadow-sm p-1 overflow-hidden cursor-pointer z-20 hover:ring-2 ring-primary transition-all text-left bg-transparent"
                                 [style.background-color]="getStatusColor(apt.status, 0.1)"
                                 [style.border-left]="'4px solid ' + getStatusColor(apt.status)"
                                 [style.top]="getTopOffset(apt.startTime)"
                                 [style.height]="getDurationHeight(apt.startTime, apt.endTime)"
                                 (click)="editAppointment(apt)"
                                 [attr.aria-label]="apt.patient?.name + ': ' + (apt.client?.firstName || '') + ' ' + (apt.client?.lastName || '') + ' - ' + getTimeLabel(apt.startTime)">
                              <div class="text-xs font-bold text-on-surface">{{apt.patient?.name}}</div>
                              <div class="text-[10px] text-on-surface-variant truncate">{{apt.client?.firstName}} {{apt.client?.lastName}}</div>
                            </button>
                          }
                        </div>
                     </div>
                   }
                </div>
             </div>
          }

        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .mat-toolbar {
        padding: 0;
      }
      .bg-grid-pattern {
        background-size: 100% 80px;
        background-image: linear-gradient(
          to bottom,
          transparent 79px,
          #f1f5f9 79px
        );
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #e2e8f0;
        border-radius: 3px;
      }
    `,
  ],
})
export class AppointmentsPageComponent implements OnInit, OnDestroy {
  private appointmentsService = inject(AppointmentsService);
  private dialog = inject(MatDialog);
  private sub = new Subscription();

  sidebarVisible = false;

  selectedDate$ = new BehaviorSubject<Date>(new Date());
  viewMode$ = new BehaviorSubject<ViewMode>('week');
  appointments$ = new BehaviorSubject<Appointment[]>([]);

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  hours = Array.from({ length: 24 }, (_, i) => i);

  viewTitle$: Observable<string> = combineLatest([
    this.selectedDate$,
    this.viewMode$,
  ]).pipe(
    map(([date, mode]) => {
      if (mode === 'month')
        return date.toLocaleDateString('default', {
          month: 'long',
          year: 'numeric',
        });
      if (mode === 'week') {
        const start = this.getStartOfWeek(date);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return `${start.toLocaleDateString('default', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
      return date.toLocaleDateString('default', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
    }),
  );

  monthDays$: Observable<CalendarDay[]> = combineLatest([
    this.selectedDate$,
    this.appointments$,
  ]).pipe(
    map(([date, appointments]) => this.generateMonthDays(date, appointments)),
  );

  weekDays$: Observable<CalendarDay[]> = combineLatest([
    this.selectedDate$,
    this.viewMode$,
    this.appointments$,
  ]).pipe(
    map(([date, mode, appointments]) => {
      if (mode === 'day')
        return [this.createCalendarDay(date, appointments, true)];
      return this.generateWeekDays(date, appointments);
    }),
  );

  todayAppointmentsCount$ = this.appointments$.pipe(
    map(
      (apts) =>
        apts.filter((a) => this.isSameDay(new Date(a.startTime), new Date()))
          .length,
    ),
  );

  pendingCount$ = this.appointments$.pipe(
    map((apts) => apts.filter((a) => a.status === 'Scheduled').length),
  );

  ngOnInit(): void {
    this.refresh();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  refresh(): void {
    this.sub.add(
      this.appointmentsService.getAppointments().subscribe((apts) => {
        this.appointments$.next(apts);
      }),
    );
  }

  onDateSelect(date: Date | null): void {
    if (date) this.selectedDate$.next(date);
  }

  onViewModeChange(mode: ViewMode): void {
    this.viewMode$.next(mode);
  }

  navigate(delta: number): void {
    const current = this.selectedDate$.value;
    const mode = this.viewMode$.value;
    const next = new Date(current);

    if (mode === 'month') next.setMonth(current.getMonth() + delta);
    else if (mode === 'week') next.setDate(current.getDate() + delta * 7);
    else next.setDate(current.getDate() + delta);

    this.selectedDate$.next(next);
  }

  today(): void {
    this.selectedDate$.next(new Date());
  }

  bookAppointment(): void {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: { date: this.selectedDate$.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.refresh();
    });
  }

  editAppointment(apt: Appointment): void {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      data: apt,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.refresh();
    });
  }

  openSettings(): void {
    this.dialog.open(AppointmentSettingsDialogComponent, {
      width: '550px',
      maxWidth: '95vw',
    });
  }

  getStatusColor(status: string, alpha = 1): string {
    switch (status) {
      case 'Completed':
        return `rgba(34, 197, 94, ${alpha})`; // hex: #22c55e (green-500)
      case 'Cancelled':
        return `rgba(239, 68, 68, ${alpha})`; // hex: #ef4444 (red-500)
      default:
        return `rgba(59, 130, 246, ${alpha})`; // hex: #3b82f6 (blue-500)
    }
  }

  getTimeLabel(date: string | Date): string {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  getTopOffset(start: string | Date): string {
    const d = new Date(start);
    const minutes = d.getHours() * 60 + d.getMinutes();
    return `${(minutes / 60) * 80}px`; // 80px per hour
  }

  getDurationHeight(start: string | Date, end: string | Date): string {
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    const diffMinutes = (e - s) / (1000 * 60);
    return `${(diffMinutes / 60) * 80}px`;
  }

  private generateMonthDays(
    currentDate: Date,
    allAppointments: Appointment[],
  ): CalendarDay[] {
    const days: CalendarDay[] = [];
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );

    // Previous Month padding
    const startPadding = firstDay.getDay();
    for (let i = startPadding; i > 0; i--) {
      const d = new Date(firstDay);
      d.setDate(firstDay.getDate() - i);
      days.push(this.createCalendarDay(d, allAppointments, false));
    }

    // Current Month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push(this.createCalendarDay(d, allAppointments, true));
    }

    // Next Month padding
    const endPadding = 42 - days.length; // 6 weeks total
    for (let i = 1; i <= endPadding; i++) {
      const d = new Date(lastDay);
      d.setDate(lastDay.getDate() + i);
      days.push(this.createCalendarDay(d, allAppointments, false));
    }

    return days;
  }

  private generateWeekDays(
    currentDate: Date,
    allAppointments: Appointment[],
  ): CalendarDay[] {
    const days: CalendarDay[] = [];
    const start = this.getStartOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(this.createCalendarDay(d, allAppointments, true));
    }
    return days;
  }

  private createCalendarDay(
    date: Date,
    allAppointments: Appointment[],
    isCurrentMonth: boolean,
  ): CalendarDay {
    return {
      date,
      isToday: this.isSameDay(date, new Date()),
      isCurrentMonth,
      appointments: allAppointments.filter((a) =>
        this.isSameDay(new Date(a.startTime), date),
      ),
    };
  }

  private getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    const start = new Date(d.setDate(diff));
    start.setHours(0, 0, 0, 0);
    return start;
  }

  private isSameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
}
