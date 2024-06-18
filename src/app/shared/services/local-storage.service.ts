import { Injectable } from '@angular/core';
import { TokenResponse } from '../models/token.class';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  // Ce service contient toute la logique où j'interagis avec le LocalStorage
  constructor() { }

  // Je récupère le token stocké en LocalStorage
  getToken(): string | null {
    const tokenId = localStorage.getItem("tokenId");
    if (tokenId) {
      return tokenId;
    } else {
      return null;
    }
  }

  // Je mets le nouveau token dans le localStorage
  setToken(tokenFromDB: TokenResponse): void {
    localStorage.setItem("tokenId", tokenFromDB.token);
  }

  // Je supprime le token dans le localStorage
  clearToken(): void {
    localStorage.removeItem("tokenId")
  }
}