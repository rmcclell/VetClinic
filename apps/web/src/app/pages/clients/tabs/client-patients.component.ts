import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ClientsService } from '../../../services/clients.service';
import { ConfigService } from '../../../services/config.service';
import { Client } from '@vet-clinic/shared-types';
import { Observable, switchMap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-client-patients',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="h-full flex flex-col pt-6 p-6">
      @if (client$ | async; as client) {
        <div class="flex justify-between items-center mb-6">
          <div
            class="flex items-center gap-4 text-sm font-medium text-on-surface-variant opacity-80"
          >
            <span>Include Inactive/Deceased</span>
            <mat-slide-toggle
              aria-label="Include inactive and deceased patients"
            ></mat-slide-toggle>
          </div>
          <button mat-flat-button color="primary" class="rounded-lg">
            <mat-icon aria-hidden="true" class="mr-1">add</mat-icon> Add Patient
          </button>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start pb-6"
        >
          @for (patient of client.patients; track patient.id) {
            <mat-card
              class="bg-surface-variant border border-outline rounded-2xl cursor-pointer hover:bg-surface focus-within:ring-2 focus-within:ring-primary focus-within:outline-none transition-all shadow-none overflow-hidden"
              [routerLink]="['/patients', patient.id]"
              tabindex="0"
            >
              <div class="p-6 flex flex-col items-center gap-4 text-center">
                <div
                  class="w-24 h-24 rounded-full overflow-hidden bg-surface border-4 border-surface shadow-sm shrink-0"
                >
                  @if (patient.photoUrl) {
                    <img
                      [src]="patient.photoUrl"
                      class="w-full h-full object-cover"
                      [alt]="patient.name"
                    />
                  } @else {
                    <div
                      class="w-full h-full flex items-center justify-center text-on-surface-variant opacity-40"
                    >
                      <mat-icon class="text-4xl w-10 h-10 leading-10"
                        >pets</mat-icon
                      >
                    </div>
                  }
                </div>

                <div class="flex flex-col items-center w-full min-w-0">
                  <div
                    class="font-extrabold text-on-surface text-xl leading-tight truncate w-full"
                  >
                    {{ patient.name }}
                  </div>
                  <div
                    class="text-xs text-on-surface-variant font-medium mt-2 flex flex-col gap-1 items-center opacity-80"
                  >
                    <span class="truncate w-full">{{
                      patient.breed || 'Unknown Breed'
                    }}</span>
                    <span class="flex items-center justify-center gap-1">
                      <span>{{ patient.species }}</span>
                      <span aria-hidden="true">&bull;</span>
                      <span>{{ patient.sex || 'Unknown Sex' }}</span>
                    </span>
                    <span
                      class="font-bold text-on-surface bg-surface px-3 py-1 rounded-full mt-1 border border-outline"
                    >
                      {{
                        patient.weight
                          ? patient.weight +
                            ' ' +
                            (configService.config()?.units === 'imperial'
                              ? 'lbs'
                              : 'kg')
                          : 'Weight Unk'
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </mat-card>
          } @empty {
            <div
              class="col-span-full flex flex-col items-center justify-center text-center p-12 text-on-surface-variant opacity-60"
            >
              <mat-icon class="text-6xl w-16 h-16 opacity-30 mb-4"
                >pets</mat-icon
              >
              <div class="text-lg font-medium">No patients found</div>
              <div class="text-sm mt-1">
                This client does not have any assigned patients yet.
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="flex justify-center items-center flex-1">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class ClientPatientsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private clientsService = inject(ClientsService);
  public configService = inject(ConfigService);

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
