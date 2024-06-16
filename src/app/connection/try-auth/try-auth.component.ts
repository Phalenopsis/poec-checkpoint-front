import { Component, DestroyRef, inject } from '@angular/core';
import { UserAuth } from '../../shared/models/user-auth.class';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-try-auth',
  templateUrl: './try-auth.component.html',
  styleUrl: './try-auth.component.css'
})
export class TryAuthComponent {
  email!: string;
  password!: string;

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  destroyRef: DestroyRef = inject(DestroyRef);

  connect() {
    const user = new UserAuth(this.email, this.password);

    this.authService.signIn(user).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (tokenFromDb) => {
        this.router.navigateByUrl('/protected');
      },
      error: (err) => {
        this.router.navigateByUrl("/error-connection");
      }
    });
  }
}
