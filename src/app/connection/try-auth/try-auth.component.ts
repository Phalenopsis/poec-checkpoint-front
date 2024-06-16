import { Component, inject } from '@angular/core';
import { UserAuth } from '../../shared/models/user-auth.class';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

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

  connect() {
    const user = new UserAuth(this.email, this.password);
    this.authService.signIn(user);
    this.router.navigateByUrl("/protected");
  }
}
