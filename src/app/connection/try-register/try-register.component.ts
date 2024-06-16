import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserRegister } from '../../shared/models/user-register.class';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TokenService } from '../../shared/services/token.service';
import { UserAuth } from '../../shared/models/user-auth.class';

@Component({
  selector: 'app-try-register',
  templateUrl: './try-register.component.html',
  styleUrl: './try-register.component.css'
})
export class TryRegisterComponent {
  email!: string;
  password!: string;
  name!: string;

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  destroyRef: DestroyRef = inject(DestroyRef);

  register() {
    const user = new UserRegister(this.name, this.email, this.password);
    const userToConnect = new UserAuth(this.email, this.password);
    this.authService.signUp(user).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (something) => {
        this.authService.signIn(userToConnect).pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe({
          next: (tokenFromDb) => {
            this.router.navigateByUrl('/protected');
          },
          error: (err) => {
            this.router.navigateByUrl("/error-connection");
          }
        });
      },
      error: (err) => {
        console.log("error from register", err);
        this.router.navigateByUrl("/error-connection");
      }
    });
  }
}
