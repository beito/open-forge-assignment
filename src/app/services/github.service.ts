import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GitHubUser } from '../models/github-user.model';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private readonly apiUrl = 'https://api.github.com/users'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener lista de usuarios con paginación
  getUsers(since: number = 0): Observable<GitHubUser[]> {
    return this.http.get<GitHubUser[]>(`${this.apiUrl}?since=${since}`);
  }

  // Obtener detalles de un usuario específico por su nombre de usuario
  getUserDetails(username: string): Observable<GitHubUser> {
    return this.http.get<GitHubUser>(`${this.apiUrl}/${username}`);
  }
}
