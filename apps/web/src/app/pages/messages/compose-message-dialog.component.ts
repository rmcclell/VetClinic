import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ClientsService } from '../../services/clients.service';
import { Client } from '@vet-clinic/shared-types';

@Component({
  selector: 'app-compose-message-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  template: `
    <div class="flex flex-col h-full max-h-[90vh]">
      <h1 mat-dialog-title class="flex items-center gap-3 m-0 py-6 px-8 border-b bg-surface">
        <div class="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
          <mat-icon aria-hidden="true">edit_square</mat-icon>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold tracking-tight">Compose Message</span>
          <span class="text-xs text-on-surface-variant font-medium">Send a new message to a client</span>
        </div>
      </h1>

      <div mat-dialog-content class="p-8 pt-6 overflow-x-hidden">
        <form [formGroup]="messageForm" class="flex flex-col gap-5">
          
          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>To (Client)</mat-label>
            <mat-icon matPrefix class="mr-2 opacity-40">person</mat-icon>
            <mat-select formControlName="clientId">
              @for (client of clients; track client.id) {
                <mat-option [value]="client.id">
                  {{ client.firstName }} {{ client.lastName }} 
                  <span class="text-xs text-on-surface-variant ml-2 opacity-70">{{ client.email || 'No email' }}</span>
                </mat-option>
              }
            </mat-select>
            @if (messageForm.get('clientId')?.hasError('required')) {
              <mat-error>Please select a recipient</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Subject</mat-label>
            <input matInput formControlName="subject" placeholder="e.g. Appointment Reminder" />
            @if (messageForm.get('subject')?.hasError('required')) {
              <mat-error>Subject is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic" class="flex-1">
            <mat-label>Message</mat-label>
            <textarea matInput formControlName="body" rows="8" placeholder="Type your message here..."></textarea>
            @if (messageForm.get('body')?.hasError('required')) {
              <mat-error>Message body cannot be empty</mat-error>
            }
          </mat-form-field>

          <!-- Attachments Mock Section -->
          <div class="flex items-center gap-3 text-sm text-on-surface-variant">
            <button mat-stroked-button type="button" class="rounded-lg h-9">
              <mat-icon class="text-base" aria-hidden="true">attach_file</mat-icon> Attach File
            </button>
            <button mat-stroked-button type="button" class="rounded-lg h-9">
              <mat-icon class="text-base" aria-hidden="true">image</mat-icon> Add Image
            </button>
            <span class="opacity-60 text-xs italic ml-auto">Max size 25MB</span>
          </div>
          
        </form>
      </div>

      <div mat-dialog-actions class="justify-end px-8 py-6 bg-surface-variant/30 border-t border-outline gap-3">
        <button mat-button (click)="onCancel()" class="px-6 rounded-xl font-bold">Discard</button>
        <button
          mat-flat-button
          color="primary"
          [disabled]="messageForm.invalid"
          (click)="onSend()"
          class="px-8 rounded-xl font-bold shadow-lg"
        >
          Send <mat-icon class="ml-2 text-sm">send</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .mat-mdc-dialog-content {
      max-height: none !important;
    }
  `]
})
export class ComposeMessageDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clientsService = inject(ClientsService);
  private dialogRef = inject(MatDialogRef<ComposeMessageDialogComponent>);

  messageForm: FormGroup;
  clients: Client[] = [];

  constructor() {
    this.messageForm = this.fb.group({
      clientId: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.clientsService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => console.error('Error loading clients', err)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSend(): void {
    if (this.messageForm.valid) {
      // In a real app, this would call a messages service
      // For now, we'll just close the dialog and return the formulated message
      this.dialogRef.close(this.messageForm.value);
    }
  }
}
