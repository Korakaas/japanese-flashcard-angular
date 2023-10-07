import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { DeckService } from 'src/app/_services/deck.service';
import { TokenService } from 'src/app/_services/token.service';
import { ApiSuccessService } from 'src/app/_subjects/api-success.service';
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
  isLogged: boolean = false;
  private destroy$!: Subject<boolean>;
  constructor(
    private deckService: DeckService,
    private tokenService: TokenService,
    private apiSuccesService: ApiSuccessService,
    private meta: Meta
    , private title: Title
  ) {
    this.meta.updateTag(
      {
        name: 'description',
        content: "Liste des paquets publics",
      },
    );
    this.setTitle('Paquets Publics-JapaneseFlashcard');
  }

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.getdeck();
    this.isLogged = this.tokenService.isLogged();
  }

  duplicate(id: string) {
    this.deckService
      .duplicateDecks(id)
      .subscribe((data:string) => this.apiSuccesService.sendSuccess(data));
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
