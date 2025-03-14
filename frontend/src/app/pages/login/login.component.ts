import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { AuthService } from '../../services/auth.service'; // Importe o AuthService
import { Router, RouterModule } from '@angular/router'; // Importe o Router para redirecionamento
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true, // Define o componente como standalone
  imports: [FormsModule, HttpClientModule, RouterModule, MatIconModule], // Importa os módulos necessários
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = ''; // Propriedade para o nome de usuário
  password: string = ''; // Propriedade para a senha

  constructor(private authService: AuthService, private router: Router) {}

  // Método para fazer login
  login() {
    console.log('Tentando fazer login...'); // Log 1: Verifica se o método está sendo chamado

    // Chama o método de login do AuthService
    this.authService.login(this.username, this.password).subscribe(
      () => {
        console.log('Login bem-sucedido! Redirecionando...'); // Log 2: Verifica se o login foi bem-sucedido

        // Pequeno atraso para garantir que o token seja salvo no localStorage
        setTimeout(() => {
          this.router.navigate(['/events']); // Redireciona para a página inicial
        }, 100);
      },
      (error) => {
        console.error('Erro ao fazer login', error); // Log 3: Exibe erros no console
      }
    );
  }
}