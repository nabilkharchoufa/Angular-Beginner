import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { FilmModule } from './films/film.module';
import { MessageService } from './messages/message.service';
import { FilmService } from './films/film.service';
import { FilmData } from './films/films-data';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ATeamComponent } from './a-team/a-team.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    ATeamComponent,
    PageNotFoundComponent
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    InMemoryWebApiModule.forRoot(FilmData, { delay: 1000, passThruUnknownUrl: true }),
    FilmModule,
    UserModule,
    MessageModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [FilmService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
