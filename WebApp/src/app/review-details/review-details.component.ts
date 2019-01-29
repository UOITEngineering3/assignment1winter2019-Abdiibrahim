import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../shared/services/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../shared/models/review.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss']
})
export class ReviewDetailsComponent implements OnInit {

  gameId: number;

  review: Review = new Review();

  form: FormGroup = new FormGroup({
    reviewId: new FormControl(''),
    comments: new FormControl(''),
    score: new FormControl(''),
    isPlayed: new FormControl(''),
    isCompleted: new FormControl('')
  });

  constructor(private _reviewsService: ReviewsService,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.gameId = Number(this._route.snapshot.paramMap.get('gameId'));
    console.log(this.gameId);
  }

  ngOnInit() {
    this.review.isPlayed = false;
    this.review.isCompleted = false;
  }

  insertReview() {
    this.review.fkGameId = this.gameId;
    this.review.reviewId = this.form.get('reviewId').value;
    this.review.comments = this.form.get('comments').value;
    this.review.score = this.form.get('score').value;
    if (this.form.get('isPlayed').value === '') {
      this.review.isPlayed = false;
    } else {
      this.review.isPlayed = this.form.get('isPlayed').value;
    }

    if (this.form.get('isCompleted').value === '') {
      this.review.isCompleted = false;
    } else {
      this.review.isCompleted = this.form.get('isCompleted').value;
    }

    console.log(this.review);

    this._reviewsService.insert(this.review).subscribe(res => console.log(res), error => (console.error(error)));
  }

  goBack() {
    this._router.navigate(['/review', this.gameId]);
  }

}
