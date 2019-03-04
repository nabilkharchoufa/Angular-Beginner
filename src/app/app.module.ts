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
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ATeamComponent,
    PageNotFoundComponent
  ],
  imports: [
    SharedModule,
    FilmModule,
    UserModule,
    MessageModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(FilmData, { delay: 1000 }),
    RouterModule.forRoot([
      { path: 'welcome', component: ATeamComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]),
    BrowserModule
  ],
  providers: [FilmService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
