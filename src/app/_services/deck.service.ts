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
    Supprime un deck de l'utilisateur en fonction de son id
    @route DELETE ['/user/decks/id']
  */
  deleteUserDecks(id: string): Observable<string> {
    return this.http.delete<string>(environment.api + 'user/decks/' + id);
  }

  /*
    Créer un nouveau deck 
    @route POST ['/user/decks']
  */
  createUserDecks(deck: Deck): Observable<Deck> {
    return this.http.post<Deck>(environment.api + 'user/decks', deck);
  }

  /*
    Met à jour un deck de l'utilisateur en fonction de son id
    @route PUT ['/user/decks/id']
  */
  updateUserDecks(deck: Deck): Observable<string> {
    return this.http.put<string>(
      environment.api + 'user/decks/' + deck.id,
      deck
    );
  }

  /*
    Créer un nouveau deck en copiant un deck publique
    @route POST ['/duplicate/decks/id']
  */
  duplicateDecks(id: string): Observable<string> {
    return this.http.post<string>(
      environment.api + 'duplicate/decks/' + id,
      null
    );
  }
}
