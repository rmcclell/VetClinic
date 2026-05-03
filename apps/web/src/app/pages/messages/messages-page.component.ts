import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ComposeMessageDialogComponent } from './compose-message-dialog.component';
import { MessageSettingsDialogComponent, MessageSettings } from './message-settings-dialog.component';
import { ClientsService } from '../../services/clients.service';
import { firstValueFrom } from 'rxjs';

interface Message {
  id: string;
  sender: string;
  subject: string;
  body: string;
  date: string;
  petName?: string;
  patientId?: number;
  isRead: boolean;
  isStarred: boolean;
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
    MatDialogModule,
    MatSnackBarModule,
    RouterLink,
  ],
  template: `
    <mat-toolbar class="bg-surface-variant border-b border-outline h-18! px-6">
      <div class="flex gap-3 w-full md:w-auto grow items-center">
        <div class="bg-surface-variant border border-outline p-2 rounded-lg" aria-hidden="true">
          <mat-icon class="text-on-surface">mail</mat-icon>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-on-surface m-0">Messages</h1>
          <p class="text-on-surface-variant text-sm opacity-80 hidden sm:block">
            Manage client messages
          </p>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="bg-primary text-on-primary text-xs font-bold px-2 py-0.5 rounded-full"
            aria-label="3 new messages"
            >3 New</span
          >
          <mat-button-toggle-group
            name="message-folder"
            aria-label="Filter messages by folder"
            [hideSingleSelectionIndicator]="false"
            [value]="currentFolder"
            (change)="setFolder($event.value)"
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
          (click)="openSettings()"
        >
          <mat-icon aria-hidden="true">settings</mat-icon>
        </button>
        <button mat-raised-button color="primary" class="h-10" aria-label="Compose new message" (click)="composeMessage()">
          <mat-icon class="mr-2" aria-hidden="true">edit</mat-icon>
          <span class="hidden sm:inline">Compose</span>
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
                  (input)="applySearch($event)"
                />
              </div>
            </div>
            <div class="flex-1 overflow-y-auto">
              <mat-nav-list class="pt-0">
                @for (msg of filteredMessages; track msg.id) {
                  <button
                    mat-list-item
                    (click)="selectedMessage = msg"
                    (keydown.enter)="selectedMessage = msg"
                    (keydown.space)="selectedMessage = msg"
                    [class.bg-surface]="selectedMessage?.id === msg.id"
                    [class.shadow-sm]="selectedMessage?.id === msg.id"
                    [class.border-l-4]="selectedMessage?.id === msg.id"
                    [class.border-primary]="selectedMessage?.id === msg.id"
                    [attr.aria-pressed]="selectedMessage?.id === msg.id"
                    [attr.aria-label]="(msg.isRead ? '' : 'Unread. ') + 'From ' + msg.sender + ': ' + msg.subject + (msg.petName ? ', regarding patient ' + msg.petName : '') + ' — ' + msg.date"
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
                      class="flex justify-between items-center gap-2"
                    >
                      <div class="flex items-center gap-1.5 min-w-0">
                        <span
                          class="font-bold text-on-surface truncate"
                          [class.font-semibold]="!msg.isRead"
                          >{{ msg.sender }}</span
                        >
                        @if (msg.isStarred) {
                          <mat-icon class="text-amber-500 text-xs w-2.5 h-2.5 leading-2.5 flex-none">star</mat-icon>
                        }
                      </div>
                      <span
                        class="text-xs text-on-surface-variant font-normal uppercase flex-none"
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
              <div class="p-4 sm:p-8">
                <div class="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-start mb-6 sm:mb-8">
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
                  <div class="flex sm:text-right sm:items-end flex-row sm:flex-col gap-2 sm:gap-0 items-center">
                    <p class="text-sm text-on-surface-variant font-medium sm:mb-3 m-0">
                      {{ selectedMessage.date }}
                    </p>
                    <div class="flex gap-1 sm:justify-end">
                      <button
                        mat-icon-button
                        (click)="toggleStar(selectedMessage); $event.stopPropagation()"
                        [class.text-amber-500]="selectedMessage.isStarred"
                        [class.text-on-surface-variant]="!selectedMessage.isStarred"
                        [aria-label]="selectedMessage.isStarred ? 'Unstar message' : 'Star message'"
                      >
                        <mat-icon aria-hidden="true">{{ selectedMessage.isStarred ? 'star' : 'star_border' }}</mat-icon>
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
                        (click)="replyToMessage()"
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
                @if (selectedMessage.patientId) {
                  <button
                    mat-button
                    color="primary"
                    class="ml-auto text-xs font-bold"
                    [routerLink]="['/patients', selectedMessage.patientId]"
                    [aria-label]="
                      'View record for ' + selectedMessage.petName
                    "
                  >
                    View Patient File
                  </button>
                }
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
                  class="border border-outline rounded-2xl p-4 bg-surface-variant hover:border-primary/50 transition-all cursor-text group"
                  (click)="replyToMessage()"
                >
                  <p class="text-sm text-on-surface-variant mb-4 px-2 italic group-hover:text-primary transition-colors">
                    Click here to reply...
                  </p>
                  <div class="flex justify-between items-center pointer-events-none opacity-60">
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
                      class="pointer-events-auto opacity-100"
                      (click)="replyToMessage(); $event.stopPropagation()"
                    >
                      Reply
                      <mat-icon class="ml-1 text-sm pt-1" aria-hidden="true"
                        >reply</mat-icon
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

  inboxMessages: Message[] = [
    {
      id: '1',
      sender: 'Sarah Johnson',
      initials: 'SJ',
      color: '#4f46e5',
      subject: "Luna's post-op checkup",
      body: "Hi Team,\n\nI just wanted to check in about Luna's recovery after her spay surgery last Tuesday. She seems mostly back to her normal self, but I noticed she hasn't been as interested in her kibble the last two days. \n\nIs this normal during the first week or should I be bringing her back in? She is drinking water and still loves her treats.\n\nThanks,\nSarah",
      date: 'Aug 14',
      petName: 'Luna (Siamese)',
      patientId: 2,
      isRead: false,
      isStarred: true,
    },
    {
      id: '2',
      sender: 'Michael Chen',
      initials: 'MC',
      color: '#0891b2',
      subject: "Buddy's Vaccination Record Request",
      body: 'Hello,\n\nWe are planning to board Buddy at a kennel next weekend and they require proof of his latest rabies vaccination. Could you please send over a digital copy of his records? \n\nI believe he had his boosters back in November.\n\nBest regards,\nMichael Chen',
      date: 'Aug 13',
      petName: 'Buddy (Labrador Mix)',
      patientId: 3,
      isRead: true,
      isStarred: false,
    },
    {
      id: '3',
      sender: 'Emily Rodriguez',
      initials: 'ER',
      color: '#059669',
      subject: "Whiskers' dietary concerns",
      body: 'Hi Dr. Smith,\n\nWhiskers seems to be having a mild allergic reaction (extra itching) since we switched to the new grain-free food you recommended. \n\nAre there any antihistamines I should start him on, or should we switch back to his old diet immediately?\n\nThank you,\nEmily',
      date: 'Aug 12',
      petName: 'Whiskers (Tabby)',
      patientId: 4,
      isRead: true,
      isStarred: false,
    },
    {
      id: '4',
      sender: 'David Thompson',
      initials: 'DT',
      color: '#d97706',
      subject: 'Question about medication dosage',
      body: "Dear Clinic Staff,\n\nI'm a bit confused about the instructions on Daisy's ear drops. Is it 3 drops per ear once a day or twice a day? The bottle says once but the summary I got says twice.\n\nPlease clarify when you have a moment.",
      date: 'Aug 10',
      petName: 'Daisy (Border Collie)',
      patientId: 7,
      isRead: true,
      isStarred: false,
    },
  ];

  outboxMessages: Message[] = [
    {
      id: 'o1',
      sender: 'Springfield Vet Clinic',
      initials: 'SV',
      color: '#10b981',
      subject: "Reminder: Max's Annual Exam",
      body: "Hi Sarah,\n\nThis is a friendly reminder that Max is due for his annual wellness exam and vaccination boosters next month. Regular checkups are vital for keeping Max healthy and happy!\n\nPlease call us at 555-0199 or use the client portal to schedule an appointment at your earliest convenience.\n\nBest,\nSpringfield Vet Clinic",
      date: 'Aug 15',
      petName: 'Max (Golden Retriever)',
      patientId: 1,
      isRead: true,
      isStarred: false,
    },
    {
      id: 'o2',
      sender: 'Springfield Vet Clinic',
      initials: 'SV',
      color: '#10b981',
      subject: 'Lab Results for Charlie',
      body: "Dear Emily,\n\nDr. Smith has reviewed Charlie's bloodwork from his visit yesterday. Everything looks completely normal, and his kidney values have improved since his last checkup!\n\nWe recommend continuing his current prescription diet. Let us know if you need a refill soon.\n\nRegards,\nThe team at Springfield Vet Clinic",
      date: 'Aug 11',
      petName: 'Charlie (Beagle)',
      patientId: 6,
      isRead: true,
      isStarred: false,
    }
  ];

  currentFolder: 'inbox' | 'outbox' = 'inbox';
  currentMessages: Message[] = this.inboxMessages;
  filteredMessages: Message[] = this.inboxMessages;
  selectedMessage: Message | null = this.inboxMessages[0];
  searchQuery: string = '';

  setFolder(folder: 'inbox' | 'outbox') {
    this.currentFolder = folder;
    this.currentMessages = folder === 'inbox' ? this.inboxMessages : this.outboxMessages;
    this.applySearchFilter();
  }

  applySearch(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applySearchFilter();
  }

  private applySearchFilter() {
    if (!this.searchQuery) {
      this.filteredMessages = [...this.currentMessages];
    } else {
      this.filteredMessages = this.currentMessages.filter((msg) =>
        msg.sender.toLowerCase().includes(this.searchQuery) ||
        msg.subject.toLowerCase().includes(this.searchQuery) ||
        msg.body.toLowerCase().includes(this.searchQuery) ||
        (msg.petName && msg.petName.toLowerCase().includes(this.searchQuery))
      );
    }
    this.selectedMessage = this.filteredMessages.length > 0 ? this.filteredMessages[0] : null;
  }

  // --- Settings State ---
  messageSettings: MessageSettings = {
    autoReply: false,
    autoReplyMessage: 'Thank you for your message. Our clinic hours are Monday-Friday 8AM to 6PM. We will respond as soon as possible.',
    signature: 'Springfield Vet Clinic\n123 Healing Way\n555-0199',
    emailNotifications: true
  };

  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private clientsService = inject(ClientsService);

  openSettings(): void {
    const dialogRef = this.dialog.open(MessageSettingsDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: this.messageSettings,
    });

    dialogRef.afterClosed().subscribe((result: MessageSettings) => {
      if (result) {
        this.messageSettings = result;
        this.snackBar.open('Message settings saved successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['bg-emerald-600', 'text-white', 'font-bold']
        });
      }
    });
  }

  toggleStar(message: Message): void {
    message.isStarred = !message.isStarred;
    this.snackBar.open(
      message.isStarred ? 'Message starred' : 'Message unstarred',
      'Undo',
      { duration: 2000 }
    ).onAction().subscribe(() => {
      message.isStarred = !message.isStarred;
    });
  }

  handleMessageClose(dialogRef: any): void {
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.snackBar.open('Message sent successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['bg-emerald-600', 'text-white', 'font-bold']
        });
      }
    });
  }

  composeMessage(): void {
    const dialogRef = this.dialog.open(ComposeMessageDialogComponent, {
      width: '700px',
      maxWidth: '95vw',
      maxHeight: '90vh',
    });

    this.handleMessageClose(dialogRef);
  }

  async replyToMessage(): Promise<void> {
    if (!this.selectedMessage) return;

    // Try to match the sender to a client
    let matchedClientId: number | undefined = undefined;
    
    try {
      const clients = await firstValueFrom(this.clientsService.getClients());
      const senderName = this.selectedMessage.sender.toLowerCase();
      const matchedClient = clients.find(c => 
        senderName.includes(c.firstName.toLowerCase()) || 
        senderName.includes(c.lastName.toLowerCase())
      );
      if (matchedClient) {
        matchedClientId = matchedClient.id;
      }
    } catch (err) {
      console.error('Failed to load clients for reply match', err);
    }

    const replySubject = this.selectedMessage.subject.startsWith('Re:') 
      ? this.selectedMessage.subject 
      : `Re: ${this.selectedMessage.subject}`;

    const dialogRef = this.dialog.open(ComposeMessageDialogComponent, {
      width: '700px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: {
        isReply: true,
        clientId: matchedClientId,
        subject: replySubject,
        body: `\n\n--- Original Message from ${this.selectedMessage.sender} ---\n${this.selectedMessage.body}`
      }
    });

    this.handleMessageClose(dialogRef);
  }
}
