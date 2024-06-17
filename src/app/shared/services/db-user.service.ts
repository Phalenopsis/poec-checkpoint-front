import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.class';
import { LocalStorageService } from './local-storage.service';
import { UserDTO } from '../../game/models/user-dto.type';

@Injectable({
  providedIn: 'root'
})
export class DbUserService {

  private readonly _BASE_URL = "http://localhost:8080/api/v1/users";

  private http = inject(HttpClient);
  private lsService = inject(LocalStorageService);

  getOneUser(email: string): Observable<UserDTO> {
    const headers = this.getHeaders();
    const user$ = this.http.get<any>(`${this._BASE_URL}/email/${email}`);
    return user$;
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this._BASE_URL}/all`);
  }

  getHeaders(): HttpHeaders {
    const token = this.lsService.getToken();

    return new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
  };

}