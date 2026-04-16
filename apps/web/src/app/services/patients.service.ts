import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Patient,
  CreatePatientDto,
  UpdatePatientDto,
} from '@vet-clinic/shared-types';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private http = inject(HttpClient);
  private apiUrl = '/api/patients';

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  createPatient(patient: CreatePatientDto): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  updatePatient(id: number, patient: UpdatePatientDto): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient);
  }

  deletePatient(id: number): Observable<Patient> {
    return this.http.delete<Patient>(`${this.apiUrl}/${id}`);
  }
}
