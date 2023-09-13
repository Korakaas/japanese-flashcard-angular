import { Injectable } from '@angular/core';
import { Flashcard, PaginationFlashcard } from '../models/flashcard.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {

  constructor(private http: HttpClient) { }


   /*
    Récupère toutes les cartes du paquet de l'utilisateur
    @route GET ['/user/decks/{id}/flashcards']
  */
    getUserFlashcards(id:string): Observable<PaginationFlashcard> {
      return this.http.get<PaginationFlashcard>(environment.api + 'user/decks/' + id + '/flashcards');
    }
  
    /*
      Récupère une carte de l'utilisateur en fonction de son id et du deck
      @route GET ['/user/decks/{deckId}/flashcards/{flashcardId}']
    */
      getUserDetailFlashcard(deckId: string, flashcardId: string): Observable<Flashcard> {
      return this.http.get<Flashcard>(environment.api + 'user/decks/' + deckId + '/flashcards/' + flashcardId);
    }

    /*
      Met à jour une carte de l'utilisateur 
      @route PUT ['/user/decks/{deckId}/flashcards/{flashcardId}']
    */
      updatelFlashcard(deckId: string, flashcard: Flashcard): Observable<string> {
        return this.http.put<string>(environment.api + 'user/decks/' + deckId + '/flashcards/' + flashcard.id, flashcard);
      }
  
  
    /*
      Créer une carte 
      @route POST  ['/user/decks/{deckId}/flashcards']
    */
      createFlashcard(deckId: string,flashcard: Flashcard): Observable<string> {
      return this.http.post<string>(environment.api + 'user/decks/' + deckId + '/flashcards' , flashcard);
    }
  
    // /*
    //   Récupère un deck de l'utilisateur en fonction de son id
    //   @route GET ['/user/decks/id']
    // */
    // updateUserDecks(deck: Deck): Observable<string> {
    //   return this.http.put<string>(environment.api + 'user/decks/'+ deck.id, deck);
    // }
  
    // /*
    //   Récupère un deck de l'utilisateur en fonction de son id
    //   @route GET ['/user/decks/id']
    // */
    //   duplicateDecks(id: string): Observable<string> {
    //     return this.http.post<string>(environment.api + 'duplicate/decks/' + id, null);
    //   }
}



