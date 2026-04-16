import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LiveAnnouncer } from '@angular/cdk/a11y';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To Do' | 'In Progress' | 'Completed';
  dueDate: string;
  assignedTo: string;
}

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSortModule,
  ],
  template: `
    <mat-toolbar class="bg-surface-variant border-b border-outline h-18! px-6">
      <div class="flex gap-3 w-full md:w-auto grow items-center">
        <div class="bg-surface-variant border border-outline p-2 rounded-lg" aria-hidden="true">
          <mat-icon class="text-on-surface">assignment</mat-icon>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-on-surface m-0">
            Tasks & Reminders
          </h1>
          <p class="text-on-surface-variant text-sm opacity-80 hidden sm:block">
            Track clinic operations and patient follow-ups
          </p>
        </div>
      </div>
      <div class="flex gap-3 w-full md:w-auto items-center">
        <mat-form-field
          appearance="outline"
          class="flex-1 md:w-64"
          subscriptSizing="dynamic"
        >
          <mat-label>Filter tasks</mat-label>
          <input
            matInput
            (keyup)="applyFilter($event)"
            placeholder="Filter tasks..."
            aria-label="Filter tasks by keyword"
            #input
          />
          <mat-icon matSuffix aria-hidden="true">search</mat-icon>
        </mat-form-field>
        <button
          mat-stroked-button
          color="primary"
          (click)="showAddForm = !showAddForm"
          [aria-label]="showAddForm ? 'Cancel adding task' : 'Add new task'"
        >
          <mat-icon class="mr-1" aria-hidden="true">{{
            showAddForm ? 'close' : 'add'
          }}</mat-icon>
          <span class="hidden sm:inline">{{ showAddForm ? 'Cancel' : 'New Task' }}</span>
        </button>
      </div>
    </mat-toolbar>
    <!-- Quick Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      <mat-card
        class="p-4 bg-surface shadow-none border border-outline border-t-4 border-t-amber-500"
        role="article"
        [attr.aria-label]="'Total tasks: ' + tasks.length"
      >
        <p
          class="text-xs font-bold text-on-surface-variant opacity-60 uppercase tracking-wider mb-1"
          aria-hidden="true"
        >
          Total Tasks
        </p>
        <h4 class="text-2xl font-bold text-on-surface" aria-hidden="true">{{ tasks.length }}</h4>
      </mat-card>
      <mat-card
        class="p-4 bg-surface shadow-none border border-outline border-t-4 border-t-blue-500"
        role="article"
        [attr.aria-label]="'In progress: ' + getCountByStatus('In Progress')"
      >
        <p
          class="text-xs font-bold text-on-surface-variant opacity-60 uppercase tracking-wider mb-1"
          aria-hidden="true"
        >
          In Progress
        </p>
        <h4 class="text-2xl font-bold text-on-surface" aria-hidden="true">
          {{ getCountByStatus('In Progress') }}
        </h4>
      </mat-card>
      <mat-card
        class="p-4 bg-surface shadow-none border border-outline border-t-4 border-t-emerald-500"
        role="article"
        [attr.aria-label]="'Completed: ' + getCountByStatus('Completed')"
      >
        <p
          class="text-xs font-bold text-on-surface-variant opacity-60 uppercase tracking-wider mb-1"
          aria-hidden="true"
        >
          Completed
        </p>
        <h4 class="text-2xl font-bold text-on-surface" aria-hidden="true">
          {{ getCountByStatus('Completed') }}
        </h4>
      </mat-card>
      <mat-card
        class="p-4 bg-surface shadow-none border border-outline border-t-4 border-t-rose-500"
        role="article"
        [attr.aria-label]="'High priority: ' + getCountByPriority('High')"
      >
        <p
          class="text-xs font-bold text-on-surface-variant opacity-60 uppercase tracking-wider mb-1"
          aria-hidden="true"
        >
          High Priority
        </p>
        <h4 class="text-2xl font-bold text-on-surface" aria-hidden="true">
          {{ getCountByPriority('High') }}
        </h4>
      </mat-card>
    </div>

    <!-- Add/Edit Form Area -->
    @if (showAddForm || editingTask) {
      <mat-card class="mb-8 overflow-hidden border border-outline shadow-lg">
        <div
          class="p-4 bg-surface-variant border-b border-outline flex justify-between items-center"
        >
          <h3
            class="text-sm font-bold text-on-surface m-0 uppercase tracking-wider"
          >
            {{ editingTask ? 'Edit Task' : 'Create New Task' }}
          </h3>
          <button
            mat-icon-button
            (click)="cancelEdit()"
            aria-label="Close form"
            size="small"
          >
            <mat-icon class="text-xs" aria-hidden="true">close</mat-icon>
          </button>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <mat-form-field appearance="outline" class="md:col-span-2">
            <mat-label>Task Title</mat-label>
            <input
              matInput
              [(ngModel)]="currentTask.title"
              placeholder="What needs to be done?"
              aria-label="Task title"
              <mat-option value="Medium">Medium</mat-option>
              <mat-option value="High">High</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="md:col-span-2">
            <mat-label>Description</mat-label>
            <textarea
              matInput
              [(ngModel)]="currentTask.description"
              rows="2"
              placeholder="Provide some context..."
            ></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Status</mat-label>
            <mat-select [(ngModel)]="currentTask.status">
              <mat-option value="To Do">To Do</mat-option>
              <mat-option value="In Progress">In Progress</mat-option>
              <mat-option value="Completed">Completed</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Due Date</mat-label>
            <input
              matInput
              type="date"
              [(ngModel)]="currentTask.dueDate"
              aria-label="Due date for task"
            />
          </mat-form-field>

          <div class="md:col-span-3 md:col-start-1 flex justify-end gap-3 mt-2">
            <button mat-button (click)="cancelEdit()" aria-label="Cancel and close form">Cancel</button>
            <button mat-raised-button color="primary" (click)="saveTask()" [attr.aria-label]="editingTask ? 'Update task' : 'Save new task'">
              <mat-icon class="mr-1" aria-hidden="true">save</mat-icon>
              {{ editingTask ? 'Update Task' : 'Save Task' }}
            </button>
          </div>
        </div>
      </mat-card>
    }

    <!-- Task Table -->
    <div
      class="mat-elevation-z1 rounded-lg overflow-hidden border border-outline mt-6 bg-surface"
    >
      <table
        mat-table
        [dataSource]="tasks"
        class="w-full"
        matSort
        (matSortChange)="announceSortChange($event)"
      >
        <ng-container matColumnDef="select">
          <th
            mat-header-cell
            *matHeaderCellDef
            class="w-12 bg-surface-variant"
          ></th>
          <td mat-cell *matCellDef="let task">
            <mat-checkbox
              [checked]="task.status === 'Completed'"
              (change)="toggleStatus(task)"
              color="primary"
              [aria-label]="'Mark task ' + task.title + ' as completed'"
            ></mat-checkbox>
          </td>
        </ng-container>

        <ng-container matColumnDef="title">
          <th
            mat-header-cell
            *matHeaderCellDef
            class="bg-surface-variant text-on-surface-variant font-bold uppercase text-xs tracking-wider"
            mat-sort-header
            sortActionDescription="Sort by task details"
          >
            Task Details
          </th>
          <td mat-cell *matCellDef="let task">
            <div class="py-3">
              <p
                class="font-bold text-on-surface m-0"
                [class.line-through]="task.status === 'Completed'"
                [class.text-on-surface-variant]="task.status === 'Completed'"
                [class.opacity-50]="task.status === 'Completed'"
              >
                {{ task.title }}
              </p>
              <p class="text-xs text-on-surface-variant m-0 truncate max-w-xs">
                {{ task.description }}
              </p>
            </div>
          </td>
        </ng-container>

        <ng-container matColumnDef="priority">
          <th
            mat-header-cell
            *matHeaderCellDef
            class="bg-surface-variant text-on-surface-variant font-bold uppercase text-xs tracking-wider hidden sm:table-cell"
            mat-sort-header
            sortActionDescription="Sort by task priority"
          >
            Priority
          </th>
          <td mat-cell *matCellDef="let task" class="hidden sm:table-cell">
            <span
              [ngClass]="{
                'bg-rose-100 text-rose-700': task.priority === 'High',
                'bg-blue-100 text-blue-700': task.priority === 'Medium',
                'bg-surface-variant text-on-surface-variant':
                  task.priority === 'Low',
              }"
              class="px-2 py-0.5 rounded text-xs font-bold uppercase"
            >
              {{ task.priority }}
            </span>
          </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th
            mat-header-cell
            *matHeaderCellDef
            class="bg-surface-variant text-on-surface-variant font-bold uppercase text-xs tracking-wider"
            mat-sort-header
            sortActionDescription="Sort by task status"
          >
            Status
          </th>
          <td mat-cell *matCellDef="let task">
            <div class="flex items-center gap-2">
              <div
                class="w-2 h-2 rounded-full"
                aria-hidden="true"
                [ngClass]="{
                  'bg-emerald-500': task.status === 'Completed',
                  'bg-blue-500': task.status === 'In Progress',
                  'bg-amber-500': task.status === 'To Do',
                }"
              ></div>
              <span class="text-xs font-medium text-on-surface-variant">{{
                task.status
              }}</span>
            </div>
          </td>
        </ng-container>

        <ng-container matColumnDef="dueDate">
          <th
            mat-header-cell
            *matHeaderCellDef
            class="bg-surface-variant text-on-surface-variant font-bold uppercase text-xs tracking-wider hidden sm:table-cell"
            mat-sort-header
            sortActionDescription="Sort by due date"
          >
            Due Date
          </th>
          <td
            mat-cell
            *matCellDef="let task"
            class="text-xs text-on-surface-variant hidden sm:table-cell"
          >
            {{ task.dueDate }}
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th
            mat-header-cell
            *matHeaderCellDef
            class="w-32 bg-surface-variant"
          ></th>
          <td mat-cell *matCellDef="let task" class="text-right">
            <button
              mat-icon-button
              color="primary"
              (click)="editTask(task)"
              matTooltip="Edit Task"
              [aria-label]="'Edit task: ' + task.title"
            >
              <mat-icon aria-hidden="true">edit</mat-icon>
            </button>
            <button
              mat-icon-button
              color="warn"
              (click)="deleteTask(task.id)"
              matTooltip="Delete Task"
              [aria-label]="'Delete task: ' + task.title"
            >
              <mat-icon aria-hidden="true">delete_outline</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: displayedColumns"
          class="hover:bg-surface-variant transition-colors"
        ></tr>
      </table>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
      .mat-toolbar {
        padding: 0;
      }
      table {
        background: transparent !important;
      }
      .mat-mdc-row:last-child {
        border-bottom: none;
      }
    `,
  ],
})
export class TasksPageComponent {
  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = [
    'select',
    'title',
    'priority',
    'status',
    'dueDate',
    'actions',
  ];
  showAddForm = false;
  editingTask = false;

