import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';
import { HomeModule } from './home/home.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { MeComponent } from './me/me.component';
import { VoteModule } from './vote/vote.module';
import { LedModule } from './led/led.module';
import { GamesModule } from './games/games.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MeComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AccountModule,
    HomeModule,
    VoteModule,
    LedModule,
    GamesModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}