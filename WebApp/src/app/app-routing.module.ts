import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewDetailsComponent } from './review-details/review-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'games', pathMatch: 'full'},
  {path: 'games', component: GamesComponent},
  {path: 'review', children: [
    {path: ':gameId', component: ReviewsComponent},
    {path: ':gameId/:reviewId', component: ReviewDetailsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
