import { Component, OnInit } from '@angular/core';

import { Film } from './film';
import { FilmService } from './film.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
  pageTitle = 'Film Detail';
  film: Film;
  errorMessage: string;

  constructor(private filmService: FilmService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // TODO UNSUBSCRIBE
    this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getFilm(id);
      }
    );
  }

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
