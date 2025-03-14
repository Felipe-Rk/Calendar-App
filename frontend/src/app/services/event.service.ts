import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3000'; // URL do backend

  constructor(private http: HttpClient) {}

  // Obter eventos de um usuário
  getEvents(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/events/${userId}`);
  }

  // Adicionar um novo evento
  addEvent(userId: number, description: string, startTime: Date, endTime: Date): Observable<any> {
    return this.http.post(`${this.apiUrl}/events`, { userId, description, start_time: startTime, end_time: endTime });
  }

  // Atualizar um evento existente
  updateEvent(eventId: number, description: string, startTime: Date, endTime: Date): Observable<any> {
    return this.http.put(`${this.apiUrl}/events/${eventId}`, { description, start_time: startTime, end_time: endTime });
  }

  // Remover um evento
  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/events/${eventId}`);
  }

  // Exportar eventos para formato ICS
  exportEventsToICS(userId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/events/export-ics/${userId}`);
  }
}