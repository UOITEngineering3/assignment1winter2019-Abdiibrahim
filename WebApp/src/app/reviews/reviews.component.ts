import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewsService } from '../shared/services/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../shared/models/game.model';
import { Review } from '../shared/models/review.model';
import { GamesService } from '../shared/services/games.service';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  gameId: number;

  game: Game;

  reviews: Review[] = [];

  dataSource: MatTableDataSource<Review>;

  columns: string[] = ['reviewId', 'comments', 'score', 'isPlayed', 'isCompleted'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _gamesService: GamesService,
              private _reviewsService: ReviewsService,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.gameId = Number(this._route.snapshot.paramMap.get('gameId'));
    console.log(this.gameId);
  }

  ngOnInit() {
    this._gamesService.getById(this.gameId).subscribe(res => {
      this.game = res;
      console.log(this.game);
    });

    this._reviewsService.getByGameId(this.gameId).subscribe(res => {
      console.log(res);
      this.reviews = res;

      this.dataSource = new MatTableDataSource<Review>(this.reviews);
      this.dataSource.sort = this.sort;
    });
  }

  goToReviewDetails(reviewId: number) {
    console.log(reviewId);
    this._router.navigate(['/review', this.gameId, reviewId]);
  }

}
