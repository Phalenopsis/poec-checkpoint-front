import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class DbUserService {

  private readonly _BASE_URL = "http://localhost:8080/api/v1/users";

  constructor(private http: HttpClient) { }

  getOneUser(email: string): Observable<User> {
    return this.http.get<User>(`${this._BASE_URL}/email/${email}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this._BASE_URL}/all`);
  }
}