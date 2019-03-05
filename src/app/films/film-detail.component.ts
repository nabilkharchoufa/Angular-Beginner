import { Component } from '@angular/core';

import { Film } from './film';
import { FilmService } from './film.service';

@Component({
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent {
  pageTitle = 'Film Detail';
  film: Film;
  errorMessage: string;

  constructor(private filmService: FilmService) { }

  getFilm(id: number) {
    this.filmService.getFilm(id).subscribe(
      film => this.onFilmRetrieved(film),
      error => this.errorMessage = <any>error);
  }

  onFilmRetrieved(film: Film): void {
    this.film = film;

    if (this.film) {
      this.pageTitle = `Film Detail: ${this.film.filmName}`;
    } else {
      this.pageTitle = 'No film found';
    }
  }
}
