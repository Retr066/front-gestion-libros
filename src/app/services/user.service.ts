import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.models';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/users'; // Cambia esta URL por la de tu API

    constructor(private http: HttpClient) {}

    // Obtener todos los usuarios
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    // Obtener un usuario por ID
    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`);
    }

    // Crear un nuevo usuario
    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }

    // Actualizar un usuario existente
    updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, user);
    }

    // Eliminar un usuario
    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
