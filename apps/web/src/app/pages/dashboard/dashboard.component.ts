import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatDividerModule,
    MatToolbarModule
],
  template: `
    <mat-toolbar>
      <div class="flex justify-between w-full items-center">
        <div class="flex gap-4 items-center">
          <div class="bg-surface-variant p-2 rounded-lg" aria-hidden="true">
            <mat-icon class="text-on-surface">dashboard</mat-icon>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-on-surface m-0">Dashboard</h1>
            <p class="text-on-surface-variant text-sm hidden sm:block">
              Organize your clinic data
            </p>
          </div>
        </div>
        <div class="flex gap-3 items-center">
          <button mat-raised-button color="primary" class="h-10" aria-label="Edit Dashboard">
            <mat-icon aria-hidden="true">edit</mat-icon>
            <span class="hidden sm:inline ml-1">Edit Dashboard</span>
          </button>
        </div>
      </div>
    </mat-toolbar>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-(--spacing-card-gap)"
    >
      <!-- Stats Cards -->
      <mat-card appearance="outlined" role="article" aria-label="Total Patients: 1,234, up 12%">
        <mat-card-header>
          <mat-card-subtitle>Total Patients</mat-card-subtitle>
          <mat-card-title aria-hidden="true">1,234</mat-card-title>
        </mat-card-header>
        <mat-card-content class="flex items-center justify-between mt-2">
          <span class="text-sm font-medium text-green-600 flex items-center" aria-hidden="true">
            <mat-icon class="icon-sm mr-1" aria-hidden="true">trending_up</mat-icon>
            12%
          </span>
          <mat-icon class="text-on-surface-variant" aria-hidden="true">pets</mat-icon>
        </mat-card-content>
      </mat-card>

      <mat-card appearance="outlined" role="article" aria-label="Appointments Today: 42, up 4%">
        <mat-card-header>
          <mat-card-subtitle>Appointments Today</mat-card-subtitle>
          <mat-card-title aria-hidden="true">42</mat-card-title>
        </mat-card-header>
        <mat-card-content class="flex items-center justify-between mt-2">
          <span class="text-sm font-medium text-green-600 flex items-center" aria-hidden="true">
            <mat-icon class="icon-sm mr-1" aria-hidden="true">trending_up</mat-icon>
            4%
          </span>
          <mat-icon class="text-on-surface-variant" aria-hidden="true">calendar_today</mat-icon>
        </mat-card-content>
      </mat-card>

      <mat-card appearance="outlined" role="article" aria-label="Pending Actions: 7, down 2%">
        <mat-card-header>
          <mat-card-subtitle>Pending Actions</mat-card-subtitle>
          <mat-card-title aria-hidden="true">7</mat-card-title>
        </mat-card-header>
        <mat-card-content class="flex items-center justify-between mt-2">
          <span class="text-sm font-medium text-red-600 flex items-center" aria-hidden="true">
            <mat-icon class="icon-sm mr-1" aria-hidden="true">trending_down</mat-icon>
            2%
          </span>
          <mat-icon class="text-on-surface-variant" aria-hidden="true">assignment_late</mat-icon>
        </mat-card-content>
      </mat-card>

      <mat-card appearance="outlined" role="article" aria-label="Total Revenue: $12,345, up 8%">
        <mat-card-header>
          <mat-card-subtitle>Total Revenue</mat-card-subtitle>
          <mat-card-title aria-hidden="true">$12,345</mat-card-title>
        </mat-card-header>
        <mat-card-content class="flex items-center justify-between mt-2">
          <span class="text-sm font-medium text-green-600 flex items-center" aria-hidden="true">
            <mat-icon class="icon-sm mr-1" aria-hidden="true">trending_up</mat-icon>
            8%
          </span>
          <mat-icon class="text-on-surface-variant" aria-hidden="true">attach_money</mat-icon>
        </mat-card-content>
      </mat-card>

      <!-- Recent Activity -->
      <mat-card appearance="outlined" class="col-span-1 lg:col-span-2" aria-label="Today's Appointments">
        <mat-card-header class="flex justify-between items-center w-full">
          <mat-card-title>Today's Appointments</mat-card-title>
          <button mat-button color="primary" aria-label="View all appointments">View All</button>
        </mat-card-header>
        <mat-list role="list">
          <mat-list-item role="listitem" aria-label="Bella – Vaccination at 9:00 AM, Confirmed">
            <mat-icon matListItemIcon aria-hidden="true">pets</mat-icon>
            <span matListItemTitle>Bella</span>
            <span matListItemLine>Vaccination - 9:00 AM</span>
            <div matListItemMeta aria-hidden="true">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">Confirmed</span>
            </div>
          </mat-list-item>
          <mat-divider aria-hidden="true"></mat-divider>
          <mat-list-item role="listitem" aria-label="Max – Checkup at 10:30 AM, Pending">
            <mat-icon matListItemIcon aria-hidden="true">pets</mat-icon>
            <span matListItemTitle>Max</span>
            <span matListItemLine>Checkup - 10:30 AM</span>
            <div matListItemMeta aria-hidden="true">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">Pending</span>
            </div>
          </mat-list-item>
          <mat-divider aria-hidden="true"></mat-divider>
          <mat-list-item role="listitem" aria-label="Luna – Surgery at 11:00 AM, Confirmed">
            <mat-icon matListItemIcon aria-hidden="true">pets</mat-icon>
            <span matListItemTitle>Luna</span>
            <span matListItemLine>Surgery - 11:00 AM</span>
            <div matListItemMeta aria-hidden="true">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">Confirmed</span>
            </div>
          </mat-list-item>
        </mat-list>
      </mat-card>

      <!-- Recent Patients -->
      <mat-card appearance="outlined" class="col-span-1 lg:col-span-2" aria-label="Recent Patients">
        <mat-card-header>
          <mat-card-title>Recent Patients</mat-card-title>
        </mat-card-header>
        <mat-list role="list">
          <mat-list-item role="listitem" aria-label="Charlie, Golden Retriever, 3 years old">
            <img
              matListItemAvatar
              src="https://ui-avatars.com/api/?name=Charlie&background=random"
              alt="Charlie (Golden Retriever)"
            />
            <span matListItemTitle>Charlie</span>
            <span matListItemLine>Golden Retriever • 3 yrs</span>
            <button
              mat-icon-button
              matListItemMeta
              aria-label="View Charlie's patient records"
            >
              <mat-icon aria-hidden="true">chevron_right</mat-icon>
            </button>
          </mat-list-item>
          <mat-divider aria-hidden="true"></mat-divider>
          <mat-list-item role="listitem" aria-label="Misty, Siamese Cat, 2 years old">
            <img
              matListItemAvatar
              src="https://ui-avatars.com/api/?name=Misty&background=random"
              alt="Misty (Siamese Cat)"
            />
            <span matListItemTitle>Misty</span>
            <span matListItemLine>Siamese • 2 yrs</span>
            <button
              mat-icon-button
              matListItemMeta
              aria-label="View Misty's patient records"
            >
              <mat-icon aria-hidden="true">chevron_right</mat-icon>
            </button>
          </mat-list-item>
          <mat-divider aria-hidden="true"></mat-divider>
          <mat-list-item role="listitem" aria-label="Rocky, Bulldog, 5 years old">
            <img
              matListItemAvatar
              src="https://ui-avatars.com/api/?name=Rocky&background=random"
              alt="Rocky (Bulldog)"
            />
            <span matListItemTitle>Rocky</span>
            <span matListItemLine>Bulldog • 5 yrs</span>
            <button
              mat-icon-button
              matListItemMeta
              aria-label="View Rocky's patient records"
            >
              <mat-icon aria-hidden="true">chevron_right</mat-icon>
            </button>
          </mat-list-item>
        </mat-list>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .mat-toolbar {
        padding: 0;
        background: transparent;
        height: auto;
        min-height: auto;
        margin-bottom: var(--spacing-card-gap);
      }
      .icon-sm {
        font-size: 16px;
        height: 16px;
        width: 16px;
      }
      mat-card {
        overflow: visible;
      }
      mat-list-item {
        overflow: visible !important;
      }
    `,
  ],
})
export class DashboardComponent {}
