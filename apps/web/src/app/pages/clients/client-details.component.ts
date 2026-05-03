import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientsService } from '../../services/clients.service';
import { ConfigService } from '../../services/config.service';
import { Client } from '@vet-clinic/shared-types';
import { Observable, switchMap, BehaviorSubject, combineLatest } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClientDialogComponent } from './client-dialog.component';
import { CLIENT_TAB_LINKS } from './client-tabs.types';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-client-details',
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
    MatSlideToggleModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
  ],
  template: `
    @if (client$ | async; as client) {
      <!-- Main Content -->
      <div
        class="flex-1 min-w-0 flex flex-col bg-surface rounded-lg overflow-hidden border border-outline"
      >
        <!-- Header Card -->
        <mat-card
          class="p-4 sm:p-6 bg-surface border border-outline rounded-3xl shadow-sm overflow-hidden mb-6 mt-0"
        >
          <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-2xl font-bold shadow-sm"
              >
                {{ client.firstName.charAt(0) }}{{ client.lastName.charAt(0) }}
              </div>
              <div>
                <div class="flex items-center gap-3">
                  <h1
                    class="text-2xl sm:text-3xl font-extrabold m-0 text-slate-900 tracking-tight leading-none"
                  >
                    {{ client.firstName }} {{ client.lastName }}
                  </h1>
                  <mat-chip
                    class="min-h-6! h-6! text-xs font-bold uppercase border-none"
                    [ngClass]="
                      client.active
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    "
                  >
                    {{ client.active ? 'Active' : 'Inactive' }}
                  </mat-chip>
                </div>
                <div
                  class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm font-medium text-on-surface-variant"
                >
                  <span class="flex items-center gap-1"
                    ><mat-icon class="text-base w-4 h-4 leading-4" aria-hidden="true"
                      >email</mat-icon
                    >
                    {{ client.email || '-' }}</span
                  >
                  <span class="opacity-40" aria-hidden="true">•</span>
                  <span class="flex items-center gap-1"
                    ><mat-icon class="text-base w-4 h-4 leading-4" aria-hidden="true"
                      >smartphone</mat-icon
                    >
                    {{ client.phone || '-' }}</span
                  >
                </div>
              </div>
            </div>

            <div class="flex gap-2">
              <button mat-flat-button color="primary" class="h-9 rounded-lg" aria-label="Add note for this client">
                <mat-icon class="text-base" aria-hidden="true">add_circle</mat-icon>
                <span class="hidden sm:inline ml-1">Add Note</span>
              </button>
              <button
                mat-stroked-button
                [matMenuTriggerFor]="clientActions"
                [attr.aria-label]="'More options for ' + client.firstName + ' ' + client.lastName"
                class="h-9 min-w-0 px-3 rounded-lg border-outline"
              >
                <mat-icon class="text-base" aria-hidden="true">more_horiz</mat-icon>
              </button>
              <mat-menu #clientActions="matMenu">
                <button mat-menu-item (click)="editClient(client)">
                  <mat-icon aria-hidden="true">edit</mat-icon> Edit Profile
                </button>
                <mat-divider></mat-divider>
                <button mat-menu-item class="text-red-600">
                  <mat-icon color="warn" aria-hidden="true">delete</mat-icon> Delete Client
                </button>
              </mat-menu>
            </div>
          </div>
        </mat-card>

        <!-- Tabs Section -->
        <mat-card
          class="flex-1 flex flex-col min-h-0 bg-surface border border-outline rounded-3xl shadow-sm"
        >
          <nav mat-tab-nav-bar [tabPanel]="tabPanel" class="w-full" aria-label="Client details sections">
            @for (link of links; track link.path) {
              <a
                mat-tab-link
                [routerLink]="link.path"
                routerLinkActive
                #rla="routerLinkActive"
                [active]="rla.isActive"
                [attr.aria-current]="rla.isActive ? 'page' : null"
                [routerLinkActiveOptions]="
                  link.exact ? { exact: true } : { exact: false }
                "
              >
                <span class="flex items-center gap-2">
                  <mat-icon class="text-[18px] opacity-70" aria-hidden="true">{{
                    link.icon || 'view_comfy'
                  }}</mat-icon>
                  <span class="font-bold">{{ link.label }}</span>
                  @if (link.count !== undefined) {
                    <span
                      class="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs font-bold leading-none"
                      >{{ link.count }}</span
                    >
                  }
                </span>
              </a>
            }
          </nav>
          <mat-tab-nav-panel
            #tabPanel
            class="flex-1 overflow-auto bg-surface-variant/20"
          >
            <router-outlet></router-outlet>
          </mat-tab-nav-panel>
        </mat-card>
      </div>
    } @else {
      <div class="flex justify-center items-center h-full">
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
    `,
  ],
})
export class ClientDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private clientsService = inject(ClientsService);
  public configService = inject(ConfigService);
  private dialog = inject(MatDialog);

  client$: Observable<Client> | undefined;
  refresh$ = new BehaviorSubject<boolean>(true);

  links = CLIENT_TAB_LINKS;

  ngOnInit() {
    this.client$ = combineLatest([this.route.paramMap, this.refresh$]).pipe(
      switchMap(([params, _]) => {
        const id = Number(params.get('id'));
        return this.clientsService.getClient(id);
      }),
    );
  }

  editClient(client: Client): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: client,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refresh$.next(true);
      }
    });
  }
}
