// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.models';
import axios, { AxiosResponse } from 'axios';
import { API } from '../utils/api';
import { HttpMethod } from '../enums/HttpMethod';
import { Login, LoginResponse, Register } from '../models/auth.models';
import { SuccessResponse } from '../interfaces/success-response.inteface';
import { tokenKey } from '../constants/token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = '/auth'; // Cambia esta URL por la de tu API de autenticación
    //apunta a auth en la api

    constructor() {}

    // Función de inicio de sesión
    async login(loginData: Login): Promise<AxiosResponse<SuccessResponse<LoginResponse>>> {
        const response = await API(HttpMethod.POST, `${this.apiUrl}/login`, loginData);
        this.setToken(response.data.token);
        return response;
    }

    // Función de registro
    async register(user: Register): Promise<AxiosResponse<SuccessResponse<User>>> {
        return await API(HttpMethod.POST, `${this.apiUrl}/register`, user);
    }

    // Guardar el token en localStorage
    private setToken(token: string): void {
        console.log(token,'llego');
        localStorage.setItem(tokenKey, token);
    }

    // Obtener el token desde localStorage
    getToken(): string | null {
        return localStorage.getItem(tokenKey);
    }

    // Eliminar el token de localStorage (cierre de sesión)
    logout(): void {
        localStorage.removeItem(tokenKey);
    }

    // Verificar si el usuario está autenticado (es decir, si hay un token)
    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}
