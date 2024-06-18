import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { DbUserService } from '../shared/services/db-user.service';
import { AuthService } from '../shared/services/auth.service';
import { TokenService } from '../shared/services/token.service';
import { Observable, tap } from 'rxjs';
import { User } from '../shared/models/user.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  lsService = inject(LocalStorageService);
  tokenService = inject(TokenService);
  userService = inject(DbUserService);

  user$!: Observable<User>;

  ngOnInit() {
    const token = this.tokenService.getTokenFromLocalStorageAndDecode();
    if (token) {
      this.user$ = this.userService.getOneUser(token.sub);
    }
  }
}
