import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Client,
  CreateClientDto,
  UpdateClientDto,
} from '@vet-clinic/shared-types';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private http = inject(HttpClient);
  private apiUrl = '/api/clients';

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getOwner(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  createOwner(Client: CreateClientDto): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, Client);
  }

  updateOwner(id: number, Client: UpdateClientDto): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, Client);
  }

  deleteOwner(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.apiUrl}/${id}`);
  }
}
