import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage, RouterLink,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]

})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin(): Promise<void> {
      try {
          // Llamamos a la función login en el servicio, que usa axios
          const response = await this.authService.login({
              email: this.email,
              password: this.password
          });
          
          // Redirige a la página principal o a otra parte de la aplicación si la autenticación es exitosa
          if (response.status === 200) {
              this.router.navigate(['/dashboard']);
          }
      } catch (error) {
          console.error('Error de inicio de sesión', error);
          this.errorMessage = 'Credenciales incorrectas o error en el servidor';
      }
  }

  onLogout(): void {
      this.authService.logout();
      // Redirige al usuario después de cerrar sesión
      this.router.navigate(['/login']);
  }
}
