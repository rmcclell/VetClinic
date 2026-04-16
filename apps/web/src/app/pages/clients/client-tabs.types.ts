export interface ClientTabLink {
  label: string;
  path: string;
  count?: number;
  icon?: string;
  exact?: boolean;
}

export const CLIENT_TAB_LINKS: ClientTabLink[] = [
  { label: 'Client Info', path: './', icon: 'info', exact: true },
  { label: 'Patients', path: 'patients', icon: 'pets' },
  { label: 'Financial', path: 'financial', icon: 'account_balance_wallet' },
  { label: 'Appointments', path: 'appointments', icon: 'event' },
  { label: 'Boarding', path: 'boarding', icon: 'hotel' },
  { label: 'Tasks', path: 'tasks', icon: 'assignment', count: 0 },
  { label: 'Reminders', path: 'reminders', icon: 'notifications' },
  { label: 'Forms', path: 'forms', icon: 'description' },
  { label: 'Messaging', path: 'messaging', icon: 'chat' },
];