  tasks: Task[] = [
    {
      id: '1',
      title: 'Restock surgical supplies',
      description:
        'Need to order more scalpels, sutures, and gauze for the upcoming week.',
      priority: 'High',
      status: 'To Do',
      dueDate: '2024-02-12',
      assignedTo: 'Dr. Sarah Smith',
    },
    {
      id: '2',
      title: 'Patient follow-up: Buster',
      description:
        'Call the Client of Buster (Labrador) to check on his wound healing after the ear cleaning.',
      priority: 'Medium',
      status: 'In Progress',
      dueDate: '2024-02-10',
      assignedTo: 'Assistant Mark',
    },
    {
      id: '3',
      title: 'Verify vaccine batches',
      description:
        'Enter the new batch numbers for the Rabies vaccines into the system.',
      priority: 'Low',
      status: 'Completed',
      dueDate: '2024-02-08',
      assignedTo: 'Receptionist Jane',
    },
    {
      id: '4',
      title: 'Calibrate anesthesia machine',
      description: 'Routine monthly calibration for Machine-04 in Prep Room.',
      priority: 'High',
      status: 'To Do',
      dueDate: '2024-02-15',
      assignedTo: 'Dr. Sarah Smith',
    },
  ];

  currentTask: Partial<Task> = this.getEmptyTask();

