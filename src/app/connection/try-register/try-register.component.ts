import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserRegister } from '../../shared/models/user-register.class';

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

  register() {
    const user = new UserRegister(this.name, this.email, this.password);
    this.authService.signUp(user);
  }
}
