import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { TokenService } from '../shared/services/token.service';
import { DbUserService } from '../shared/services/db-user.service';
import { User } from '../shared/models/user.class';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-protected-path',
  templateUrl: './protected-path.component.html',
  styleUrl: './protected-path.component.css'
})
export class ProtectedPathComponent {
  lsService = inject(LocalStorageService);
  tokenService = inject(TokenService);
  userService = inject(DbUserService);

  user$!: Observable<User>;

  ngOnInit() {
    const token = this.tokenService.getTokenFromLocalStorageAndDecode();
    console.log(token)
    if (token) {
      console.log(token, "from home")
      console.log(token.sub, "from home, email")

      this.user$ = this.userService.getOneUser(token.sub);
      this.user$.pipe(
        tap(user => console.log(user, "from inside pipe into ngOnIntit in home component"))
      )
    }
  }
}
