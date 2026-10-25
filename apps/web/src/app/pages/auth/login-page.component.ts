import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../services/config.service';

interface DemoUser {
  label: string;
  role: string;
  badgeColor: string;
  email: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4">
      <div class="w-full max-w-md bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-800 p-8 sm:p-10 transition-all">
        <!-- Logo & Header -->
        <div class="flex flex-col items-center mb-8 text-center">
          <div class="w-16 h-16 rounded-2xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center mb-4 shadow-inner">
            <mat-icon class="!w-10 !h-10 !text-[40px] leading-none">pets</mat-icon>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {{ configService.clinicName() }}
          </h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Sign in to access your clinic portal
          </p>
        </div>

        <!-- Error Alert -->
        @if (errorMessage()) {
          <div class="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-600 dark:text-rose-400 text-sm animate-shake">
            <mat-icon class="text-rose-500">error</mat-icon>
            <span>{{ errorMessage() }}</span>
          </div>
        }

        <!-- Login Form -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Email address</mat-label>
            <input
              matInput
              type="email"
              formControlName="email"
              placeholder="e.g. dr.smith@springfieldvet.com"
              autocomplete="email"
            />
            <mat-icon matPrefix class="mr-2 text-slate-400">mail</mat-icon>
            @if (loginForm.get('email')?.hasError('required') && loginForm.get('email')?.touched) {
              <mat-error>Email is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Password</mat-label>
            <input
              matInput
              [type]="hidePassword() ? 'password' : 'text'"
              formControlName="password"
              placeholder="••••••••"
              autocomplete="current-password"
            />
            <mat-icon matPrefix class="mr-2 text-slate-400">lock</mat-icon>
            <button
              mat-icon-button
              matSuffix
              type="button"
              (click)="hidePassword.set(!hidePassword())"
              [attr.aria-label]="'Hide password'"
            >
              <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
          </mat-form-field>

          <button
            mat-flat-button
            color="primary"
            type="submit"
            [disabled]="loginForm.invalid || isLoading()"
            class="!py-6 !rounded-xl !text-base font-semibold !mt-2 shadow-lg shadow-indigo-500/25 transition-all"
          >
            @if (isLoading()) {
              <div class="flex items-center justify-center gap-2">
                <mat-spinner diameter="20"></mat-spinner>
                <span>Signing in...</span>
              </div>
            } @else {
              <span>Sign In</span>
            }
          </button>
        </form>

        <!-- Quick-Fill Demo Roles for Local Testing -->
        <div class="mt-8">
          <div class="relative flex py-2 items-center">
            <div class="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span class="flex-shrink mx-4 text-xs font-medium uppercase tracking-wider text-slate-400">
              Quick Test Roles
            </span>
            <div class="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          <div class="grid grid-cols-2 gap-2.5 mt-3">
            @for (demo of demoUsers; track demo.role) {
              <button
                type="button"
                (click)="quickFill(demo.email)"
                class="flex flex-col items-start p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-left transition-all group"
              >
                <div class="flex items-center gap-1.5 w-full">
                  <mat-icon class="!w-4 !h-4 !text-[16px] text-slate-400 group-hover:text-indigo-500">{{ demo.icon }}</mat-icon>
                  <span class="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                    {{ demo.label }}
                  </span>
                </div>
                <span class="text-[10px] text-slate-400 mt-0.5 truncate w-full">
                  {{ demo.description }}
                </span>
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-4px); }
        40%, 80% { transform: translateX(4px); }
      }
      .animate-shake {
        animation: shake 0.4s ease-in-out;
      }
    `,
  ],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  public configService = inject(ConfigService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  hidePassword = signal(true);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm: FormGroup = this.fb.group({
    email: ['dr.smith@springfieldvet.com', [Validators.required, Validators.email]],
    password: ['Password123!', [Validators.required]],
  });

  demoUsers: DemoUser[] = [
    {
      label: 'Doctor',
      role: 'DOCTOR',
      badgeColor: 'bg-emerald-500',
      email: 'dr.smith@springfieldvet.com',
      icon: 'medical_services',
      description: 'Dr. Emily Smith',
    },
    {
      label: 'Office Admin',
      role: 'OFFICE_ADMIN',
      badgeColor: 'bg-indigo-500',
      email: 'admin@springfieldvet.com',
      icon: 'admin_panel_settings',
      description: 'Practice Manager',
    },
    {
      label: 'Vet Tech',
      role: 'TECH',
      badgeColor: 'bg-amber-500',
      email: 'tech@springfieldvet.com',
      icon: 'healing',
      description: 'Alex Taylor',
    },
    {
      label: 'Client',
      role: 'CLIENT',
      badgeColor: 'bg-sky-500',
      email: 'sarah.johnson@email.com',
      icon: 'person',
      description: 'Sarah Johnson',
    },
  ];

  quickFill(email: string) {
    this.loginForm.patchValue({
      email,
      password: 'Password123!',
    });
    this.errorMessage.set(null);
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading.set(false);
        const returnUrl =
          this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Invalid email or password. Please try again.',
        );
      },
    });
  }
}
