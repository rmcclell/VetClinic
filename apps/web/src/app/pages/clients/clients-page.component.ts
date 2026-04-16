import {
  Component,
  OnInit,
  inject,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { Client } from '@vet-clinic/shared-types';
import { ClientDialogComponent } from './client-dialog.component';

@Component({
  selector: 'app-clients-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule
],
  template: `
    <mat-toolbar class="bg-surface-variant border-b border-outline h-18! px-6">
      <div class="flex gap-3 w-full md:w-auto grow items-center">
        <div class="bg-surface-variant border border-outline p-2 rounded-lg" aria-hidden="true">
          <mat-icon class="text-on-surface">people</mat-icon>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-on-surface m-0">
            Client Directory
          </h1>
          <p class="text-on-surface-variant text-sm opacity-80 hidden sm:block">
            Manage client information
          </p>
        </div>
      </div>
      <div class="flex gap-3 w-full md:w-auto items-center">
        <mat-form-field
          appearance="outline"
          class="flex-1 md:w-64"
          subscriptSizing="dynamic"
        >
          <mat-label>Filter clients</mat-label>
          <input
            matInput
            (keyup)="applyFilter($event)"
            placeholder="Search by name, email, or phone..."
            aria-label="Filter clients by name, email, or phone"
            #input
          />
          <mat-icon matSuffix aria-hidden="true">search</mat-icon>
        </mat-form-field>
        <button
          mat-raised-button
          color="primary"
          (click)="addOwner()"
          class="h-10"
          aria-label="Add client"
        >
          <mat-icon aria-hidden="true">add</mat-icon>
          <span class="hidden sm:inline ml-1">Add Client</span>
        </button>
      </div>
    </mat-toolbar>
    <div
      class="mat-elevation-z1 rounded-lg overflow-hidden border border-outline mt-6"
    >
      @if (dataSource.data.length > 0) {
        <table mat-table [dataSource]="dataSource" matSort class="w-full">
          <ng-container matColumnDef="name">
            <th
              mat-header-cell
              *matHeaderCellDef
              mat-sort-header
              class="bg-surface-variant text-on-surface-variant font-bold"
            >
              Name
            </th>
            <td mat-cell *matCellDef="let client" class="font-medium">
              {{ client.firstName }} {{ client.lastName }}
            </td>
          </ng-container>

          <ng-container matColumnDef="contact">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-surface-variant text-on-surface-variant font-bold"
            >
              Contact Info
            </th>
            <td mat-cell *matCellDef="let client">
              <div class="flex flex-col text-sm py-2">
                @if (client.email) {
                  <span class="flex items-center gap-1">
                    <mat-icon class="text-xs w-4 h-4 opacity-60" aria-hidden="true">email</mat-icon>
                    {{ client.email }}
                  </span>
                }
                @if (client.phone) {
                  <span class="flex items-center gap-1">
                    <mat-icon class="text-xs w-4 h-4 opacity-60" aria-hidden="true">phone</mat-icon>
                    {{ client.phone }}
                  </span>
                }
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="address">
            <th
              mat-header-cell
              *matHeaderCellDef
              mat-sort-header
              class="bg-surface-variant text-on-surface-variant font-bold hidden md:table-cell"
            >
              Address
            </th>
            <td
              mat-cell
              *matCellDef="let client"
              class="hidden md:table-cell max-w-xs truncate"
              [matTooltip]="client.address || ''"
            >
              {{ client.address || '-' }}
            </td>
          </ng-container>

          <ng-container matColumnDef="emergency">
            <th
              mat-header-cell
              *matHeaderCellDef
              class="bg-surface-variant text-on-surface-variant font-bold hidden lg:table-cell"
            >
              Emergency Contact
            </th>
            <td mat-cell *matCellDef="let client" class="hidden lg:table-cell">
              @if (client.emergencyContactName) {
                <div class="flex flex-col text-sm">
                  <span class="font-medium text-xs opacity-80">{{
                    client.emergencyContactName
                  }}</span>
                  <span class="text-xs opacity-60">{{
                    client.emergencyContactPhone
                  }}</span>
                </div>
              } @else {
                <span>-</span>
              }
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef aria-label="row actions">
              &nbsp;
            </th>
            <td mat-cell *matCellDef="let client">
              <div class="flex justify-end gap-1 px-2">
                <button
                  mat-icon-button
                  color="primary"
                  (click)="editOwner(client); $event.stopPropagation()"
                  matTooltip="Edit Client"
                  [attr.aria-label]="
                    'Edit client ' + client.firstName + ' ' + client.lastName
                  "
                >
                  <mat-icon aria-hidden="true">edit</mat-icon>
                </button>
                <button
                  mat-icon-button
                  color="warn"
                  (click)="deleteOwner(client); $event.stopPropagation()"
                  matTooltip="Delete Client"
                  [attr.aria-label]="
                    'Delete client ' + client.firstName + ' ' + client.lastName
                  "
                >
                  <mat-icon aria-hidden="true">delete</mat-icon>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr
            mat-row
            *matRowDef="let row; columns: displayedColumns"
            (click)="viewOwner(row)"
            (keydown.enter)="viewOwner(row)"
            tabindex="0"
            [attr.aria-label]="'View details for ' + row.firstName + ' ' + row.lastName"
            class="hover:bg-surface-variant transition-colors"
          ></tr>

          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell p-8 text-center" colspan="5">
              <div class="flex flex-col items-center gap-2 opacity-60">
                <mat-icon class="text-4xl w-12 h-12">search_off</mat-icon>
                <span>No clients matching "{{ input.value }}"</span>
              </div>
            </td>
          </tr>
        </table>
        <mat-paginator
          [pageSizeOptions]="[5, 10, 25, 100]"
          aria-label="Select page of clients"
        ></mat-paginator>
      } @else {
        <div
          class="flex flex-col items-center justify-center p-12 text-center opacity-60"
          role="status"
          aria-live="polite"
        >
          <mat-icon aria-hidden="true">group_off</mat-icon>
          <h3 class="text-lg font-medium m-0">No clients found</h3>
          <p class="text-sm mb-4">
            You haven't added any clients to the directory yet.
          </p>
          <button mat-stroked-button color="primary" (click)="addOwner()">
            <mat-icon>add</mat-icon> Add your first Client
          </button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .mat-toolbar {
        padding: 0;
      }
      table {
        width: 100%;
      }
      .mat-column-actions {
        width: 100px;
      }
      .mat-mdc-row:hover {
        cursor: pointer;
      }
    `,
  ],
})
export class ClientsPageComponent implements OnInit, AfterViewInit {
  private ClientsService = inject(ClientsService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  dataSource = new MatTableDataSource<Client>([]);
  displayedColumns: string[] = [
    'name',
    'contact',
    'address',
    'emergency',
    'actions',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    console.log('ClientsPageComponent: ngOnInit');
    this.loadClients();
  }

  ngAfterViewInit() {
    console.log('ClientsPageComponent: ngAfterViewInit');
    this.assignPaginatorAndSort();
  }

  private assignPaginatorAndSort() {
    if (this.sort) this.dataSource.sort = this.sort;
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  loadClients(): void {
    console.log('ClientsPageComponent: loading clients...');
    this.ClientsService.getClients().subscribe({
      next: (clients) => {
        console.log(`ClientsPageComponent: loaded ${clients.length} clients`);
        this.dataSource.data = clients;
        // Re-assign because they might have been inside an @if that just became true
        setTimeout(() => this.assignPaginatorAndSort());
      },
      error: (err) =>
        console.error('ClientsPageComponent: error loading clients', err),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addOwner(): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadClients();
      }
    });
  }

  viewOwner(Client: Client): void {
    this.router.navigate(['/clients', Client.id]);
  }

  editOwner(Client: Client): void {
    // Stop propagation so it doesn't also trigger the row click
    event?.stopPropagation();
    this.router.navigate(['/clients', Client.id, 'edit']);
  }

  deleteOwner(Client: Client): void {
    if (
      confirm(
        `Are you sure you want to delete ${Client.firstName} ${Client.lastName}? This will also delete their associated patients and visit history.`,
      )
    ) {
      this.ClientsService.deleteOwner(Client.id).subscribe(() => {
        this.loadClients();
      });
    }
  }
}
