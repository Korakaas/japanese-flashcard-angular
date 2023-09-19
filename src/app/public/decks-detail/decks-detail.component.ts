import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from 'src/app/_services/deck.service';
import { Deck } from 'src/app/models/deck.model';

@Component({
  selector: 'app-decks-detail',
  templateUrl: './decks-detail.component.html',
  styleUrls: ['./decks-detail.component.scss'],
})
export class DecksDetailComponent {
  deck!: Deck;

  constructor(
    private activated: ActivatedRoute,
    private deckService: DeckService
  ) {}

  ngOnInit(): void {
    let id = this.activated.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.deckService.getDecksDetail(id).subscribe((data: Deck) => {
        this.deck = data;
        console.log(this.deck);
      });
    }
  }
}
