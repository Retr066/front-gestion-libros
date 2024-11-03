// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.models';
import axios, { AxiosResponse } from 'axios';
import { API } from '../utils/api';
import { HttpMethod } from '../enums/HttpMethod';
import { Login, UserLogin } from '../models/auth.models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = '/auth'; // Cambia esta URL por la de tu API de autenticación
    //apunta a auth en la api
    private tokenKey = 'JwtToken'; // Nombre de la clave en localStorage

    constructor() {}

    // Función de inicio de sesión
    async login(loginData: Login): Promise<AxiosResponse<UserLogin>> {
        const response = await API(HttpMethod.POST, `${this.apiUrl}/login`, loginData);
        this.setToken(response.data.token);
        return response;
    }

    // Función de registro
    async register(user: User): Promise<AxiosResponse<any>> {
        return await axios.post(`${this.apiUrl}/register`, user);
    }

    // Guardar el token en localStorage
    private setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    // Obtener el token desde localStorage
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    // Eliminar el token de localStorage (cierre de sesión)
    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }

    // Verificar si el usuario está autenticado (es decir, si hay un token)
    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}
