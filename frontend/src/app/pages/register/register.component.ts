import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatSnackBarModule], // Adicione FormsModule aqui
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para registrar um novo usuário
  register() {
    this.authService.register(this.name, this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/login']); // Redirecionar para o login após o registro
      },
      (error) => {
        console.error('Erro ao registrar', error);
      }
    );
  }
}