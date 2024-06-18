import { Component, DestroyRef, inject } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { TokenService } from '../../shared/services/token.service';
import { DbUserService } from '../../shared/services/db-user.service';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject, take, tap } from 'rxjs';
import { User } from '../../shared/models/user.class';
import { GameService } from '../../shared/services/game.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserDTO } from '../models/user-dto.type';
import { PlayerDTO } from '../models/player-dto.type';
import { TransformDtoService } from '../service/transform-dto.service';
import { GameLaunched } from '../models/game-lauched-dto.type';
import { HEIGHT, WIDTH } from '../constant.constant';

@Component({
  selector: 'app-starting',
  templateUrl: './starting.component.html',
  styleUrl: './starting.component.css'
})
export class StartingComponent {

  lsService = inject(LocalStorageService);
  tokenService = inject(TokenService);
  userService = inject(DbUserService);
  router = inject(Router);
  gameService = inject(GameService);
  destroyRef = inject(DestroyRef);
  transformService = inject(TransformDtoService);

  user$!: Observable<UserDTO>;
  user!: PlayerDTO;
  grid$: BehaviorSubject<any> = new BehaviorSubject([[]]);
  game$!: Observable<GameLaunched>;
  grid!: any;

  ngOnInit() {
    const token = this.tokenService.getTokenFromLocalStorageAndDecode();

    if (token) {
      this.user$ = this.userService.getOneUser(token.sub).pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(user => this.user = this.transformService.transformUserIntoPlayerDTO(user, 1))
      )
      // .subscribe((user) => {
      //   if (user) {
      //     this.user = this.transformService.transformUserIntoPlayerDTO(user, 1);
      //   }
      // })
    }

  }

  chooseDifficulty(difficulty: string) {
    this.game$ = this.gameService.postNewGame(difficulty, this.user);
    this.listenGame();
  }

  listenGame() {
    this.game$ = this.game$.pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef),
      map((game: GameLaunched) => {
        if (game) {
          const grid: string[][] = [];
          for (let line = 0; line < HEIGHT; line += 1) {
            grid.push([]);
            for (let column = 0; column < WIDTH; column += 1) {
              grid[line][column] = game.grid[line * WIDTH + column]
            }
          }
          console.log(grid);
          console.log("WINNNNER ", game.isFinished)

          //return grid;
          game.constructGrid = grid;
        }
        else {
          //return [[]];
          ;
        }
        return game;
      }),
      //tap(grid => this.grid$.next(grid)),
    )
    //.subscribe(grid => this.grid = grid)
  }

  play(gameId: number, nbColumn: number) {
    console.log(nbColumn);
    this.game$ = this.gameService.postMove(gameId, nbColumn);
    this.listenGame();
  }
}
