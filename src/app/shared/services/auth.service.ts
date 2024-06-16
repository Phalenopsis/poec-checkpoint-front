import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { UserRegister } from '../models/user-register.class';
import { UserAuth } from '../models/user-auth.class';
import { TokenResponse } from '../models/token.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _BASE_URL = "http://localhost:8080/api/v1/auth";
  private _httpErrorSubject$: BehaviorSubject<HttpErrorResponse> = new BehaviorSubject(new HttpErrorResponse({}));
  private _httpSuccessSubject$: BehaviorSubject<HttpResponse<any>> = new BehaviorSubject(new HttpResponse({}));


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  // Je m'inscris : j'envoie mon objet UserRegister et je m'abonne à la réponse de mon serveur
  signUp(userRegister: UserRegister): void {
    this.http.post<any>(`${this._BASE_URL}/register`, userRegister)
      .pipe(tap(res => console.log(res)))
      .subscribe()
  }

  // Je me connecte : j'envoie mon objet UserAuth et je m'abonne à la réponse de mon serveur. Lorsque je la reçois, je reçois le token que je stock en localStorage.
  signIn(userAuth: UserAuth): void {
    this.tokenService.resetToken();
    this.http.post<any>(`${this._BASE_URL}/authenticate`, userAuth)
      .subscribe((tokenFromDB: TokenResponse) => {
        console.log("FROM SIGN_IN ", tokenFromDB);
        this.tokenService.updateToken(tokenFromDB);
        console.log("token in ls : ", this.tokenService.getTokenFromLocalStorageAndDecode());
      })
  }

  getHttpErrorSubject$(): Observable<HttpErrorResponse> {
    return this._httpErrorSubject$.asObservable();
  }
  setHttpErrorSubject$(error: HttpErrorResponse): void {
    // On retire l'erreur stockée dans le SuccessSubject
    this._httpSuccessSubject$.next(new HttpResponse({}))
    // On ajoute l'erreur au ErrorSubject
    this._httpErrorSubject$.next(error);
  }

  getHttpSuccessSubject$(): Observable<HttpResponse<any>> {
    return this._httpSuccessSubject$.asObservable();
  }
  setHttpSuccessSubject$(success: HttpResponse<any>): void {
    // On retire l'erreur stockée dans le ErrorSubject
    this._httpErrorSubject$.next(new HttpErrorResponse({}))
    // On ajoute l'erreur au SuccessSubject
    this._httpSuccessSubject$.next(success);
  }

}