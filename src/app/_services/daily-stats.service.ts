import { Injectable } from '@angular/core';
import { DeckStats } from '../models/dailyStats.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root',
})
export class DailyStatsService {
  constructor(private http: HttpClient) {}

  /*
    Récupère toutes les statistiques de l'utilisateur
    @route GET ['/user/stats']
  */
  getUserStats(): Observable<DeckStats[]> {
    return this.http.get<DeckStats[]>(environment.api + 'user/stats/');
  }

  /*
    Récupère les statistiques d'un deck de l'utilisateur
    @route GET ['/user/decks/{deckId}/stats']
  */
  getDeckStats(deckId: string): Observable<DeckStats> {
    return this.http.get<DeckStats>(
      environment.api + 'user/decks/' + deckId + '/stats'
    );
  }

  /*
    Enregistre les statistiques d'un deck de l'utilisateur
    @route POST ['/user/decks/{deckId}/stats']
  */
  addDailyStats(deckId: string, review: Review): Observable<DeckStats> {
    return this.http.post<DeckStats>(
      environment.api + 'user/decks/' + deckId + '/stats',
      review
    );
  }
}
