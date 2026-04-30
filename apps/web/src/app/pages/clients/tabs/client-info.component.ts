import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '@vet-clinic/shared-types';
import { Observable, switchMap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { DATE_FORMAT } from '../../../core/date-format.token';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [
    CommonModule, 
    MatProgressSpinnerModule, 
    MatIconModule, 
    MatDividerModule,
    MatTooltipModule
  ],
  providers: [DatePipe],
  template: `
    <div class="p-6 h-full flex flex-col gap-6 overflow-auto" role="main">
      @if (client$ | async; as client) {
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Contact Information Card -->
          <section 
            class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow"
            aria-labelledby="contact-heading"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                <mat-icon>contact_phone</mat-icon>
              </div>
              <h3 id="contact-heading" class="text-lg font-bold text-gray-900 m-0 tracking-tight">Contact Information</h3>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div class="info-group">
                <label id="email-label" class="info-label">Email Address</label>
                <a [href]="'mailto:' + client.email" 
                   aria-labelledby="email-label"
                   class="info-value text-blue-600 hover:underline flex items-center gap-1">
                   {{ client.email || '-' }}
                   <mat-icon class="text-xs w-3 h-3! leading-3">open_in_new</mat-icon>
                </a>
              </div>
              
              <div class="info-group">
                <label id="phone-label" class="info-label">Phone Number</label>
                <div aria-labelledby="phone-label" class="info-value flex items-center gap-2">
                  <mat-icon class="text-gray-400 text-sm w-4 h-4! leading-4">smartphone</mat-icon>
                  {{ client.phone || '-' }}
                </div>
              </div>
              
              <div class="info-group sm:col-span-2">
                <label id="address-label" class="info-label">Physical Address</label>
                <div aria-labelledby="address-label" class="info-value">
                  {{ client.address || '-' }}
                </div>
              </div>
            </div>
          </section>

          <!-- Personal Details Card -->
          <section 
            class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow"
            aria-labelledby="personal-heading"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                <mat-icon>person</mat-icon>
              </div>
              <h3 id="personal-heading" class="text-lg font-bold text-gray-900 m-0 tracking-tight">Personal Details</h3>
            </div>
            
            <div class="grid grid-cols-2 gap-x-6 gap-y-4">
              <div class="info-group">
                <label id="id-label" class="info-label">Client ID</label>
                <div aria-labelledby="id-label" class="info-value font-mono font-black text-gray-400">
                  {{ client.id ? 'C-' + client.id : '-' }}
                </div>
              </div>
              
              <div class="info-group">
                <label id="type-label" class="info-label">Client Type</label>
                <div aria-labelledby="type-label" class="info-value">
                  <span class="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {{ client.clientType || 'Standard' }}
                  </span>
                </div>
              </div>
              
              <div class="info-group">
                <label id="dob-label" class="info-label">Date of Birth</label>
                <div aria-labelledby="dob-label" class="info-value">
                  {{ (client.dob | date: dateFormat) || '-' }}
                </div>
              </div>
              
              <div class="info-group">
                <label id="gender-label" class="info-label">Gender</label>
                <div aria-labelledby="gender-label" class="info-value">
                  {{ client.gender || '-' }}
                </div>
              </div>
            </div>
          </section>

          <!-- Identification Card -->
          <section 
            class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow"
            aria-labelledby="id-heading"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-inner">
                <mat-icon>badge</mat-icon>
              </div>
              <h3 id="id-heading" class="text-lg font-bold text-gray-900 m-0 tracking-tight">Identification</h3>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div class="info-group">
                <label id="dl-state-label" class="info-label">DL State</label>
                <div aria-labelledby="dl-state-label" class="info-value">
                  {{ client.driverLicenseState || '-' }}
                </div>
              </div>
              
              <div class="info-group">
                <label id="dl-num-label" class="info-label">DL Number</label>
                <div aria-labelledby="dl-num-label" class="info-value font-mono">
                  {{ client.driverLicenseNumber || '-' }}
                </div>
              </div>
              
              <div class="info-group">
                <label id="dl-exp-label" class="info-label">DL Expiration</label>
                <div aria-labelledby="dl-exp-label" class="info-value">
                  {{ (client.driverLicenseExp | date: dateFormat) || '-' }}
                </div>
              </div>
            </div>
          </section>

          <!-- Emergency Contact Card -->
          <section 
            class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow"
            aria-labelledby="emergency-heading"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shadow-inner">
                <mat-icon>contact_emergency</mat-icon>
              </div>
              <h3 id="emergency-heading" class="text-lg font-bold text-gray-900 m-0 tracking-tight">Emergency Contact</h3>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div class="info-group">
                <label id="ec-name-label" class="info-label">Contact Name</label>
                <div aria-labelledby="ec-name-label" class="info-value">
                  {{ client.emergencyContactName || '-' }}
                </div>
              </div>
              
              <div class="info-group">
                <label id="ec-phone-label" class="info-label">Contact Phone</label>
                <div aria-labelledby="ec-phone-label" class="info-value">
                  {{ client.emergencyContactPhone || '-' }}
                </div>
              </div>
            </div>
          </section>

          <!-- Preferences Card -->
          <section 
            class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow"
            aria-labelledby="pref-heading"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-inner">
                <mat-icon>settings_suggest</mat-icon>
              </div>
              <h3 id="pref-heading" class="text-lg font-bold text-gray-900 m-0 tracking-tight">Preferences</h3>
            </div>
            
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-gray-800">Email Notifications</span>
                  <span class="text-xs text-gray-500">Appointments & Mass Comm</span>
                </div>
                <div class="flex items-center gap-1 text-emerald-600 font-bold text-xs uppercase tracking-tighter">
                  <mat-icon class="text-base w-4 h-4! leading-4">verified</mat-icon>
                  Enabled
                </div>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-gray-800">SMS Alerts</span>
                  <span class="text-xs text-gray-500">Urgent Reminders</span>
                </div>
                <div class="flex items-center gap-1 text-emerald-600 font-bold text-xs uppercase tracking-tighter">
                  <mat-icon class="text-base w-4 h-4! leading-4">verified</mat-icon>
                  Enabled
                </div>
              </div>
            </div>
          </section>

        </div>
      } @else {
        <div class="flex flex-col justify-center items-center h-64 gap-3 text-gray-400">
          <mat-spinner diameter="40" color="primary"></mat-spinner>
          <span class="text-sm font-medium animate-pulse">Loading client profile...</span>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      background-color: transparent;
    }
    .info-group {
      @apply flex flex-col gap-1;
    }
    .info-label {
      @apply text-[10px] font-black uppercase text-gray-400 tracking-[0.1em] leading-none;
    }
    .info-value {
      @apply text-sm font-bold text-gray-800 break-words;
    }
  `],
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
