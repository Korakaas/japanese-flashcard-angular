import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DeckService } from 'src/app/_services/deck.service';
import { Deck } from 'src/app/models/deck.model';
import {
  Flashcard,
  FlashcardGrammar,
  FlashcardKanji,
  FlashcardVocabulary,
  Union,
} from 'src/app/models/flashcard.model';

@Component({
  selector: 'app-decks-detail',
  templateUrl: './decks-detail.component.html',
  styleUrls: ['./decks-detail.component.scss'],
})
export class DecksDetailComponent {
  deck!: Deck;
  flashcard!: Union | undefined;
  display: boolean = false;
  scores = [
    { label: 'Revoir', value: 1 },
    { label: 'Difficile', value: 2 },
    { label: 'Correct', value: 3 },
    { label: 'Facile', value: 4 },
    { label: 'Très facile', value: 5 },
  ];
  isFlashcardKanji!: (flashcard: Union) => flashcard is FlashcardKanji;
  isFlashcardVocab!: (flashcard: Union) => flashcard is FlashcardVocabulary;
  isFlashcardGrammar!: (flashcard: Union) => flashcard is FlashcardGrammar;
  private destroy$!: Subject<boolean>;

  constructor(
    private activated: ActivatedRoute,
    private deckService: DeckService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.updateTag({
      name: 'description',
      content: "Détail d'un paquet public avec un exemple de carte",
    });
    this.setTitle('Détail paquet-JapaneseFlashcard');
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    let id = this.activated.snapshot.paramMap.get('id');
    if (id) {
      this.deckService
        .getDecksDetail(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: Deck) => {
          {
            this.deck = data;
            this.flashcard = this.deck.flashcards;

            //détermine le type de la carte
            this.isFlashcardKanji = (
              flashcard: Union
            ): flashcard is FlashcardKanji => flashcard.type === 'kanji';
            this.isFlashcardVocab = (
              flashcard: Union
            ): flashcard is FlashcardVocabulary =>
              flashcard.type === 'vocabulary';
            this.isFlashcardGrammar = (
              flashcard: Union
            ): flashcard is FlashcardGrammar => flashcard.type === 'grammar';
          }
        });
    }
  }

  /**
   * Affiche le dos de la carte
   */
  displayBack(): void {
    this.display = !this.display;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  private setTitle(newTitle: string): void {
    this.title.setTitle(newTitle);
  }
}
