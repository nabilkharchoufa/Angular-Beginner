import { EditFilmComponent } from './edit-film/edit-film.component';
import { FilmsComponent } from './films.component';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    FilmsComponent,
    EditFilmComponent
  ]
})
export class FilmModule { }
