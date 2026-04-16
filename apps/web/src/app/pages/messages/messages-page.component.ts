import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

interface Message {
  id: string;
  sender: string;
  subject: string;
  body: string;
  date: string;
  petName?: string;
  isRead: boolean;
  initials: string;
  color: string;
}

@Component({
  selector: 'app-messages-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatBadgeModule,
    MatToolbarModule,
    MatButtonToggleModule,
  ],
  template: `
    <mat-toolbar class="bg-surface-variant border-b border-outline h-18! px-6">
      <div class="flex gap-3 w-full md:w-auto grow items-center">
        <div class="bg-surface-variant border border-outline p-2 rounded-lg">
          <mat-icon class="text-on-surface">mail</mat-icon>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-on-surface m-0">Messages</h1>
          <p class="text-on-surface-variant text-sm opacity-80">
            Manage client messages
          </p>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="bg-primary text-on-primary text-xs font-bold px-2 py-0.5 rounded-full"
            >3 New</span
          >
          <mat-button-toggle-group
            name="message-folder"
            aria-label="Filter messages by folder"
            [hideSingleSelectionIndicator]="false"
          >
            <mat-button-toggle value="inbox">Inbox</mat-button-toggle>
            <mat-button-toggle value="outbox">Outbox</mat-button-toggle>
          </mat-button-toggle-group>
        </div>
      </div>
      <div class="flex gap-3 w-full md:w-auto items-center">
        <button
          mat-icon-button
          class="text-on-surface-variant"
          aria-label="Refresh messages"
        >
          <mat-icon aria-hidden="true">refresh</mat-icon>
        </button>
        <button
          mat-icon-button
          class="text-on-surface-variant"
          aria-label="Message settings"
        >
          <mat-icon aria-hidden="true">settings</mat-icon>
        </button>
        <button mat-raised-button color="primary" class="h-10">
          <mat-icon class="mr-2">edit</mat-icon> Compose
        </button>
      </div>
    </mat-toolbar>
    <div class="h-full flex flex-col mt-6">
      <div class="flex-1 flex overflow-hidden">
        <!-- Message List Sidebar -->
        @if (!selectedMessage || (isHandset$ | async) === false) {
          <div
            class="w-full md:w-80 lg:w-96 border-r border-outline bg-surface-variant flex flex-col"
          >
            <div class="p-3">
              <div class="relative">
                <mat-icon
                  class="absolute left-3 top-2.5 text-on-surface-variant opacity-60 text-sm"
                  aria-hidden="true"
                  >search</mat-icon
                >
                <input
                  type="text"
                  placeholder="Search messages..."
                  aria-label="Search messages in inbox"
                  class="w-full pl-9 pr-4 py-2 bg-surface border border-outline rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div class="flex-1 overflow-y-auto">
              <mat-nav-list class="pt-0">
                @for (msg of messages; track msg.id) {
                  <button
                    mat-list-item
                    (click)="selectedMessage = msg"
                    (keydown.enter)="selectedMessage = msg"
                    (keydown.space)="selectedMessage = msg"
                    [class.bg-surface]="selectedMessage?.id === msg.id"
                    [class.shadow-sm]="selectedMessage?.id === msg.id"
                    [class.border-l-4]="selectedMessage?.id === msg.id"
                    [class.border-primary]="selectedMessage?.id === msg.id"
                    class="mb-0.5 border-b border-outline last:border-b-0 h-auto py-3"
                  >
                    <div
                      matListItemAvatar
                      [style.backgroundColor]="msg.color"
                      class="flex items-center justify-center text-white font-bold rounded-full"
                    >
                      {{ msg.initials }}
                    </div>
                    <div
                      matListItemTitle
                      class="flex justify-between items-start"
                    >
                      <span
                        class="font-bold text-on-surface"
                        [class.font-semibold]="!msg.isRead"
                        >{{ msg.sender }}</span
                      >
                      <span
                        class="text-[10px] text-on-surface-variant font-normal uppercase"
                        >{{ msg.date }}</span
                      >
                    </div>
                    @if (msg.petName) {
                      <div
                        matListItemLine
                        class="text-indigo-600 font-medium text-xs mb-1"
                      >
                        Patient: {{ msg.petName }}
                      </div>
                    }
                    <div
                      matListItemLine
                      class="text-on-surface text-sm font-semibold truncate"
                    >
                      {{ msg.subject }}
                    </div>
                    <div
                      matListItemLine
                      class="text-on-surface-variant text-xs truncate"
                    >
                      {{ msg.body }}
                    </div>
                  </button>
                }
              </mat-nav-list>
            </div>
          </div>
        }

        <!-- Message View Area -->
        @if (selectedMessage || (isHandset$ | async) === false) {
          <div class="flex-1 bg-surface overflow-y-auto">
            @if (selectedMessage) {
              <div class="p-8">
                <div class="flex justify-between items-start mb-8">
                  <div>
                    <h2 class="text-2xl font-bold text-on-surface mb-2">
                      {{ selectedMessage.subject }}
                    </h2>
                    <div class="flex items-center gap-3">
                      <div
                        [style.backgroundColor]="selectedMessage.color"
                        class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      >
                        {{ selectedMessage.initials }}
                      </div>
                      <div>
                        <p class="font-bold text-on-surface m-0">
                          {{ selectedMessage.sender }}
                        </p>
                        <p class="text-xs text-on-surface-variant m-0">
                          to: Springfield Vet Clinic
                          &lt;contact&#64;springfieldvet.com&gt;
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-on-surface-variant font-medium mb-3">
                      {{ selectedMessage.date }}
                    </p>
                    <div class="flex gap-1 justify-end">
                      <button
                        mat-icon-button
                        class="text-on-surface-variant"
                        aria-label="Star message"
                      >
                        <mat-icon aria-hidden="true">star_border</mat-icon>
                      </button>
                      <button
                        mat-icon-button
                        (click)="selectedMessage = null"
                        class="text-on-surface-variant md:hidden"
                        aria-label="Back to list"
                      >
                        <mat-icon aria-hidden="true">arrow_back</mat-icon>
                      </button>
                      <button
                        mat-icon-button
                        class="text-on-surface-variant"
                        aria-label="Reply to message"
                      >
                        <mat-icon aria-hidden="true">reply</mat-icon>
                      </button>
                      <button
                        mat-icon-button
                        class="text-on-surface-variant"
                        aria-label="More message options"
                      >
                        <mat-icon aria-hidden="true">more_vert</mat-icon>
                      </button>
                    </div>
                  </div>
                </div>

                @if (selectedMessage.petName) {
                  <div
                    class="bg-indigo-50/50 p-4 rounded-xl mb-8 flex items-center gap-3 border border-indigo-100"
                  >
                    <div class="bg-indigo-600 p-2 rounded-lg">
                      <mat-icon
                        class="text-white text-sm w-4 h-4"
                        aria-hidden="true"
                        >pets</mat-icon
                      >
                    </div>
                    <div>
                      <p
                        class="text-xs font-bold text-indigo-600 uppercase tracking-widest m-0 leading-none"
                      >
                        Patient Context
                      </p>
                      <p
                        class="text-sm font-semibold text-indigo-900 m-0 leading-tight"
                      >
                        {{ selectedMessage.petName }}
                      </p>
                    </div>
                    <button
                      mat-button
                      color="primary"
                      class="ml-auto text-xs font-bold"
                      [aria-label]="
                        'View record for ' + selectedMessage.petName
                      "
                    >
                      View Patient File
                    </button>
                  </div>
                }

                <div
                  class="prose prose-indigo max-w-none text-on-surface leading-relaxed whitespace-pre-wrap"
                >
                  {{ selectedMessage.body }}
                </div>

                <mat-divider class="my-10" aria-hidden="true"></mat-divider>

                <!-- Reply Box Placeholder -->
                <div
                  class="border border-outline rounded-2xl p-4 bg-surface-variant focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all"
                >
                  <p class="text-sm text-on-surface-variant mb-4 px-2 italic">
                    Click here to reply...
                  </p>
                  <div class="flex justify-between items-center">
                    <div class="flex gap-1">
                      <button
                        mat-icon-button
                        class="text-on-surface-variant"
                        aria-label="Add emoji"
                      >
                        <mat-icon aria-hidden="true"
                          >sentiment_satisfied</mat-icon
                        >
                      </button>
                      <button
                        mat-icon-button
                        class="text-on-surface-variant"
                        aria-label="Attach file"
                      >
                        <mat-icon aria-hidden="true">attach_file</mat-icon>
                      </button>
                      <button
                        mat-icon-button
                        class="text-on-surface-variant"
                        aria-label="Attach image"
                      >
                        <mat-icon aria-hidden="true">image</mat-icon>
                      </button>
                    </div>
                    <button
                      mat-raised-button
                      color="primary"
                      aria-label="Send reply"
                    >
                      Send
                      <mat-icon class="ml-1 text-sm pt-1" aria-hidden="true"
                        >send</mat-icon
                      >
                    </button>
                  </div>
                </div>
              </div>
            } @else {
              <div
                class="h-full flex flex-col items-center justify-center text-center p-12"
              >
                <div class="bg-surface-variant p-6 rounded-full mb-4">
                  <mat-icon
                    class="text-on-surface-variant opacity-30 text-6xl! w-16! h-16!"
                    >chat_bubble_outline</mat-icon
                  >
                </div>
                <h3 class="text-xl font-bold text-on-surface mb-2">
                  Select a message
                </h3>
                <p class="text-on-surface-variant max-w-xs mx-auto">
                  Choose a conversation from the list to view the full message
                  details.
                </p>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .mat-toolbar {
        padding: 0;
      }
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class MessagesPageComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  messages: Message[] = [
    {
      id: '1',
      sender: 'Sarah Jenkins',
      initials: 'SJ',
      color: '#4f46e5',
      subject: "Luna's post-op checkup",
      body: "Hi Team,\n\nI just wanted to check in about Luna's recovery after her spay surgery last Tuesday. She seems mostly back to her normal self, but I noticed she hasn't been as interested in her kibble the last two days. \n\nIs this normal during the first week or should I be bringing her back in? She is drinking water and still loves her treats.\n\nThanks,\nSarah",
      date: 'Aug 14',
      petName: 'Luna (Cat)',
      isRead: false,
    },
    {
      id: '2',
      sender: 'Robert Wilson',
      initials: 'RW',
      color: '#0891b2',
      subject: "Rex's Vaccination Record Request",
      body: 'Hello,\n\nWe are planning to board Rex at a kennel next weekend and they require proof of his latest rabies vaccination. Could you please send over a digital copy of his records? \n\nI believe he had his boosters back in November.\n\nBest regards,\nRobert Wilson',
      date: 'Aug 13',
      petName: 'Rex (German Shepherd)',
      isRead: true,
    },
    {
      id: '3',
      sender: 'Emily Davis',
      initials: 'ED',
      color: '#059669',
      subject: "Bella's dietary concerns",
      body: 'Hi Dr. Smith,\n\nBella seems to be having a mild allergic reaction (extra itching) since we switched to the new grain-free food you recommended. \n\nAre there any antihistamines I should start her on, or should we switch back to her old diet immediately?\n\nThank you,\nEmily',
      date: 'Aug 12',
      petName: 'Bella (French Bulldog)',
      isRead: true,
    },
    {
      id: '4',
      sender: 'Michael Brown',
      initials: 'MB',
      color: '#d97706',
      subject: 'Question about medication dosage',
      body: "Dear Clinic Staff,\n\nI'm a bit confused about the instructions on Charlie's ear drops. Is it 3 drops per ear once a day or twice a day? The bottle says once but the summary I got says twice.\n\nPlease clarify when you have a moment.",
      date: 'Aug 10',
      petName: 'Charlie (Golden Retriever)',
      isRead: true,
    },
  ];

  selectedMessage: Message | null = this.messages[0];
}
