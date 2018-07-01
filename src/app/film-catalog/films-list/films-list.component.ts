import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';
import { getLocaleDateFormat, UpperCasePipe } from '@angular/common';
import { throws } from 'assert';

@Component({
  selector: '.films',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsComponent implements OnInit {
  films: object[];
  numberFilm: number = 0;
  paging: number = 6;
  sortTypeLast: boolean = false;
  douloud: string = "Загрузить еще";
  inputFilm: string;

  constructor(public filmsService: FilmService) {
  }
  ngOnInit() {
    this.sortFilms(true);
    this.numberFavoriteFilms();
  }
  numberFavoriteFilms() {
    this.numberFilm = this.newList.filter(item => item.favorite === true).length;
  }
  setUpdatedValue(eventParam) {
    this.numberFilm++;
  }
  setUnUpdatedValue(eventParam) {
    this.numberFilm--;
  }
  sortFilms(sortType: boolean) {
    if (!(sortType === this.sortTypeLast)) {
      this.paging = 6;
    }
    this.newList = this.filmsService.films.sort((a, b) => a.name.localeCompare(b.name));
    if (!sortType) {
      this.newList = this.filmsService.films.sort((a, b) => a.name.localeCompare(b.name));
      this.newList.reverse();
    }
    this.films = this.newList.slice(0, this.paging);
    console.log(this.films);
    this.sortTypeLast = sortType;
  }
  setPaging() {
    this.paging = this.paging + 6;
    if (this.paging <= this.filmsService.films.length) {
      this.sortFilms(this.sortTypeLast);

    } else {
      this.douloud = "Елементов больше нет";
    }
  }
  sortOneFilm(inp?: string) {
    this.films = (inp) ? this.filmsService.films.filter(film => film.name.toLowerCase().
      includes(inp.toLowerCase()) && film.name.toLowerCase().substring(0, 1) === inp.toLowerCase().
        substring(0, 1)) : this.filmsService.films;
  }
}


