import { Component, OnInit, ViewChild } from '@angular/core';
import { Game } from '../shared/models/game.model';
import { GamesService } from '../shared/services/games.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games: Game[] = [];

  dataSource: MatTableDataSource<Game>;

  columns: string[] = ['gameId', 'name', 'genre', 'releaseDate'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _gamesService: GamesService,
              private _router: Router) { }

  ngOnInit() {
    this._gamesService.getAll().subscribe(res => {
      this.games = res;
      console.log(this.games);

      this.dataSource = new MatTableDataSource<Game>(this.games);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToReviews(gameId: number) {
    console.log(gameId);
    this._router.navigate(['/review', gameId]);
  }

}
