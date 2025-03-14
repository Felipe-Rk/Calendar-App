import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventsComponent } from './pages/events/events.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './auth.guard'; // Importe o AuthGuard

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Página inicial, redirecionando para 'home'
  { path: 'login', component: LoginComponent }, // Página de login
  { path: 'register', component: RegisterComponent }, // Página de registro
  { path: 'home', component: HomeComponent }, // Página inicial
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] }, // Página de eventos (protegida)
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Página de perfil (protegida)
  { path: '**', component: NotFoundComponent }, // Página 404
];