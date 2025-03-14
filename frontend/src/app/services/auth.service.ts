import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL do backend
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Estado de autenticação
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable para o estado de autenticação
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Verifica se está no navegador
    this.isLoggedInSubject.next(this.isAuthenticated()); // Atualiza o estado de autenticação
  }

  // Método para registrar um novo usuário
  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, { username, password, email });
  }

  // Método para fazer login
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, { username, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          const token = response.token;
          if (this.isBrowser) {
            localStorage.setItem('token', token); // Salva o token apenas no navegador
          }
          this.isLoggedInSubject.next(true); // Atualiza o estado de autenticação
        }
      })
    );
  }

  // Método para fazer logout
  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token'); // Remove o token apenas no navegador
    }
    this.isLoggedInSubject.next(false); // Atualiza o estado de autenticação
    this.router.navigate(['/login']);
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('token'); // Acessa o localStorage apenas no navegador
    }
    return false; // Retorna false no servidor
  }

  // Obter o token JWT
  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token'); // Acessa o localStorage apenas no navegador
    }
    return null; // Retorna null no servidor
  }

  // Método para obter os dados do usuário logado
  getUserProfile(): Observable<any> {
    const userId = this.getUserId(); // Obtém o ID do usuário do token
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }
    return this.http.get(`${this.apiUrl}/users/${userId}`); // Busca os dados no backend
  }

  // Obter o ID do usuário a partir do token
  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const payload: any = jwtDecode(token); // Decodifica o token JWT
      return payload.id; // Retorna o ID do usuário
    }
    return null; // Retorna null se o token não existir
  }
}