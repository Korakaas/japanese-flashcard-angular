import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DeckService } from 'src/app/_services/deck.service';
import { Deck, PaginationDeck } from 'src/app/models/deck.model';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
})
export class DecksComponent {
  deckList: Deck[] = [];
  currentPage: number = 1;
  total: number = 0;
  perPage: number = 9;
  private destroy$!: Subject<boolean>;
  constructor(private deckService: DeckService) {}
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.getdeck();
  }

  duplicate(id: string) {
    this.deckService.duplicateDecks(id).subscribe((data) => console.log(data));
  }

  public onGoTo(page: number): void {
    this.currentPage = page;
    this.getdeck();
  }

  public onNext(page: number): void {
    this.currentPage = page + 1;
    this.getdeck();
  }

  public onPrevious(page: number): void {
    this.currentPage = page - 1;
    this.getdeck();
  }

  private getdeck(): void {
    console.log(this.deckList);

    this.deckService
      .getPublicDecks(this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PaginationDeck) => {
        this.deckList = data.decks;
        console.log(this.deckList);
        if (data.total_items)
          this.total = Math.ceil(data.total_items / this.perPage);
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
