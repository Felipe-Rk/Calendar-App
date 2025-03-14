import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatSnackBarModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  newEvent = { description: '', startTime: '', endTime: '' };
  editingEvent: any = null;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.isLoading = true;
    const userId = this.authService.getUserId();
    if (userId) {
      this.eventService.getEvents(userId).subscribe(
        (data) => {
          this.events = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao carregar eventos', error);
          this.isLoading = false;
        }
      );
    }
  }

  addEvent() {
    const userId = this.authService.getUserId();
    if (userId) {
      const { description, startTime, endTime } = this.newEvent;
      const startTimeDate = new Date(startTime);
      const endTimeDate = new Date(endTime);

      if (this.checkForTimeConflict(startTimeDate, endTimeDate)) {
        this.errorMessage = 'Não é possível atualizar o evento, já possui outro evento no mesmo horário.'
        return;
      }

      this.eventService.addEvent(userId, description, startTimeDate, endTimeDate).subscribe(
        () => {
          this.loadEvents();
          this.newEvent = { description: '', startTime: '', endTime: '' };
          this.errorMessage = '';
          this.snackBar.open('Evento adicionado com sucesso!', 'Fechar', { duration: 3000 });
        },
        (error) => {
          console.error('Erro ao adicionar evento', error);
          this.errorMessage = 'Erro ao adicionar evento. Tente novamente.';
        }
      );
    } else {
      this.errorMessage = 'Usuário não autenticado. Faça login antes de adicionar um evento.';
    }
  }

  editEvent(event: any) {
    this.editingEvent = { ...event };
  }

  updateEvent() {
    if (this.editingEvent) {
      const { id, description, start_time, end_time } = this.editingEvent;
      const startTimeDate = new Date(start_time);
      const endTimeDate = new Date(end_time);

      if (this.checkForTimeConflict(startTimeDate, endTimeDate, id)) {
        this.errorMessage = 'Não é possível atualizar o evento, já possui outro evento no mesmo horário.'
        return;
      }

      this.eventService.updateEvent(id, description, startTimeDate, endTimeDate).subscribe(
        () => {
          this.loadEvents();
          this.editingEvent = null;
          this.errorMessage = '';
          this.snackBar.open('Evento atualizado com sucesso!', 'Fechar', { duration: 3000 });
        },
        (error) => {
          console.error('Erro ao atualizar evento', error);
          this.errorMessage = error.message || 'Erro ao atualizar evento.';
        }
      );
    }
  }

  cancelEdit() {
    this.editingEvent = null;
    this.errorMessage = '';
  }

  deleteEvent(eventId: number) {
    if (confirm('Tem certeza que deseja remover este evento?')) {
      this.eventService.deleteEvent(eventId).subscribe(
        () => {
          this.loadEvents();
          this.snackBar.open('Evento removido com sucesso!', 'Fechar', { duration: 3000 });
        },
        (error) => {
          console.error('Erro ao remover evento', error);
        }
      );
    }
  }

  checkForTimeConflict(startTime: Date, endTime: Date, eventIdToIgnore?: number): boolean {
    return this.events.some(event => {
      if (eventIdToIgnore && event.id === eventIdToIgnore) return false;
      const eventStart = new Date(event.start_time);
      const eventEnd = new Date(event.end_time);
      return (startTime < eventEnd && endTime > eventStart);
    });
  }
}