import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '@vet-clinic/shared-types';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private http = inject(HttpClient);
  private apiUrl = '/api/appointments';

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  createAppointment(
    appointment: CreateAppointmentDto,
  ): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  updateAppointment(
    id: number,
    appointment: UpdateAppointmentDto,
  ): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
