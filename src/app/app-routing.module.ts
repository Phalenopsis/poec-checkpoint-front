import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorConnectionComponent } from './connection/error-connection/error-connection.component';
import { Error404Component } from './error404/error404.component';
import { TryAuthComponent } from './connection/try-auth/try-auth.component';
import { ProtectedPathComponent } from './protected-path/protected-path.component';
import { authGuard } from './shared/core/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "protected", component: ProtectedPathComponent, canActivate: [authGuard] },
  { path: "login", component: TryAuthComponent },
  { path: "error-connection", component: ErrorConnectionComponent },
  { path: "**", component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
