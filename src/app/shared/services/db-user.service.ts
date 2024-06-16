import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.class';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DbUserService {

  private readonly _BASE_URL = "http://localhost:8080/api/v1/users";

  private http = inject(HttpClient);
  private lsService = inject(LocalStorageService);

  getOneUser(email: string): Observable<User> {
    const headers = this.getHeaders();
    console.log("c'est appelé", headers)
    //const user$ = this.http.get<any>(`${this._BASE_URL}/email/${email}`, { headers });
    const user$ = this.http.get<any>(`${this._BASE_URL}/email/${email}`);

    user$.subscribe(qqch => console.log(qqch));

    user$.pipe(
      tap(user => console.log(user, "from get one user"))
    )
    return user$;
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this._BASE_URL}/all`);
  }

  getHeaders(): HttpHeaders {
    const token = this.lsService.getToken();
    console.log(token);

    return new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
  };

}