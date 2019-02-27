import { FilmService } from './films/film.service';
import { FilmData } from './films/films-data';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ATeamComponent } from './a-team/a-team.component';
import { FilmsComponent } from './films/films.component';
import { EditFilmComponent } from './films/edit-film/edit-film.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ATeamComponent,
    FilmsComponent,
    EditFilmComponent
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(FilmData, { delay: 1000 }),
    BrowserModule
  ],
  providers: [FilmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
