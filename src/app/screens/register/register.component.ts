import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NzAlertModule, LoginComponent, RouterLink, NgOptimizedImage, ReactiveFormsModule, CommonModule
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  touchedFields = false;
  loading = false;
  // messageError: { [key: string]: { type: string; message: string }[] };

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    // this.authService = authService; lo hace implicito
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      identificationNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]
    });

    //crear los mensajes de error para cada campo
    // this.messageError = {
    //   name: [
    //     { type: 'required', message: 'El nombre es requerido' },
    //     { type: 'minlength', message: 'El nombre debe tener al menos 3 caracteres' }
    //   ],
    //   email: [
    //     { type: 'required', message: 'El correo electrónico es requerido' },
    //     { type: 'email', message: 'El correo electrónico no es válido' }
    //   ],
    //   password: [
    //     { type: 'required', message: 'La contraseña es requerida' },
    //     { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    //   ],
    //   identificationNumber: [
    //     { type: 'required', message: 'El número de identificación es requerido' },
    //     { type: 'pattern', message: 'El número de identificación debe tener 9 dígitos' }
    //   ]
    // };

  }

  async onSubmit() {
    this.touchedFields = true;
    if (!this.registerForm.valid) {
      return;
    }

    const userData: Register = this.registerForm.value;

    try {
      this.loading = true;
      const response = await this.authService.register(userData);
      if (response.status === 201) {
        this.successMessage = response.data.message; // Mensaje de éxito
        this.errorMessage = null;
        this.touchedFields = false;
        this.registerForm.reset(); // Limpia el formulario tras el registro exitoso
        this.registerForm.clearValidators();
      }
    } catch (error: any) {
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

}
