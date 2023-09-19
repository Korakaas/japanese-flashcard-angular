import { Component, OnInit } from '@angular/core';
import { DeckService } from 'src/app/_services/deck.service';
import { Deck, PaginationDeck } from 'src/app/models/deck.model';

@Component({
  selector: 'app-d-index',
  templateUrl: './d-index.component.html',
  styleUrls: ['./d-index.component.scss'],
})
export class DIndexComponent implements OnInit {
  deckList: Deck[] = [];
  constructor(private deckService: DeckService) {}
  ngOnInit(): void {
    this.deckService.getUserDecks().subscribe((data: PaginationDeck) => {
      this.deckList = data.decks;
      console.log(this.deckList);
    });
  }

  delete(id: string) {
    this.deckService.deleteUserDecks(id).subscribe((data) => console.log(data));
    this.deckService.getUserDecks().subscribe((data: PaginationDeck) => {
      this.deckList = data.decks;
      console.log(this.deckList);
    });
  }
}
