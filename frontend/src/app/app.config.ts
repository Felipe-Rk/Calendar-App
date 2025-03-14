import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Para chamadas HTTP
import { routes } from './app.routes'; // Importe as rotas
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Configuração de detecção de mudanças
    provideRouter(routes), // Configura as rotas
    provideClientHydration(withEventReplay()), // Configura a hidratação do lado do servidor
    provideHttpClient(withFetch()), // Configura o HttpClient para chamadas HTTP
  ],
};