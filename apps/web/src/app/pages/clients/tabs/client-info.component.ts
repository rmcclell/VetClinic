import { Component, OnInit, inject, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '@vet-clinic/shared-types';
import { Observable, switchMap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { DATE_FORMAT } from '../../../core/date-format.token';

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule],
  providers: [DatePipe],
  template: `
    <div class="p-6 h-full flex flex-col">
      @if (client$ | async; as client) {
        <div
          class="bg-surface rounded-xl border border-outline overflow-hidden shadow-sm"
        >
          <div class="flex flex-col">
            <div
              class="px-6 py-4 grid grid-cols-[1fr_2fr] border-b border-outline hover:bg-surface-variant transition-colors"
            >
              <div
                class="text-on-surface-variant font-medium text-sm flex items-center"
              >
                Client ID
              </div>
              <div class="text-right font-medium text-sm text-on-surface">
                {{ client.id ? 'C-' + client.id : '-' }}
              </div>
            </div>

            <div
              class="px-6 py-4 grid grid-cols-[1fr_2fr] border-b border-outline hover:bg-surface-variant transition-colors"
            >
              <div
                class="text-on-surface-variant font-medium text-sm flex items-center"
              >
                Email
              </div>
              <div
                class="text-right text-blue-600 font-medium text-sm hover:underline"
              >
                <a [href]="'mailto:' + client.email">{{
                  client.email || '-'
                }}</a>
              </div>
            </div>

            <div
              class="px-6 py-4 grid grid-cols-[1fr_2fr] border-b border-outline hover:bg-surface-variant transition-colors"
            >
              <div
                class="text-on-surface-variant font-medium text-sm flex items-center"
              >
                Phone
              </div>
              <div
                class="text-right text-blue-600 font-medium text-sm flex items-center justify-end gap-2"
              >
                <mat-icon
                  class="text-on-surface-variant text-base w-4 h-4 leading-4"
                  >smartphone</mat-icon
                >
                {{ client.phone || '-' }}
              </div>
            </div>

            <div
              class="px-6 py-4 grid grid-cols-[1fr_2fr] border-b border-outline hover:bg-surface-variant transition-colors"
            >
              <div
                class="text-on-surface-variant font-medium text-sm flex items-start"
              >
                Address
              </div>
              <div class="text-right text-sm text-on-surface">
                <div>
                  {{ client.address ? client.address.split(',')[0] : '-' }}
                </div>
                <div class="text-on-surface-variant">
                  {{
                    client.address
                      ? client.address.split(',').slice(1).join(',')
                      : ''
                  }}
                </div>
              </div>
            </div>

            <div
              class="px-6 py-4 grid grid-cols-[1fr_2fr] border-b border-outline hover:bg-surface-variant transition-colors"
            >
              <div
                class="text-on-surface-variant font-medium text-sm flex items-center"
              >
                Date of Birth
              </div>
              <div class="text-right text-sm text-on-surface">
                {{ (client.dob | date: dateFormat) || '-' }}
              </div>
            </div>

            <div
              class="px-6 py-4 grid grid-cols-[1fr_2fr] border-b border-outline hover:bg-surface-variant transition-colors"
            >
              <div
                class="text-on-surface-variant font-medium text-sm flex items-center"
              >
                Gender
              </div>
              <div class="text-right text-sm text-on-surface">
                {{ client.gender || '-' }}
              </div>
            </div>

            <div
              class="px-6 py-4 grid grid-cols-[1fr_2fr] border-b border-outline hover:bg-surface-variant transition-colors"
            >
              <div
                class="text-on-surface-variant font-medium text-sm flex items-center"
              >
                Driver's License State
              </div>
              <div class="text-right text-sm text-on-surface">
                {{ client.driverLicenseState || '-' }}
              </div>
            </div>

            <div
              class="px-6 py-4 grid grid-cols-[1fr_2fr] border-b border-outline hover:bg-surface-variant transition-colors"
            >
              <div
                class="text-on-surface-variant font-medium text-sm flex items-center"
              >
                Driver's License Number
              </div>
              <div
                class="text-right text-sm font-mono text-on-surface font-bold"
              >
                {{ client.driverLicenseNumber || '-' }}
              </div>
            </div>

            <div
              class="px-6 py-4 grid grid-cols-[1fr_2fr] border-b border-outline hover:bg-surface-variant transition-colors"
            >
              <div
                class="text-on-surface-variant font-medium text-sm flex items-center"
              >
                Driver's License Expiration
              </div>
              <div class="text-right text-sm text-on-surface">
                {{ (client.driverLicenseExp | date: dateFormat) || '-' }}
              </div>
            </div>

            <div
              class="px-6 py-4 grid grid-cols-[1fr_2fr] border-b border-outline hover:bg-surface-variant transition-colors"
            >
              <div
                class="text-on-surface-variant font-medium text-sm flex items-center"
              >
                Client Type
              </div>
              <div class="text-right text-sm font-medium">
                <span
                  class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs uppercase"
                  >{{ client.clientType || 'Standard' }}</span
                >
              </div>
            </div>

            <div
              class="px-6 py-4 grid grid-cols-[1fr_2fr] hover:bg-surface-variant transition-colors"
            >
              <div
                class="text-on-surface-variant font-medium text-sm flex items-start"
              >
                Email Notifications
              </div>
              <div class="text-right text-sm flex flex-col items-end gap-1">
                <span class="flex items-center gap-1 text-emerald-600"
                  ><mat-icon class="text-sm w-4 h-4 leading-4"
                    >check_circle</mat-icon
                  >
                  Appointment Notifications</span
                >
                <span class="flex items-center gap-1 text-emerald-600"
                  ><mat-icon class="text-sm w-4 h-4 leading-4"
                    >check_circle</mat-icon
                  >
                  Mass Communication</span
                >
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="flex justify-center items-center h-64">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ClientInfoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private clientsService = inject(ClientsService);
  public dateFormat = inject(DATE_FORMAT);

  client$: Observable<Client> | undefined;

  ngOnInit() {
    this.client$ = this.route.parent!.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.clientsService.getOwner(id);
      }),
    );
  }
}
