export interface MedicalHistoryItem {
  id: number;
  type: 'SOAP' | 'Prescription' | 'File' | 'Weight' | 'Task';
  status: 'Completed' | 'Locked' | 'PRN' | 'Uploaded';
  date: Date;
  details: string;
  doctor: {
    name: string;
    initials: string;
    avatarUrl?: string;
  };
}

export interface PrescriptionItem {
  id: number;
  name: string;
  quantity: string;
  type: string;
  creationDate: Date;
  validThru: Date;
  refillCount: number;
  lastRefill: Date;
  directions: string;
}

export interface VaccinationItem {
  id: number;
  name: string;
  dueDate: Date;
  status: 'Overdue' | 'Due Soon' | 'Up to Date';
}

export interface AppointmentHistoryItem {
  id: number;
  date: Date;
  time: string;
  client: string;
  status:
    | 'Upcoming'
    | 'Canceled'
    | 'No Show'
    | 'Pending Confirmation'
    | 'Completed';
  type: string;
  provider: string;
}

export interface BoardingReservation {
  id: number;
  checkIn: Date;
  checkOut: Date;
  client: string;
  resource: string;
  status: 'Active' | 'Completed' | 'Reserved' | 'Canceled';
  details: string;
  notes: string;
}

export interface PatientTask {
  id: number;
  dueDate: Date;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  title: string;
  description: string;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface InvoiceItem {
  id: number;
  invoiceNumber: string;
  date: Date;
  description: string;
  quantity: number;
  price: number;
}

export interface FormItem {
  id: number;
  date: Date;
  title: string;
  client: string;
  status: 'Sent' | 'Completed' | 'Draft' | 'Pending';
  dateCompleted?: Date;
}

export interface LabItem {
  id: number;
  type: 'Document';
  details: string;
  date: Date;
  addedBy: string;
}

export interface EstimateItem {
  id: number;
  dateCreated: Date;
  title: string;
  expirationDate: Date;
  status: 'Pending' | 'Approved' | 'Declined' | 'Expired';
  importedToSoap: boolean;
  approvalDate?: Date;
  estimatedCharges: number;
}

export interface ReminderItem {
  id: number;
  name: string;
  dueDate: Date;
  triggerProduct: string;
  status: 'Overdue' | 'Due Soon' | 'Upcoming' | 'Completed';
}

export interface PatientTabLink {
  label: string;
  path: string;
  count?: number;
}

export const PATIENT_TAB_LINKS: PatientTabLink[] = [
  { label: 'Medical History', path: 'history' },
  { label: 'Vaccinations', path: 'vaccinations' },
  { label: 'Prescriptions', path: 'prescriptions' },
  { label: 'Appointments', path: 'appointments', count: 1 },
  { label: 'Boarding', path: 'boarding' },
  { label: 'Tasks', path: 'tasks', count: 3 },
  { label: 'Invoices', path: 'invoices' },
  { label: 'Forms', path: 'forms' },
  { label: 'Reminders', path: 'reminders', count: 1 },
  { label: 'Labs', path: 'labs' },
  { label: 'Estimates', path: 'estimates' },
];
