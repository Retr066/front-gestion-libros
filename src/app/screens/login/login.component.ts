import { Component, Inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../models/auth.models';
import { NzAlertModule } from 'ng-zorro-antd/alert';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage, RouterLink,ReactiveFormsModule, CommonModule , NzAlertModule
    
  ],
  templateUrl: './login.component.html',
  providers: [AuthService]

})
export class LoginComponent {
  errorMessage: string | null = null;
  loginForm: FormGroup;
  touchedFields = false;
  loading = false;

  constructor(private formBuilder: FormBuilder,private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onLogin(): Promise<void> {

      this.touchedFields = true;
      if (!this.loginForm.valid) {
        console.log('Formulario inválido',this.loginForm.get('password')?.errors);
          return;
      }

      const loginData: Login = this.loginForm.value;

      try {
          // Llamamos a la función login en el servicio, que usa axios

          this.loading = true;
          const response = await this.authService.login(loginData);
          
          // Redirige a la página principal o a otra parte de la aplicación si la autenticación es exitosa
          if (response.status === 200) {
              this.errorMessage = null;
              this.touchedFields = false;
              this.loginForm.reset(); // Limpia el formulario tras el registro exitoso
              this.loginForm.clearValidators();
            
              this.router.navigate(['/home']);
          }
      } catch (error:any) {
        console.log(error);
        if (error.response && error.response.data) {
          if (error.response.data['errors']) {
            const errorsValidations = error.response.data['errors'].map((error: { msg: string; }) => error.msg);
            this.errorMessage = errorsValidations.join('.\n');
          } else {
            this.errorMessage = error.response.data.message; // Mensaje de error
          }
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
        }
      } finally {
          this.loading = false;
      }
  }

  onLogout(): void {
      this.authService.logout();
      // Redirige al usuario después de cerrar sesión
      this.router.navigate(['/login']);
  }
}
