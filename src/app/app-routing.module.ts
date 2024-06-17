import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorConnectionComponent } from './connection/error-connection/error-connection.component';
import { Error404Component } from './error404/error404.component';
import { TryAuthComponent } from './connection/try-auth/try-auth.component';
import { ProtectedPathComponent } from './protected-path/protected-path.component';
import { authGuard } from './shared/core/auth.guard';
import { userResolver } from './shared/core/user.resolver';
import { TryRegisterComponent } from './connection/try-register/try-register.component';
import { HomeComponent } from './home/home.component';
import { StartingComponent } from './game/starting/starting.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "protected", component: ProtectedPathComponent, resolve: { user: userResolver }, canActivate: [authGuard] },
  { path: "home", component: HomeComponent },
  { path: "login", component: TryAuthComponent },
  { path: "register", component: TryRegisterComponent },
  { path: "error-connection", component: ErrorConnectionComponent },
  { path: "start", component: StartingComponent, canActivate: [authGuard] },
  { path: "**", component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
