import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClinicConfig, UpdateClinicConfigDto } from '@vet-clinic/shared-types';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private http = inject(HttpClient);
  private apiUrl = '/api/config';

  private state = signal<ClinicConfig | null>(null);

  // Expose configuration as a computed signal for easy access
  readonly config = computed(() => this.state());
  readonly clinicName = computed(() => this.state()?.name || 'VetClinic');
  readonly logoUrl = computed(() => this.state()?.logoUrl);

  constructor() {
    this.loadConfig();
  }

  loadConfig() {
    this.http.get<ClinicConfig>(this.apiUrl).subscribe({
      next: (config) => this.state.set(config),
      error: (err) => console.error('Failed to load clinic config', err),
    });
  }

  updateConfig(dto: UpdateClinicConfigDto) {
    return this.http
      .put<ClinicConfig>(this.apiUrl, dto)
      .pipe(tap((updated) => this.state.set(updated)));
  }
}
