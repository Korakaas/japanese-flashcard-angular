import { Component } from '@angular/core';
import { DeckService } from 'src/app/_services/deck.service';
import { Deck, PaginationDeck } from 'src/app/models/deck.model';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent {
  deckList:Deck[] = [];
  constructor(private deckService: DeckService){

  }
  ngOnInit(): void {
    this.deckService.getPublicDecks().subscribe(
      (data:PaginationDeck) => {
        this.deckList = data.decks;
        console.log(this.deckList)
      },
    )
  }
}
