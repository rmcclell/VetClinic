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

  addMedicalHistory(patientId: number, historyData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/history`, historyData);
  }

  addVaccination(patientId: number, vaccinationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/vaccinations`, vaccinationData);
  }

  addPrescription(patientId: number, prescriptionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/prescriptions`, prescriptionData);
  }

  addAppointment(patientId: number, appointmentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/appointments`, appointmentData);
  }

  addBoarding(patientId: number, boardingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/boarding`, boardingData);
  }

  addTask(patientId: number, taskData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/tasks`, taskData);
  }

  addInvoice(patientId: number, invoiceData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/invoices`, invoiceData);
  }

  addReminder(patientId: number, reminderData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/reminders`, reminderData);
  }

  addLab(patientId: number, labData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/labs`, labData);
  }

  addEstimate(patientId: number, estimateData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/estimates`, estimateData);
  }

  addForm(patientId: number, formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/forms`, formData);
  }

  sendForm(patientId: number, formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${patientId}/forms/send`, formData);
  }
}
