import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/constants';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Game[]> {
    return this._http.get<Game[]>(`${API_URL}/Games`);
  }

  getById(gameId: number): Observable<Game> {
    return this._http.get<Game>(`${API_URL}/Games/${gameId}`);
  }
}
