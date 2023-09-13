import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deck, PaginationDeck } from '../models/deck.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private http: HttpClient) {}

  /*
    Récupère tous les decks publics
    @route GET ['/decks']
  */
  getPublicDecks(): Observable<PaginationDeck> {
    return this.http.get<PaginationDeck>(environment.api + 'decks');
  }

  /*
    Récupère un deck en fonction de son id
    @route GET ['/decks/id']
  */
  getDecksDetail(id: string): Observable<Deck> {
    return this.http.get<Deck>(environment.api + 'decks/' + id);
  }

  /*
    Récupère tous les decks de l'utilisateur
    @route GET ['/user/decks']
  */
  getUserDecks(): Observable<PaginationDeck> {
    return this.http.get<PaginationDeck>(environment.api + 'user/decks');
  }

  /*
    Récupère un deck de l'utilisateur en fonction de son id
    @route GET ['/user/decks/id']
  */
  getUserDecksDetail(id: string): Observable<Deck> {
    return this.http.get<Deck>(environment.api + 'user/decks/' + id);
  }

  /*
    Récupère un deck de l'utilisateur en fonction de son id
    @route GET ['/user/decks/id']
  */
  deleteUserDecks(id: string): Observable<string> {
    return this.http.delete<string>(environment.api + 'user/decks/' + id);
  }

  /*
    Récupère un deck de l'utilisateur en fonction de son id
    @route GET ['/user/decks/id']
  */
  createUserDecks(deck: Deck): Observable<Deck> {
    return this.http.post<Deck>(environment.api + 'user/decks', deck);
  }

  /*
    Récupère un deck de l'utilisateur en fonction de son id
    @route GET ['/user/decks/id']
  */
  updateUserDecks(deck: Deck): Observable<string> {
    return this.http.put<string>(environment.api + 'user/decks/'+ deck.id, deck);
  }

  /*
    Récupère un deck de l'utilisateur en fonction de son id
    @route GET ['/user/decks/id']
  */
    duplicateDecks(id: string): Observable<string> {
      return this.http.post<string>(environment.api + 'duplicate/decks/' + id, null);
    }
}
