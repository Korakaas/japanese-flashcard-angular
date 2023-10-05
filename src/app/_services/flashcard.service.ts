import { Injectable } from '@angular/core';
import { Flashcard, PaginationFlashcard } from '../models/flashcard.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Review, Test } from '../models/review.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class FlashcardsService {
  constructor(private http: HttpClient) {}

  /*
    Récupère toutes les cartes du paquet de l'utilisateur
    @route GET ['/user/decks/{id}/flashcards']
  */
  getUserFlashcards(
    deckIdid: string,
    page: number
  ): Observable<PaginationFlashcard> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<PaginationFlashcard>(
      environment.api + 'user/decks/' + deckIdid + '/flashcards',
      { params }
    );
  }

  /*
      Récupère une carte de l'utilisateur en fonction de son id et du deck
      @route GET ['/user/decks/{deckId}/flashcards/{flashcardId}']
    */
  getUserDetailFlashcard(
    deckId: string,
    flashcardId: string
  ): Observable<Flashcard> {
    return this.http.get<Flashcard>(
      environment.api + 'user/decks/' + deckId + '/flashcards/' + flashcardId
    );
  }

  /*
      Met à jour une carte de l'utilisateur 
      @route PUT ['/user/decks/{deckId}/flashcards/{flashcardId}']
    */
  updatelFlashcard(deckId: string, flashcard: Flashcard): Observable<string> {
    return this.http.put<string>(
      environment.api + 'user/decks/' + deckId + '/flashcards/' + flashcard.id,
      flashcard
    );
  }

  /*
      Créer une carte 
      @route POST  ['/user/decks/{deckId}/flashcards']
    */
  createFlashcard(deckId: string, flashcard: Flashcard): Observable<string> {
    return this.http.post<string>(
      environment.api + 'user/decks/' + deckId + '/flashcards',
      flashcard
    );
  }

  /*
    Supprime une carte de l'utilisateur en fonction de son id
    @route DELETE ['/user/decks/deckId/flashcards/flashcardId']
  */
  deleteFlashcard(deckId: string, flashcardId: string): Observable<string> {
    return this.http.delete<string>(
      environment.api + 'user/decks/' + deckId + '/flashcards/' + flashcardId
    );
  }

  /*
    Récupère une carte du deck prête pour la révision
    @route GET ['/user/decks/deckId/test']
  */
  getFlashcardForTest(deckId: string): Observable<Test | Message> {
    return this.http.get<Test>(
      environment.api + 'user/decks/' + deckId + '/test/'
    );
  }

  /*
    Enregistre les résultats de la révision
    @route POST ['/user/decks/deckId/flashcards/flashcardId/review']
  */
  reviewFlashcard(
    deckId: string,
    flashcardId: string,
    score: Review
  ): Observable<string> {
    return this.http.post<string>(
      environment.api +
        'user/decks/' +
        deckId +
        '/flashcards/' +
        flashcardId +
        '/review',
      score
    );
  }
}
