import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import {
  MOCK_CLIENTS,
  MOCK_PATIENTS,
  MOCK_APPOINTMENTS,
  MOCK_CONFIG,
} from '../mock-data/mock-data';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Only intercept if we are in demo mode (e.g. GitHub Pages, not localhost)
  const isDemoMode =
    !window.location.hostname.includes('localhost') &&
    !window.location.hostname.includes('127.0.0.1');

  if (!req.url.startsWith('/api')) {
    return next(req);
  }

  // To force demo mode locally for testing, change to true
  const forceDemo = false;

  if (!isDemoMode && !forceDemo) {
    return next(req);
  }

  console.log(`[MockAPI] Intercepting ${req.method} ${req.url}`);

  let response: any;

  // Handle Auth
  if (req.url.endsWith('/api/auth/login') && req.method === 'POST') {
    const body = req.body as any;
    let role = 'DOCTOR';
    let name = 'Emily Smith';
    if (body?.email?.includes('admin')) {
      role = 'OFFICE_ADMIN';
      name = 'Office Admin';
    } else if (body?.email?.includes('tech')) {
      role = 'TECH';
      name = 'Alex Taylor';
    } else if (body?.email?.includes('client') || body?.email?.includes('sarah')) {
      role = 'CLIENT';
      name = 'Sarah Johnson';
    }
    const [firstName, ...rest] = name.split(' ');
    response = {
      accessToken: 'demo-jwt-token-' + role.toLowerCase(),
      user: {
        id: 1,
        email: body?.email || 'dr.smith@springfieldvet.com',
        firstName,
        lastName: rest.join(' '),
        role,
        active: true,
      },
    };
  } else if (req.url.endsWith('/api/auth/me') && req.method === 'GET') {
    response = {
      id: 1,
      email: 'dr.smith@springfieldvet.com',
      firstName: 'Emily',
      lastName: 'Smith',
      role: 'DOCTOR',
      active: true,
    };
  } else if (req.url.endsWith('/api/auth/logout') && req.method === 'POST') {
    response = { message: 'Logged out successfully' };
  }

  // Handle Clients
  else if (req.url.endsWith('/api/clients') && req.method === 'GET') {
    response = MOCK_CLIENTS;
  } else if (req.url.match(/\/api\/clients\/\d+$/) && req.method === 'GET') {
    const id = parseInt(req.url.split('/').pop() || '0');
    const client = MOCK_CLIENTS.find((c) => c.id === id);
    response = client
      ? { ...client, patients: MOCK_PATIENTS.filter((p) => p.clientId === id) }
      : null;
  }

  // Handle Patients
  else if (req.url.endsWith('/api/patients') && req.method === 'GET') {
    response = MOCK_PATIENTS;
  } else if (req.url.match(/\/api\/patients\/\d+$/) && req.method === 'GET') {
    const id = parseInt(req.url.split('/').pop() || '0');
    const patient = MOCK_PATIENTS.find((p) => p.id === id);
    response = patient
      ? {
          ...patient,
          client: MOCK_CLIENTS.find((c) => c.id === patient.clientId),
        }
      : null;
  }

  // Handle Appointments
  else if (req.url.endsWith('/api/appointments') && req.method === 'GET') {
    response = MOCK_APPOINTMENTS;
  }

  // Handle Config
  else if (req.url.endsWith('/api/config') && req.method === 'GET') {
    response = MOCK_CONFIG;
  }

  // Default fallback for other GET requests
  else if (req.method === 'GET') {
    response = [];
  }

  // Handle POST/PUT (Simulate success)
  else {
    response = { success: true, message: 'Simulated success in Demo Mode' };
  }

  return of(new HttpResponse({ status: 200, body: response })).pipe(delay(300));
};
