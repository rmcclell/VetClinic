import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, of, Observable } from 'rxjs';
import { User, UserRole, AuthResponse } from '@vet-clinic/shared-types';

const TOKEN_KEY = 'vet_access_token';
const USER_KEY = 'vet_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = '/api/auth';

  private userSignal = signal<User | null>(this.getStoredUser());
  private tokenSignal = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  readonly currentUser = computed(() => this.userSignal());
  readonly token = computed(() => this.tokenSignal());
  readonly isAuthenticated = computed(() => !!this.userSignal());
  readonly userRole = computed(() => this.userSignal()?.role || null);

  readonly isDoctor = computed(() => this.userSignal()?.role === 'DOCTOR');
  readonly isTech = computed(() => this.userSignal()?.role === 'TECH');
  readonly isAdmin = computed(() => this.userSignal()?.role === 'OFFICE_ADMIN');
  readonly isStaff = computed(() =>
    ['DOCTOR', 'TECH', 'OFFICE_ADMIN'].includes(this.userSignal()?.role || ''),
  );
  readonly isClient = computed(() => this.userSignal()?.role === 'CLIENT');

  constructor() {
    if (this.tokenSignal()) {
      this.fetchCurrentUser().subscribe();
    }
  }

  private getStoredUser(): User | null {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(TOKEN_KEY, res.accessToken);
          localStorage.setItem(USER_KEY, JSON.stringify(res.user));
          this.tokenSignal.set(res.accessToken);
          this.userSignal.set(res.user);
        }),
      );
  }

  fetchCurrentUser(): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap((user) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.userSignal.set(user);
      }),
      catchError(() => {
        this.clearSession();
        return of(null);
      }),
    );
  }

  logout() {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => this.handleLogoutRedirect(),
      error: () => this.handleLogoutRedirect(),
    });
  }

  private handleLogoutRedirect() {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  hasRole(...roles: UserRole[]): boolean {
    const role = this.userRole();
    return !!role && roles.includes(role);
  }
}
