import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Calendar App';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verifica o estado de autenticação ao inicializar o componente
    this.isLoggedIn = this.authService.isAuthenticated();

    // Observa mudanças no estado de autenticação
    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  // Navega para a página de eventos
  goToEvents() {
    this.router.navigate(['/events']);
  }

    // Navega para a página de perfil
    goToProfile() {
      this.router.navigate(['/profile']);
    }

  // Faz logout e redireciona para a página de login
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}