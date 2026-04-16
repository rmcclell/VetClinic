export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  secondaryPhone: string | null;
  address: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  notes: string | null;
  dob: Date | null;
  gender: string | null;
  driverLicenseState: string | null;
  driverLicenseNumber: string | null;
  driverLicenseExp: string | null;
  clientType: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  patients?: Patient[];
}

export interface CreateClientDto {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  secondaryPhone?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
  dob?: Date;
  gender?: string;
  driverLicenseState?: string;
  driverLicenseNumber?: string;
  driverLicenseExp?: string;
  clientType?: string;
  active?: boolean;
}

export type UpdateClientDto = Partial<CreateClientDto>

export interface Patient {
  id: number;
  name: string;
  species: string;
  breed: string | null;
  sex: string | null;
  weight: number | null;
  microchipNumber: string | null;
  color: string | null;
  birthDate: Date | null;
  notes: string | null;
  clientId: number;
  photoUrl: string | null;
  rabiesTag: string | null;
  preferredProvider: string | null;
  referralSource: string | null;
  createdAt: Date;
  updatedAt: Date;
  client?: Client;
}

export interface CreatePatientDto {
  name: string;
  species: string;
  breed?: string;
  sex?: string;
  weight?: number;
  microchipNumber?: string;
  color?: string;
  birthDate?: Date;
  notes?: string;
  clientId: number;
  photoUrl?: string;
  rabiesTag?: string;
  preferredProvider?: string;
  referralSource?: string;
}

export type UpdatePatientDto = Partial<CreatePatientDto>

export interface Appointment {
  id: number;
  startTime: string | Date;
  endTime: string | Date;
  description: string | null;
  status: string; // Scheduled, Completed, Cancelled
  clientId: number;
  patientId: number;
  createdAt: Date;
  updatedAt: Date;
  client?: Client;
  patient?: Patient;
}

export interface CreateAppointmentDto {
  startTime: string | Date;
  endTime: string | Date;
  description?: string;
  status?: string;
  clientId: number;
  patientId: number;
}

export interface ClinicConfig {
  id: number;
  name: string;
  logoUrl: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  units: string;
  dateFormat: string;
  hoursOfOperation: string | null;
  websiteUrl: string | null;
  taxRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateClinicConfigDto = Partial<ClinicConfig>

export type UpdateAppointmentDto = Partial<CreateAppointmentDto>
