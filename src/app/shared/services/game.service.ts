import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';
import { UserDTO } from '../../game/models/user-dto.type';
import { PlayerDTO } from '../../game/models/player-dto.type';
import { GameLaunched } from '../../game/models/game-lauched-dto.type';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly _BASE_URL = "http://localhost:8080/api/v1/game";

  private http = inject(HttpClient);
  private lsService = inject(LocalStorageService);

  postNewGame(difficultyChoosen: string, playerDTO: PlayerDTO): Observable<GameLaunched> {
    const game$ = this.http.post<any>(
      `${this._BASE_URL}/new`,
      {
        difficulty: difficultyChoosen,
        playerId: playerDTO.id,
        playerColor: playerDTO.color
      });
    return game$;
  }

  postMove(tablePlayed: number, columnMove: number): Observable<any> {
    return this.http.post<any>(
      `${this._BASE_URL}/play`,
      {
        tableId: tablePlayed,
        column: columnMove
      }
    );
  }
}
