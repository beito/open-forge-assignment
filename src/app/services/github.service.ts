import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GitHubUser } from '../models/github-user.model';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private readonly APIURL = 'https://api.github.com/users';
  private readonly PAGINATION = 30;

  constructor(private http: HttpClient) {}

  getUsers(since: number = 0): Observable<GitHubUser[]> {
    return this.http.get<GitHubUser[]>(`${this.APIURL}?since=${since}&per_page=${this.PAGINATION}`);
  }

  getUserDetails(username: string): Observable<GitHubUser> {
    return this.http.get<GitHubUser>(`${this.APIURL}/${username}`);
  }
}
