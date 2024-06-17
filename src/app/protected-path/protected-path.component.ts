import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { TokenService } from '../shared/services/token.service';
import { DbUserService } from '../shared/services/db-user.service';
import { User } from '../shared/models/user.class';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protected-path',
  templateUrl: './protected-path.component.html',
  styleUrl: './protected-path.component.css'
})
export class ProtectedPathComponent {
  lsService = inject(LocalStorageService);
  tokenService = inject(TokenService);
  userService = inject(DbUserService);
  router = inject(Router);

  user$!: Observable<User>;

  ngOnInit() {
    const token = this.tokenService.getTokenFromLocalStorageAndDecode();
    if (token) {
      this.user$ = this.userService.getOneUser(token.sub);
    }
  }
}
