import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../shared/services/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../shared/models/review.model';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss']
})
export class ReviewDetailsComponent implements OnInit {

  reviewId: number;

  gameId: number;

  review: Review;

  constructor(private _reviewsService: ReviewsService,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.reviewId = Number(this._route.snapshot.paramMap.get('reviewId'));
    this.gameId = Number(this._route.snapshot.paramMap.get('gameId'));
    console.log(this.reviewId);
  }

  ngOnInit() {
    this._reviewsService.getByReviewId(this.gameId, this.reviewId).subscribe(res => {
      this.review = res;
      console.log(this.review);
    });
  }

}
