# Vet Clinic Management System

![Logo](docs/logos/vendor.svg)

[![Deploy to GitHub Pages](https://github.com/rmcclell/VetClinic/actions/workflows/deploy.yml/badge.svg)](https://github.com/rmcclell/VetClinic/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://rmcclell.github.io/VetClinic/)

**Vet Clinic Management System** is a passion-driven side project built from over 18 years of professional software development experience. What started as a personal challenge is evolving into a robust, comprehensive management platform for veterinary clinics.
Developing this as a side project allows me to prioritize quality and user experience. My goal is to create a powerful, self-hosted solution that will always be 100% free for anyone to deploy and manage themselves. While I may eventually offer a managed hosting service for those who prefer a turnkey experience, the core software will remain free and open to the community.
_Note: This project is currently a work in progress. It will take time to reach the full level of maturity I envision, but development is steady and ongoing._

This is a web-based application to manage a mobile veterinary clinic, built with Angular, NestJS, and Prisma.

## Prerequisites

### Docker (Recommended)

- **Docker**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)

That's it! Docker handles everything else — Node.js, PostgreSQL, dependencies, builds.

### Without Docker

- **Node.js**: v24 or later
- **PostgreSQL**: v16 or later (running locally or remotely)
- **NX**: This project uses [Nx](https://nx.dev) for monorepo management

## Getting Started

### Option 1: Docker (Recommended) 🐳

The entire application (PostgreSQL database, NestJS backend API, and Angular frontend) is packaged as a self-contained Docker Compose stack.

#### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

#### 1. Start the Stack

**First Run (with database migrations & seed data):**

- **macOS / Linux / Git Bash:**
  ```bash
  SEED_DB=true docker compose up -d --build
  ```
- **Windows PowerShell:**
  ```powershell
  $env:SEED_DB="true"; docker compose up -d --build
  ```
- **Windows Command Prompt (cmd.exe):**
  ```cmd
  set SEED_DB=true && docker compose up -d --build
  ```

**Subsequent Runs (data preserved in Docker volume):**
```bash
docker compose up -d
# or using npm:
npm run docker:up
```

#### 2. Verify Startup & Access the Application

Check the status and logs to ensure the database migrations and server initialization succeeded:
```bash
# Check container status
docker compose ps

# View application logs (press Ctrl+C to exit)
docker compose logs -f app
```

Once running, navigate to:
- **Web Application**: [http://localhost:3000](http://localhost:3000)
- **API Swagger Documentation**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **PostgreSQL Database**: Accessible on `localhost:5432` (`user: vetclinic`, `password: vetclinic`, `database: vetclinic`)

#### 3. Common Docker Operations

| Task | Command | npm Shortcut |
| :--- | :--- | :--- |
| **Start stack** | `docker compose up -d` | `npm run docker:up` |
| **Stop stack** (preserves data) | `docker compose stop` or `docker compose down` | `npm run docker:down` |
| **View logs** | `docker compose logs -f app` | — |
| **Rebuild after code changes** | `docker compose up -d --build` | `npm run docker:build` |
| **Reset everything** (wipe database & re-seed) | `docker compose down -v && docker compose up -d --build` | `npm run docker:reset` |

### Option 2: Local Development (Without Docker)

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Database Setup

The project uses PostgreSQL. Ensure you have a PostgreSQL instance running.

```bash
# Copy the example environment file and configure your database connection
cp .env.example .env
# Edit .env with your PostgreSQL connection string

# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# (Optional) Seed the database with sample data
npm run db:seed
```

#### 3. Running the Application

You can start both the backend and frontend simultaneously, or individually.

##### Simultaneous Start

```bash
npm start
```

##### Individual Start

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
| **Clients / Clients**  | ![Light](docs/screenshots/clients_light.png)       | ![Dark](docs/screenshots/clients_dark.png)       |
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

### Patient Management Dialogs (Add Record)

Standardized modals for adding records across all patient sub-sections.

| Section             | Light Mode                                                   | Dark Mode                                                    |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Medical History** | ![Light](docs/screenshots/patient_history_add_light.png)     | ![Dark](docs/screenshots/patient_history_add_dark.png)       |
| **Vaccinations**    | ![Light](docs/screenshots/patient_vaccinations_add_light.png)| ![Dark](docs/screenshots/patient_vaccinations_add_dark.png)  |
| **Prescriptions**   | ![Light](docs/screenshots/patient_prescriptions_add_light.png)| ![Dark](docs/screenshots/patient_prescriptions_add_dark.png)|
| **Appointments**    | ![Light](docs/screenshots/patient_appointments_add_light.png)| ![Dark](docs/screenshots/patient_appointments_add_dark.png)  |
| **Boarding**        | ![Light](docs/screenshots/patient_boarding_add_light.png)    | ![Dark](docs/screenshots/patient_boarding_add_dark.png)      |
| **Tasks**           | ![Light](docs/screenshots/patient_tasks_add_light.png)       | ![Dark](docs/screenshots/patient_tasks_add_dark.png)         |
| **Estimates**       | ![Light](docs/screenshots/patient_estimates_add_light.png)   | ![Dark](docs/screenshots/patient_estimates_add_dark.png)     |
| **Forms**           | ![Light](docs/screenshots/patient_forms_add_light.png)       | ![Dark](docs/screenshots/patient_forms_add_dark.png)         |
| **Invoices**        | ![Light](docs/screenshots/patient_invoices_add_light.png)    | ![Dark](docs/screenshots/patient_invoices_add_dark.png)      |
| **Labs**            | ![Light](docs/screenshots/patient_labs_add_light.png)        | ![Dark](docs/screenshots/patient_labs_add_dark.png)          |
| **Reminders**       | ![Light](docs/screenshots/patient_reminders_add_light.png)   | ![Dark](docs/screenshots/patient_reminders_add_dark.png)     |

### Patient Management Dialogs (Print / Report)

Standardized modals for generating reports and printing.

| Section             | Light Mode                                                     | Dark Mode                                                      |
| ------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| **Medical History** | ![Light](docs/screenshots/patient_history_print_light.png)     | ![Dark](docs/screenshots/patient_history_print_dark.png)       |
| **Vaccinations**    | ![Light](docs/screenshots/patient_vaccinations_print_light.png)| ![Dark](docs/screenshots/patient_vaccinations_print_dark.png)  |
| **Prescriptions**   | ![Light](docs/screenshots/patient_prescriptions_print_light.png)| ![Dark](docs/screenshots/patient_prescriptions_print_dark.png)|
| **Appointments**    | ![Light](docs/screenshots/patient_appointments_print_light.png)| ![Dark](docs/screenshots/patient_appointments_print_dark.png)  |
| **Boarding**        | ![Light](docs/screenshots/patient_boarding_print_light.png)    | ![Dark](docs/screenshots/patient_boarding_print_dark.png)      |
| **Tasks**           | ![Light](docs/screenshots/patient_tasks_print_light.png)       | ![Dark](docs/screenshots/patient_tasks_print_dark.png)         |
| **Estimates**       | ![Light](docs/screenshots/patient_estimates_print_light.png)   | ![Dark](docs/screenshots/patient_estimates_print_dark.png)     |
| **Forms**           | ![Light](docs/screenshots/patient_forms_print_light.png)       | ![Dark](docs/screenshots/patient_forms_print_dark.png)         |
| **Invoices**        | ![Light](docs/screenshots/patient_invoices_print_light.png)    | ![Dark](docs/screenshots/patient_invoices_print_dark.png)      |
| **Labs**            | ![Light](docs/screenshots/patient_labs_print_light.png)        | ![Dark](docs/screenshots/patient_labs_print_dark.png)          |
| **Reminders**       | ![Light](docs/screenshots/patient_reminders_print_light.png)   | ![Dark](docs/screenshots/patient_reminders_print_dark.png)     |

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

### Client Management Dialogs (Add Record)

| Section             | Light Mode                                                 | Dark Mode                                                |
| ------------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| **Patients**        | ![Light](docs/screenshots/client_patients_add_light.png)   | ![Dark](docs/screenshots/client_patients_add_dark.png)   |
| **Financial**       | ![Light](docs/screenshots/client_financial_add_light.png)  | ![Dark](docs/screenshots/client_financial_add_dark.png)  |
| **Appointments**    | ![Light](docs/screenshots/client_appointments_add_light.png)| ![Dark](docs/screenshots/client_appointments_add_dark.png)|
| **Boarding**        | ![Light](docs/screenshots/client_boarding_add_light.png)   | ![Dark](docs/screenshots/client_boarding_add_dark.png)   |
| **Tasks**           | ![Light](docs/screenshots/client_tasks_add_light.png)      | ![Dark](docs/screenshots/client_tasks_add_dark.png)      |
| **Reminders**       | ![Light](docs/screenshots/client_reminders_add_light.png)  | ![Dark](docs/screenshots/client_reminders_add_dark.png)  |
| **Forms**           | ![Light](docs/screenshots/client_forms_add_light.png)      | ![Dark](docs/screenshots/client_forms_add_dark.png)      |
| **Messaging**       | ![Light](docs/screenshots/client_messaging_add_light.png)  | ![Dark](docs/screenshots/client_messaging_add_dark.png)  |

## Authentication & Role-Based Access Control

The application uses **JWT-based authentication** with role-based access control (RBAC). All API endpoints are secured and require a valid JWT token. The Angular frontend handles login, token storage, and automatic token injection via an HTTP interceptor.

### Login Page

| Login Screen | Quick-Fill Role Selection |
| ------------ | ------------------------- |
| ![Login Page](docs/screenshots/auth_login_page.png) | ![Login Filled](docs/screenshots/auth_login_filled.png) |

### Authenticated Dashboard

| Full App Layout (Admin view with Settings) | Toolbar with User Info |
| ------------------------------------------ | ---------------------- |
| ![App Layout](docs/screenshots/auth_app_layout.png) | ![Dashboard Toolbar](docs/screenshots/auth_dashboard_toolbar.png) |

### User Roles

| Role | Label | Permissions |
| :--- | :---- | :---------- |
| `OFFICE_ADMIN` | Office Admin | Full access: all data, clinic settings, user management |
| `DOCTOR` | Veterinarian | Clinical data: patients, appointments, medical history |
| `TECH` | Vet Technician | Patient data read/write; no settings access |
| `CLIENT` | Client | Client portal access (future feature) |

### Development Test Accounts

All accounts use password: **`Password123!`**

| Role | Email |
| :--- | :---- |
| Office Admin | `admin@springfieldvet.com` |
| Veterinarian | `dr.smith@springfieldvet.com` |
| Veterinarian | `dr.johnson@springfieldvet.com` |
| Vet Technician | `tech@springfieldvet.com` |
| Client | `sarah.johnson@email.com` |

> **Note:** The login page includes **Quick-Fill buttons** for each role to simplify local development and testing.

### API Authentication (Swagger)

The Swagger UI at `/api-docs` supports full JWT authentication:

1. Call `POST /api/auth/login` with your email and password.
2. Copy the `access_token` from the response.
3. Click the **Authorize 🔓** button in Swagger and paste the token.
4. All subsequent Swagger requests will include `Authorization: Bearer <token>`.

```bash
# Example login request
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@springfieldvet.com", "password": "Password123!"}'
```

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
- `docker`: Docker entrypoint and related scripts.

## Technical Details

- **Frontend**: Angular + Angular Material. Responsive design for mobile, tablet, and desktop.
- **Backend**: NestJS for a structured, scalable API.
- **Database**: Prisma ORM with PostgreSQL.
- **Authentication**: Passport.js + JWT (RS256). Dual token extraction supports both HttpOnly cookies (browser) and `Authorization: Bearer` headers (Swagger / REST clients). Passwords hashed with bcrypt (12 rounds).
- **Authorization**: Custom `RolesGuard` with `@Roles()` decorator enforces role-based access on all API controllers. Angular `authGuard` and `roleGuard` protect frontend routes.
- **Deployment**: Fully containerized with Docker Compose (PostgreSQL + App in a single `docker compose up`).
