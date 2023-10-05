import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './_helpers/token.interceptor';
import { NotFoundComponent } from './_utils/not-found/not-found.component';
import { ServerErrorComponent } from './_utils/server-error/server-error.component';
import { ForbiddenComponent } from './_utils/forbidden/forbidden.component';
import { TimeOutComponent } from './_utils/time-out/time-out.component';
import { UnavailableComponent } from './_utils/unavailable/unavailable.component';
import { ManyRequestsComponent } from './_utils/many-requests/many-requests.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, ServerErrorComponent, ForbiddenComponent, TimeOutComponent, UnavailableComponent, ManyRequestsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
