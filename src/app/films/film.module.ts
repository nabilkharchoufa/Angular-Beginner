import { FilmDetailComponent } from './film-detail.component';
import { RouterModule } from '@angular/router';
import { EditFilmComponent } from './edit-film/edit-film.component';
import { FilmsComponent } from './films.component';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
    {path: 'films', component: FilmsComponent}
    ])
  ],
  declarations: [
    FilmsComponent,
    FilmDetailComponent,
    EditFilmComponent
  ]
})
export class FilmModule { }
