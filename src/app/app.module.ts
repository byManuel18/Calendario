import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarioComponent } from 'src/components/calendario/calendario.component';
import { LoadingComponent } from 'src/components/loading/loading.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingInterceptorService } from '../interceptors/loading-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    CalendarioComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
