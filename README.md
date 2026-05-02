# Vet Clinic Management System

![Logo](docs/logos/vendor.svg)

[![Deploy to GitHub Pages](https://github.com/rmcclell/VetClinic/actions/workflows/deploy.yml/badge.svg)](https://github.com/rmcclell/VetClinic/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://rmcclell.github.io/VetClinic/)

**Vet Clinic Management System** is a passion-driven side project built from over 18 years of professional software development experience. What started as a personal challenge is evolving into a robust, comprehensive management platform for veterinary clinics.
Developing this as a side project allows me to prioritize quality and user experience. My goal is to create a powerful, self-hosted solution that will always be 100% free for anyone to deploy and manage themselves. While I may eventually offer a managed hosting service for those who prefer a turnkey experience, the core software will remain free and open to the community.
_Note: This project is currently a work in progress. It will take time to reach the full level of maturity I envision, but development is steady and ongoing._

This is a web-based application to manage a mobile veterinary clinic, built with Angular, NestJS, and Prisma.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **NX**: This project uses [Nx](https://nx.dev) for monorepo management.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

The project uses SQLite for the local database.

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations (initializes the dev.db file)
npm run db:migrate
```

### 3. Running the Application

You can start both the backend and frontend simultaneously, or individually.

#### Simultaneous Start

```bash
npm start
```

#### Individual Start

```bash
# Start the Backend (API) - Default: http://localhost:3000
npm run start:api

# Start the Frontend (Web) - Default: http://localhost:4200
npm run start:web
```

## Screenshots

| View                  | Light Mode                                         | Dark Mode                                        |
| --------------------- | -------------------------------------------------- | ------------------------------------------------ |
| **Dashboard**         | ![Light](docs/screenshots/dashboard_light.png)     | ![Dark](docs/screenshots/dashboard_dark.png)     |
| **Patient Directory** | ![Light](docs/screenshots/patients_light.png)      | ![Dark](docs/screenshots/patients_dark.png)      |
| **Clinic Settings**   | ![Light](docs/screenshots/settings_light.png)      | ![Dark](docs/screenshots/settings_dark.png)      |
| **Tasks & Reminders** | ![Light](docs/screenshots/tasks_light.png)         | ![Dark](docs/screenshots/tasks_dark.png)         |
| **Messages**          | ![Light](docs/screenshots/messages_light.png)      | ![Dark](docs/screenshots/messages_dark.png)      |
| **Invoices**          | ![Light](docs/screenshots/invoices_light.png)      | ![Dark](docs/screenshots/invoices_dark.png)      |
| **Appointments**      | ![Light](docs/screenshots/appointments_light.png)  | ![Dark](docs/screenshots/appointments_dark.png)  |
| **Owners / Clients**  | ![Light](docs/screenshots/clients_light.png)       | ![Dark](docs/screenshots/clients_dark.png)       |
| **User Settings**     | ![Light](docs/screenshots/user_settings_light.png) | ![Dark](docs/screenshots/user_settings_dark.png) |

### Patient Details

The patient details view features a route-based tab navigation system for comprehensive records.

| Tab                 | Light Mode                                                 | Dark Mode                                                |
| ------------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| **Medical History** | ![Light](docs/screenshots/patient_history_light.png)       | ![Dark](docs/screenshots/patient_history_dark.png)       |
| **Vaccinations**    | ![Light](docs/screenshots/patient_vaccinations_light.png)  | ![Dark](docs/screenshots/patient_vaccinations_dark.png)  |
| **Prescriptions**   | ![Light](docs/screenshots/patient_prescriptions_light.png) | ![Dark](docs/screenshots/patient_prescriptions_dark.png) |
| **Appointments**    | ![Light](docs/screenshots/patient_appointments_light.png)  | ![Dark](docs/screenshots/patient_appointments_dark.png)  |
| **Boarding**        | ![Light](docs/screenshots/patient_boarding_light.png)      | ![Dark](docs/screenshots/patient_boarding_dark.png)      |
| **Tasks**           | ![Light](docs/screenshots/patient_tasks_light.png)         | ![Dark](docs/screenshots/patient_tasks_dark.png)         |
| **Estimates**       | ![Light](docs/screenshots/patient_estimates_light.png)     | ![Dark](docs/screenshots/patient_estimates_dark.png)     |
| **Forms**           | ![Light](docs/screenshots/patient_forms_light.png)         | ![Dark](docs/screenshots/patient_forms_dark.png)         |
| **Invoices**        | ![Light](docs/screenshots/patient_invoices_light.png)      | ![Dark](docs/screenshots/patient_invoices_dark.png)      |
| **Labs**            | ![Light](docs/screenshots/patient_labs_light.png)          | ![Dark](docs/screenshots/patient_labs_dark.png)          |
| **Reminders**       | ![Light](docs/screenshots/patient_reminders_light.png)     | ![Dark](docs/screenshots/patient_reminders_dark.png)     |

### Patient Management Dialogs

Standardized modals for adding records and generating reports across all patient sub-sections.

| Section             | Add Record Dialog                                            | Print / Report Dialog                                            |
| ------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| **Medical History** | ![Add](docs/screenshots/patient_history_add_light.png)       | ![Print](docs/screenshots/patient_history_print_light.png)       |
| **Vaccinations**    | ![Add](docs/screenshots/patient_vaccinations_add_light.png)  | ![Print](docs/screenshots/patient_vaccinations_print_light.png)  |
| **Prescriptions**   | ![Add](docs/screenshots/patient_prescriptions_add_light.png) | ![Print](docs/screenshots/patient_prescriptions_print_light.png) |
| **Appointments**    | ![Add](docs/screenshots/patient_appointments_add_light.png)  | ![Print](docs/screenshots/patient_appointments_print_light.png)  |
| **Boarding**        | ![Add](docs/screenshots/patient_boarding_add_light.png)      | ![Print](docs/screenshots/patient_boarding_print_light.png)      |
| **Tasks**           | ![Add](docs/screenshots/patient_tasks_add_light.png)         | ![Print](docs/screenshots/patient_tasks_print_light.png)         |
| **Estimates**       | ![Add](docs/screenshots/patient_estimates_add_light.png)     | ![Print](docs/screenshots/patient_estimates_print_light.png)     |
| **Forms**           | ![Add](docs/screenshots/patient_forms_add_light.png)         | ![Print](docs/screenshots/patient_forms_print_light.png)         |
| **Invoices**        | ![Add](docs/screenshots/patient_invoices_add_light.png)      | ![Print](docs/screenshots/patient_invoices_print_light.png)      |
| **Labs**            | ![Add](docs/screenshots/patient_labs_add_light.png)          | ![Print](docs/screenshots/patient_labs_print_light.png)          |
| **Reminders**       | ![Add](docs/screenshots/patient_reminders_add_light.png)     | ![Print](docs/screenshots/patient_reminders_print_light.png)     |

_Note: All dialogs fully support both Light and Dark themes (Light shown above)._

### Client Details

The client details view provides a comprehensive overview of client records with tabbed navigation.

| Tab              | Light Mode                                               | Dark Mode                                              |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------ |
| **Client Info**  | ![Light](docs/screenshots/client_info_light.png)         | ![Dark](docs/screenshots/client_info_dark.png)         |
| **Patients**     | ![Light](docs/screenshots/client_patients_light.png)     | ![Dark](docs/screenshots/client_patients_dark.png)     |
| **Financial**    | ![Light](docs/screenshots/client_financial_light.png)    | ![Dark](docs/screenshots/client_financial_dark.png)    |
| **Appointments** | ![Light](docs/screenshots/client_appointments_light.png) | ![Dark](docs/screenshots/client_appointments_dark.png) |
| **Boarding**     | ![Light](docs/screenshots/client_boarding_light.png)     | ![Dark](docs/screenshots/client_boarding_dark.png)     |
| **Tasks**        | ![Light](docs/screenshots/client_tasks_light.png)        | ![Dark](docs/screenshots/client_tasks_dark.png)        |
| **Reminders**    | ![Light](docs/screenshots/client_reminders_light.png)    | ![Dark](docs/screenshots/client_reminders_dark.png)    |
| **Forms**        | ![Light](docs/screenshots/client_forms_light.png)        | ![Dark](docs/screenshots/client_forms_dark.png)        |
| **Messaging**    | ![Light](docs/screenshots/client_messaging_light.png)    | ![Dark](docs/screenshots/client_messaging_dark.png)    |

## Tools & Documentation

- **Swagger UI (API Docs)**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Prisma Studio (DB Manager)**: [http://localhost:5555](http://localhost:5555) (Run `npm run db:studio`)

## Documentation Maintenance

### Generating Screenshots

The screenshots in this `README.md` and the `docs/screenshots` directory are automatically generated to ensure consistency across Light and Dark modes.

To refresh all screenshots:

1. Ensure the application is running (`npm start`).
2. Run the generation script:
   ```bash
   node docs/maintenance/generate_screenshots.js
   ```

This script uses Playwright to:

- Navigate to all key application routes.
- Capture screenshots in both **Light** and **Dark** modes.
- Save the results directly to `docs/screenshots/`.

## Project Structure

- `vet-clinic`: Angular Frontend with Material Design.
- `api`: NestJS Backend.
- `shared-types`: Shared TypeScript interfaces and DTOs.
- `prisma`: Database schema and migrations.

## Technical Details

- **Frontend**: Angular + Angular Material. Responsive design for mobile, tablet, and desktop.
- **Backend**: NestJS for a structured, scalable API.
- **Database**: Prisma ORM with SQLite (Relational integrity without overhead).
