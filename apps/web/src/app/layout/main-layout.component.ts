import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../services/theme.service';
import { ConfigService } from '../services/config.service';
import { inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserSettingsDialogComponent } from './user-settings-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay, take } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  template: `
    <mat-sidenav-container
      class="h-screen min-h-dvh"
      (backdropClick)="closeSidenavOnMobile()"
    >
      <!-- Sidebar -->
      <mat-sidenav
        #sidenav
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false"
        class="w-64 max-w-[85vw]"
      >
        <div
          class="flex flex-col h-full bg-white dark:bg-slate-900 overflow-hidden"
        >
          <!-- Top Sticky Header -->
          <div
            class="p-4 flex flex-col items-center justify-center bg-gray-50/50 dark:bg-slate-800/50 border-b shrink-0"
          >
            @if (configService.logoUrl()) {
              <img
                [src]="configService.logoUrl()"
                [alt]="configService.clinicName() + ' Logo'"
                class="h-16 mb-2 object-contain"
              />
            } @else {
              <svg
                width="150"
                height="40"
                viewBox="0 0 150 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mb-2"
                role="img"
                aria-labelledby="clinic-logo-title"
              >
                <title id="clinic-logo-title">
                  {{ configService.clinicName() }} Logo
                </title>
                <rect width="150" height="40" fill="#E2E8F0" />
                <path
                  d="M20 20L25 10H35L40 20L35 30H25L20 20Z"
                  fill="#4F46E5"
                />
                <text
                  x="50"
                  y="25"
                  fill="#1E293B"
                  font-family="sans-serif"
                  font-size="14"
                  font-weight="bold"
                >
                  CLINIC OS
                </text>
              </svg>
            }
          </div>

          <!-- Scrollable Links -->
          <div class="flex-1 overflow-y-auto py-2 custom-scrollbar">
            <mat-nav-list aria-label="Primary application navigation">
              <a
                mat-list-item
                routerLink="/dashboard"
                routerLinkActive="active-link"
                class="mb-1"
                (click)="closeSidenavOnMobile()"
              >
                <mat-icon
                  matListItemIcon
                  fontSet="material-icons-outlined"
                  aria-hidden="true"
                  >dashboard</mat-icon
                >
                <span matListItemTitle>Dashboard</span>
              </a>
              <a
                mat-list-item
                routerLink="/appointments"
                routerLinkActive="active-link"
                class="mb-1"
                (click)="closeSidenavOnMobile()"
              >
                <mat-icon
                  matListItemIcon
                  fontSet="material-icons-outlined"
                  aria-hidden="true"
                  >calendar_today</mat-icon
                >
                <span matListItemTitle>Appointments</span>
              </a>
              <a
                mat-list-item
                routerLink="/patients"
                routerLinkActive="active-link"
                class="mb-1"
                (click)="closeSidenavOnMobile()"
              >
                <mat-icon
                  matListItemIcon
                  fontSet="material-icons-outlined"
                  aria-hidden="true"
                  >pets</mat-icon
                >
                <span matListItemTitle>Patients</span>
              </a>
              <a
                mat-list-item
                routerLink="/clients"
                routerLinkActive="active-link"
                class="mb-1"
                (click)="closeSidenavOnMobile()"
              >
                <mat-icon
                  matListItemIcon
                  fontSet="material-icons-outlined"
                  aria-hidden="true"
                  >people</mat-icon
                >
                <span matListItemTitle>Clients</span>
              </a>
              <a
                mat-list-item
                routerLink="/tasks"
                routerLinkActive="active-link"
                class="mb-1"
                (click)="closeSidenavOnMobile()"
              >
                <mat-icon
                  matListItemIcon
                  fontSet="material-icons-outlined"
                  aria-hidden="true"
                  >assignment</mat-icon
                >
                <span matListItemTitle>Tasks</span>
              </a>
              <a
                mat-list-item
                routerLink="/messages"
                routerLinkActive="active-link"
                class="mb-1"
                (click)="closeSidenavOnMobile()"
              >
                <mat-icon
                  matListItemIcon
                  fontSet="material-icons-outlined"
                  aria-hidden="true"
                  >mail</mat-icon
                >
                <span matListItemTitle>Messages</span>
              </a>
              <a
                mat-list-item
                routerLink="/invoices"
                routerLinkActive="active-link"
                class="mb-1"
                (click)="closeSidenavOnMobile()"
              >
                <mat-icon
                  matListItemIcon
                  fontSet="material-icons-outlined"
                  aria-hidden="true"
                  >receipt</mat-icon
                >
                <span matListItemTitle>Invoices</span>
              </a>
              <mat-divider class="my-2" aria-hidden="true"></mat-divider>
              <a
                mat-list-item
                routerLink="/settings"
                routerLinkActive="active-link"
                class="mb-1"
                (click)="closeSidenavOnMobile()"
              >
                <mat-icon
                  matListItemIcon
                  fontSet="material-icons-outlined"
                  aria-hidden="true"
                  >settings</mat-icon
                >
                <span matListItemTitle>Clinic Settings</span>
              </a>
            </mat-nav-list>
          </div>

          <!-- Sticky Bottom Vendor Area -->
          <div class="p-4 bg-gray-50/50 dark:bg-slate-800/50 border-t shrink-0">
            <div class="flex flex-col items-center">
              <img
                src="vendor.svg"
                alt="Vendor Logo"
                class="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </mat-sidenav>

      <!-- Main Content Area -->
      <mat-sidenav-content class="flex flex-col h-screen min-h-dvh">
        <!-- Toolbar -->
        <mat-toolbar
          class="mat-elevation-z1 px-2 sm:px-4 bg-white dark:bg-slate-900 border-b sticky top-0 z-20"
        >
          <div class="flex justify-between w-full items-center gap-2 min-w-0">
            <div class="flex items-center gap-2 min-w-0">
              <button
                mat-icon-button
                (click)="sidenav.toggle()"
                aria-label="Toggle navigation menu"
              >
                <mat-icon aria-hidden="true">menu</mat-icon>
              </button>
              <span
                class="ml-1 sm:ml-2 font-bold text-gray-800 dark:text-gray-100 truncate"
                >{{
                configService.clinicName()
              }}</span
              >
            </div>

            <div class="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                mat-icon-button
                class="mr-0 sm:mr-1 hidden sm:inline-flex"
                aria-label="View 3 notifications"
              >
                <mat-icon matBadge="3" matBadgeColor="warn" aria-hidden="true"
                  >notifications</mat-icon
                >
              </button>

              <button
                mat-icon-button
                (click)="themeService.toggleTheme()"
                [matTooltip]="
                  themeService.isDarkMode()
                    ? 'Switch to Light Mode'
                    : 'Switch to Dark Mode'
                "
                [attr.aria-label]="
                  themeService.isDarkMode()
                    ? 'Switch to Light Mode'
                    : 'Switch to Dark Mode'
                "
              >
                <mat-icon fontSet="material-icons-outlined">{{
                  themeService.isDarkMode() ? 'light_mode' : 'dark_mode'
                }}</mat-icon>
              </button>

              <button
                mat-icon-button
                (click)="openUserSettings()"
                matTooltip="User Settings"
                aria-label="Open user settings"
              >
                <mat-icon fontSet="material-icons-outlined" aria-hidden="true">settings</mat-icon>
              </button>

              <div
                class="hidden sm:flex items-center gap-2 lg:gap-3 border-l pl-3 lg:pl-4 border-gray-200 dark:border-gray-700 h-8"
              >
                <div class="text-right hidden sm:block leading-tight">
                  <p
                    class="text-sm font-medium m-0 text-gray-900 dark:text-gray-100"
                  >
                    Dr. Sarah Smith
                  </p>
                  <p
                    class="text-xs opacity-80 m-0 text-gray-500 dark:text-gray-400"
                  >
                    Veterinarian
                  </p>
                </div>
                <button
                  mat-mini-fab
                  color="secondary"
                  aria-label="User profile: Sarah Smith"
                >
                  <span class="text-xs font-bold">SS</span>
                </button>
                <button
                  mat-icon-button
                  matTooltip="Log out of application"
                  aria-label="Log out of application"
                  class="hidden md:inline-flex"
                >
                  <mat-icon fontSet="material-icons-outlined" aria-hidden="true">logout</mat-icon>
                </button>
              </div>
            </div>
          </div>
        </mat-toolbar>

        <!-- Page Content -->
        <div
          class="flex-1 flex flex-col overflow-auto p-[var(--spacing-page-py)] md:p-[calc(var(--spacing-page-py)*1.5)] lg:p-[calc(var(--spacing-page-py)*1.75)] h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] min-h-0"
        >
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      mat-sidenav {
        border-right: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 0 !important;
      }
      /* Prevent mat-sidenav-content from creating its own scrollbar */
      mat-sidenav-content {
        overflow: hidden !important;
      }
      .active-link {
        background-color: rgba(
          79,
          70,
          229,
          0.1
        ); /* Primary color with transparency */
        color: #4f46e5; /* Primary color */
        border-radius: 0 !important;
      }
      mat-nav-list a {
        border-radius: 0 !important;
      }
      /* Target Material ripples and item backgrounds */
      ::ng-deep .mat-mdc-list-item-interactive,
      ::ng-deep .mat-mdc-list-item-ripple,
      ::ng-deep .mdc-list-item {
        border-radius: 0 !important;
      }
    `,
  ],
})
export class MainLayoutComponent {
  public themeService = inject(ThemeService);
  public configService = inject(ConfigService);
  private breakpointObserver = inject(BreakpointObserver);
  private dialog = inject(MatDialog);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  closeSidenavOnMobile() {
    this.isHandset$.pipe(take(1)).subscribe((isHandset) => {
      if (isHandset) {
        this.sidenav.close();
      }
    });
  }

  openUserSettings(): void {
    this.dialog.open(UserSettingsDialogComponent, {
      width: '800px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'user-settings-dialog-container',
    });
  }
}
