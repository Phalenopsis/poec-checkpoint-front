import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './shared/core/token.interceptor';
import { errorInterceptor } from './shared/core/error.interceptor';
import { TryAuthComponent } from './connection/try-auth/try-auth.component';
import { FormsModule } from '@angular/forms';
import { ErrorConnectionComponent } from './connection/error-connection/error-connection.component';
import { Error404Component } from './error404/error404.component';
import { ProtectedPathComponent } from './protected-path/protected-path.component';
import { TryRegisterComponent } from './connection/try-register/try-register.component';

@NgModule({
  declarations: [
    AppComponent,
    TryAuthComponent,
    ErrorConnectionComponent,
    Error404Component,
    ProtectedPathComponent,
    TryRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
