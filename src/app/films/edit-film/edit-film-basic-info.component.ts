import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Film } from '../film';

@Component({
  templateUrl: './edit-film-basic-info.component.html'
})
export class FilmEditBasicInfoComponent implements OnInit {
  @ViewChild(NgForm) filmForm: NgForm;

  errorMessage: string;
  film = { id: 1, filmName: 'test', filmCode: 'test' };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
}
