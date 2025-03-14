import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Importe o AuthService
import { Router } from '@angular/router'; // Importe o Router para redirecionamento
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIconModule, MatSnackBarModule], // Adicione os módulos necessários
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {}; // Dados do usuário
  snackBar: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Método para carregar o perfil do usuário
  loadUserProfile() {
    this.authService.getUserProfile().subscribe(
      (userData) => {
        this.user = userData; // Atualiza os dados do usuário logado
      },
      (error) => {
        console.error('Erro ao carregar perfil do usuário', error);
        this.snackBar.open('Erro ao carregar perfil', 'Fechar', {
          duration: 3000,
        });
      }
    );
  }

  // Método para fazer logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}