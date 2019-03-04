import { FilmService } from './../film.service';
import { Film } from './../film';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/messages/message.service';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent {
  pageTitle = 'Modification de film';
  errorMessage: string;

  film: Film;

  constructor(private filmService: FilmService,
              private messageService: MessageService) { }

  getFilm(id: number): void {
    this.filmService.getFilm(id)
      .subscribe(
        (film: Film) => this.onFilmRetrieved(film),
        (error: any) => this.errorMessage = <any>error
      );
  }

  onFilmRetrieved(film: Film): void {
    this.film = film;

    if (!this.film) {
      this.pageTitle = 'Aucun film';
    } else {
      if (this.film.id === 0) {
        this.pageTitle = 'Ajouter un Film';
      } else {
        this.pageTitle = `Modifier le Film: ${this.film.filmName}`;
      }
    }
  }

  deleteFilm(): void {
    if (this.film.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.film.filmName} was deleted`);
    } else {
      if (confirm(`Confirmez vous la suppression le film : ${this.film.filmName}?`)) {
        this.filmService.deleteFilm(this.film.id)
          .subscribe(
            () => this.onSaveComplete(`${this.film.filmName} a été supprimé, j'espère que vous savez ce que vous faites`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveFilm(): void {
    if (true === true) {
      if (this.film.id === 0) {
        this.filmService.createFilm(this.film)
          .subscribe(
            () => this.onSaveComplete(`The new ${this.film.filmName} was saved`),
            (error: any) => this.errorMessage = <any>error
          );
      } else {
        this.filmService.updateFilm(this.film)
          .subscribe(
            () => this.onSaveComplete(`The updated ${this.film.filmName} was saved`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the film list
  }
}
