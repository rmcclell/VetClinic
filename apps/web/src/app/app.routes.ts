import { Route } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';


export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('./pages/clients/clients-page.component').then(
            (m) => m.ClientsPageComponent,
          ),
      },
      {
        path: 'clients/:id',
        loadComponent: () =>
          import('./pages/clients/client-details.component').then(
            (m) => m.ClientDetailsComponent,
          ),
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          {
            path: 'info',
            loadComponent: () =>
              import('./pages/clients/tabs/client-info.component').then(
                (m) => m.ClientInfoComponent,
              ),
          },
          {
            path: 'patients',
            loadComponent: () =>
              import('./pages/clients/tabs/client-patients.component').then(
                (m) => m.ClientPatientsComponent,
              ),
          },
          {
            path: 'financial',
            loadComponent: () =>
              import('./pages/clients/tabs/client-financial.component').then(
                (m) => m.ClientFinancialComponent,
              ),
          },
          {
            path: 'tasks',
            loadComponent: () =>
              import('./pages/clients/tabs/client-tasks.component').then(
                (m) => m.ClientTasksComponent,
              ),
          },
          {
            path: 'appointments',
            loadComponent: () =>
              import('./pages/clients/tabs/client-appointments.component').then(
                (m) => m.ClientAppointmentsComponent,
              ),
          },
          {
            path: 'boarding',
            loadComponent: () =>
              import('./pages/clients/tabs/client-boarding.component').then(
                (m) => m.ClientBoardingComponent,
              ),
          },
          {
            path: 'reminders',
            loadComponent: () =>
              import('./pages/clients/tabs/client-reminders.component').then(
                (m) => m.ClientRemindersComponent,
              ),
          },
          {
            path: 'forms',
            loadComponent: () =>
              import('./pages/clients/tabs/client-forms.component').then(
                (m) => m.ClientFormsComponent,
              ),
          },
          {
            path: 'messaging',
            loadComponent: () =>
              import('./pages/clients/tabs/client-messaging.component').then(
                (m) => m.ClientMessagingComponent,
              ),
          },
          {
            path: 'info',
            loadComponent: () =>
              import('./pages/clients/tabs/client-info.component').then(
                (m) => m.ClientInfoComponent,
              ),
          },
        ],
      },
      {
        path: 'patients',
        loadComponent: () =>
          import('./pages/patients/patients-page.component').then(
            (m) => m.PatientsPageComponent,
          ),
      },
      {
        path: 'patients/:id',
        loadComponent: () =>
          import('./pages/patients/patient-details.component').then(
            (m) => m.PatientDetailsComponent,
          ),
        children: [
          { path: '', redirectTo: 'history', pathMatch: 'full' },
          {
            path: 'history',
            loadComponent: () =>
              import('./pages/patients/tabs/patient-history.component').then(
                (m) => m.PatientHistoryComponent,
              ),
          },
          {
            path: 'vaccinations',
            loadComponent: () =>
              import(
                './pages/patients/tabs/patient-vaccinations.component'
              ).then((m) => m.PatientVaccinationsComponent),
          },
          {
            path: 'prescriptions',
            loadComponent: () =>
              import(
                './pages/patients/tabs/patient-prescriptions.component'
              ).then((m) => m.PatientPrescriptionsComponent),
          },
          {
            path: 'appointments',
            loadComponent: () =>
              import(
                './pages/patients/tabs/patient-appointments.component'
              ).then((m) => m.PatientAppointmentsComponent),
          },
          {
            path: 'boarding',
            loadComponent: () =>
              import('./pages/patients/tabs/patient-boarding.component').then(
                (m) => m.PatientBoardingComponent,
              ),
          },
          {
            path: 'tasks',
            loadComponent: () =>
              import('./pages/patients/tabs/patient-tasks.component').then(
                (m) => m.PatientTasksComponent,
              ),
          },
          {
            path: 'invoices',
            loadComponent: () =>
              import('./pages/patients/tabs/patient-invoices.component').then(
                (m) => m.PatientInvoicesComponent,
              ),
          },
          {
            path: 'forms',
            loadComponent: () =>
              import('./pages/patients/tabs/patient-forms.component').then(
                (m) => m.PatientFormsComponent,
              ),
          },
          {
            path: 'reminders',
            loadComponent: () =>
              import('./pages/patients/tabs/patient-reminders.component').then(
                (m) => m.PatientRemindersComponent,
              ),
          },
          {
            path: 'labs',
            loadComponent: () =>
              import('./pages/patients/tabs/patient-labs.component').then(
                (m) => m.PatientLabsComponent,
              ),
          },
          {
            path: 'estimates',
            loadComponent: () =>
              import('./pages/patients/tabs/patient-estimates.component').then(
                (m) => m.PatientEstimatesComponent,
              ),
          },
        ],
      },
      { path: 'appointments', redirectTo: 'appointments/day', pathMatch: 'full' },
      {
        path: 'appointments/:viewMode',
        loadComponent: () =>
          import('./pages/appointments/appointments-page.component').then(
            (m) => m.AppointmentsPageComponent,
          ),
      },
      {
        path: 'invoices',
        loadComponent: () =>
          import('./pages/invoices/invoices-page.component').then(
            (m) => m.InvoicesPageComponent,
          ),
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./pages/tasks/tasks-page.component').then(
            (m) => m.TasksPageComponent,
          ),
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./pages/messages/messages-page.component').then(
            (m) => m.MessagesPageComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/clinic-settings.component').then(
            (m) => m.ClinicSettingsComponent,
          ),
        children: [
          { path: '', redirectTo: 'branding', pathMatch: 'full' },
          {
            path: 'branding',
            loadComponent: () =>
              import('./pages/settings/tabs/settings-branding.component').then(
                (m) => m.SettingsBrandingComponent,
              ),
          },
          {
            path: 'contact',
            loadComponent: () =>
              import('./pages/settings/tabs/settings-contact.component').then(
                (m) => m.SettingsContactComponent,
              ),
          },
          {
            path: 'systemPreferences',
            loadComponent: () =>
              import(
                './pages/settings/tabs/settings-preferences.component'
              ).then((m) => m.SettingsPreferencesComponent),
          },
        ],
      },
    ],
  },
];
