import { Component, OnInit } from '@angular/core';
import { DeckService } from '../_services/deck.service';
import { Deck } from '../models/deck.model';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  
  public decks:Deck[] = [];
  constructor(private deckService: DeckService) { }

  ngOnInit(): void {
    this.deckService.getPublicDecks().subscribe(decksPagination => {
      this.decks = decksPagination.decks
    } );
  }
}