  @ViewChild(MatSort) sort!: MatSort;



  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEmptyTask(): Partial<Task> {
    return {
      title: '',
      description: '',
      priority: 'Medium',
      status: 'To Do',
      dueDate: new Date().toISOString().split('T')[0],
    };
  }

  getCountByStatus(status: string): number {
    return this.tasks.filter((t) => t.status === status).length;
  }

  getCountByPriority(priority: string): number {
    return this.tasks.filter((t) => t.priority === priority).length;
  }

  toggleStatus(task: Task): void {
    task.status = task.status === 'Completed' ? 'To Do' : 'Completed';
  }

  saveTask(): void {
    if (!this.currentTask.title) return;

    if (this.editingTask && this.currentTask.id) {
      const index = this.tasks.findIndex((t) => t.id === this.currentTask.id);
      if (index !== -1) {
        this.tasks[index] = {
          ...this.tasks[index],
          ...(this.currentTask as Task),
        };
      }
    } else {
      const newTask: Task = {
        ...(this.currentTask as Task),
        id: Math.random().toString(36).substring(2, 9),
      };
      this.tasks = [newTask, ...this.tasks];
    }
    this.cancelEdit();
  }

  editTask(task: Task): void {
    this.editingTask = true;
    this.showAddForm = false;
    this.currentTask = { ...task };
  }

  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    }
  }

  cancelEdit(): void {
    this.editingTask = false;
    this.showAddForm = false;
    this.currentTask = this.getEmptyTask();
  }
}
