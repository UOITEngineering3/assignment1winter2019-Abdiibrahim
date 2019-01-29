export class Review {
  reviewId: number;
  comments: string;
  score: number;
  fkGameId: number;
  isPlayed: boolean;
  isCompleted: boolean;
}
