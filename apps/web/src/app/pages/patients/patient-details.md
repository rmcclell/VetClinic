# Patient Details - Route-Based Tab Architecture

The Patient Details section has been refactored from a single-component state to a route-based child navigation system. This enables deep linking, state preservation on refresh, and efficient lazy loading of individual tab contents.

## UI Overview

The following sections show the content rendered within the `router-outlet`:

| Appointment                                                       | Prescriptions                                                    | Tasks                                                       |
| ----------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------- |
| ![Appt](../../../../../docs/screenshots/patient_appointments.png) | ![Px](../../../../../docs/screenshots/patient_prescriptions.png) | ![Tasks](../../../../../docs/screenshots/patient_tasks.png) |

| Boarding                                                          | Invoices                                                          | Forms                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------- |
| ![Boarding](../../../../../docs/screenshots/patient_boarding.png) | ![Invoices](../../../../../docs/screenshots/patient_invoices.png) | ![Forms](../../../../../docs/screenshots/patient_forms.png) |

| Reminders                                                           | Labs                                                      | Estimates                                                           |
| ------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------- |
| ![Reminders](../../../../../docs/screenshots/patient_reminders.png) | ![Labs](../../../../../docs/screenshots/patient_labs.png) | ![Estimates](../../../../../docs/screenshots/patient_estimates.png) |

## Core Structure

The main component is `PatientDetailsComponent`, which serves as a shell containing the patient header, sidebar, and the navigation bar.

- **Component**: `PatientDetailsComponent` (`src/app/pages/patients/patient-details.component.ts`)
- **Template**:
  - `mat-tab-nav-bar`: Uses `PATIENT_TAB_LINKS` to render navigation links.
  - `<router-outlet>`: Renders the active child component (lazy-loaded).

## Tab Configuration

Tab labels, paths, and optional badges (counts) are centralized in `src/app/pages/patients/patient-tabs.types.ts`.

```typescript
export const PATIENT_TAB_LINKS: PatientTabLink[] = [
  { label: 'Medical History', path: 'history' },
  { label: 'Vaccinations', path: 'vaccinations' },
  // ...
];
```

## Routing Details

The child routes are defined in `app.routes.ts` under the `patients/:id` path.

```typescript
{
    path: 'patients/:id',
    loadComponent: () => import('./pages/patients/patient-details.component').then(m => m.PatientDetailsComponent),
    children: [
        { path: '', redirectTo: 'history', pathMatch: 'full' },
        { path: 'history', loadComponent: () => import('./pages/patients/tabs/patient-history.component').then(m => m.PatientHistoryComponent) },
        // ... all 11 tabs
    ]
}
```

## Adding a New Tab

1. **Create Component**: Create a new standalone component in `src/app/pages/patients/tabs/`.
2. **Update Mapping**: Add the label and path to `PATIENT_TAB_LINKS` in `patient-tabs.types.ts`.
3. **Configure Route**: Add the child route to the `patients/:id` hierarchy in `app.routes.ts`.

## Data Fetching

The `PatientDetailsComponent` fetches the basic patient info using the `id` param. Child components can also inject `ActivatedRoute` to access the parent `id` param for tab-specific data fetching.
