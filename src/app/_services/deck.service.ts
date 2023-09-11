import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationDeck } from '../models/deck.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private http: HttpClient) { }
  private baseUrl = environment.api + 'decks';

  /*
    Récupère tous les decks publics
    @route GET ['/decks']
  */
    getPublicDecks():Observable<PaginationDeck>
    {
      
      return this.http.get<PaginationDeck>(this.baseUrl)
    }
}
