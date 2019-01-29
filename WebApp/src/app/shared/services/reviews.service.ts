import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { API_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Review[]> {
    return this._http.get<Review[]>(`${API_URL}/Reviews`);
  }

  getByReviewId(gameId: number, reviewId: number): Observable<Review> {
    return this._http.get<Review>(`${API_URL}/Reviews/${gameId}/${reviewId}`);
  }

  getByGameId(gameId: number): Observable<Review> {
    return this._http.get<Review>(`${API_URL}/Reviews/${gameId}`);
  }

  insert(review: Review): Observable<Review> {
    return this._http.post<Review>(`${API_URL}/Reviews`, review);
  }

  update(review: Review): Observable<Review> {
    return this._http.put<Review>(`${API_URL}/Reviews/${review.reviewId}`, review);
  }

  delete(review: Review): Observable<Review> {
    return this._http.delete<Review>(`${API_URL}/Reviews/${review.reviewId}`);
  }
}
