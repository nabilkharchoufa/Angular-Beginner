import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Film } from '../film';

@Component({
  templateUrl: './edit-film-acteurs.component.html'
})
export class FilmEditActeursComponent implements OnInit {
  errorMessage: string;
  newActeurs = '';
  film = { id: 1007, acteurs: ['Abdelhadi di-Caprio'] };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  // Add the defined acteurs
  addActeurs(): void {
    if (!this.newActeurs) {
      this.errorMessage = `Ajouter les noms d'acteurs séparer de virgule et appuyer sur ajouter` ;
    } else {
      const acteurArray = this.newActeurs.split(',');
      this.film.acteurs = this.film.acteurs ? this.film.acteurs.concat(acteurArray) : acteurArray;
      this.newActeurs = '';
      this.errorMessage = '';
    }
  }

  // Remove the acteur from the array of acteurs.
  removeActeur(idx: number): void {
    this.film.acteurs.splice(idx, 1);
  }
}
