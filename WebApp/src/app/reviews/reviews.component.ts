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

  // Id of current game
  gameId: number;

  // Holds the game
  game: Game;

  // Holds reviews for this game
  reviews: Review[] = [];

  // Holds table data source
  dataSource: MatTableDataSource<Review>;

  // Table headers
  columns: string[] = ['reviewId', 'comments', 'score', 'isPlayed', 'isCompleted', 'delete'];

  // Used to sort table
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Constructor
   * @param _gamesService
   * @param _reviewsService
   * @param _route
   * @param _router
   */
  constructor(private _gamesService: GamesService,
              private _reviewsService: ReviewsService,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.gameId = Number(this._route.snapshot.paramMap.get('gameId'));
    console.log(this.gameId);
  }

  /**
   * Initialize page in init
   */
  ngOnInit() {
    this._gamesService.getById(this.gameId).subscribe(res => {
      this.game = JSON.parse(JSON.stringify(res));
      console.log(this.game);
    });

    this._reviewsService.getByGameId(this.gameId).subscribe(res => {
      console.log(res);
      this.reviews = JSON.parse(JSON.stringify(res));

      this.dataSource = new MatTableDataSource<Review>(this.reviews);
      this.dataSource.sort = this.sort;
    });
  }

  deleteReview(review: Review) {
    console.log(review);
    this._reviewsService.delete(review).subscribe(res => {
      console.log(res);
      this._router.navigate(['/review', this.gameId]);
    });
  }

  /**
   * Navigates to insert review pate
   */
  goToInsert() {
    this._router.navigate(['/review/new', this.gameId]);
  }

}
