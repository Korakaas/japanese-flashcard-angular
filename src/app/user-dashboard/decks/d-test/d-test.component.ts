import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FlashcardGrammar,
  FlashcardKanji,
  FlashcardVocabulary,
  Union,
} from 'src/app/models/flashcard.model';
import { FlashcardsService } from 'src/app/_services/flashcard.service';
import { Review, Test } from 'src/app/models/review.model';
import { DailyStatsService } from 'src/app/_services/daily-stats.service';
import { ApiSuccessService } from 'src/app/_subjects/api-success.service';
import { Message } from 'src/app/models/message.model';
import { Subject, takeUntil } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-d-test',
  templateUrl: './d-test.component.html',
  styleUrls: ['./d-test.component.scss'],
})
export class DTestComponent {
  flashcard!: Union | undefined;
  deckId: string | null = '';
  scores = [
    { label: 'Revoir', value: 1 },
    { label: 'Difficile', value: 2 },
    { label: 'Correct', value: 3 },
    { label: 'Facile', value: 4 },
    { label: 'Très facile', value: 5 },
  ];
  display: boolean = false;
  type: string = '';
  isFlashcardKanji!: (flashcard: Union) => flashcard is FlashcardKanji;
  isFlashcardVocab!: (flashcard: Union) => flashcard is FlashcardVocabulary;
  isFlashcardGrammar!: (flashcard: Union) => flashcard is FlashcardGrammar;
  review: Review = new Review();
  totalCardCount: number | undefined = undefined;
  message: string | undefined = '';
  private destroy$!: Subject<boolean>;

  constructor(
    private activated: ActivatedRoute,
    private flashcardService: FlashcardsService,
    private dailyStatsService: DailyStatsService,
    private apiSuccessService: ApiSuccessService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.updateTag({
      name: 'description',
      content: 'Révision du japonais',
    });
    this.setTitle('Révision-JapaneseFlashcard');
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.deckId = this.activated.snapshot.paramMap.get('id');
    if (this.deckId) {
      this.flashcardService
        .getFlashcardForTest(this.deckId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: Test | Message) => {
          //determine le type de la carte
          if ('cards' in data) {
            this.flashcard = data.cards;
            this.isFlashcardKanji = (
              flashcard: Union
            ): flashcard is FlashcardKanji => this.flashcard?.type === 'kanji';
            this.isFlashcardVocab = (
              flashcard: Union
            ): flashcard is FlashcardVocabulary =>
              this.flashcard?.type === 'vocabulary';
            this.isFlashcardGrammar = (
              flashcard: Union
            ): flashcard is FlashcardGrammar =>
              this.flashcard?.type === 'grammar';
            this.totalCardCount = data.totalCardCount;
          } else {
            this.message = (data as Message).message;
          }
        });
    }
  }
  /**
   * Affiche le dos de la carte
   */
  displayBack(): void {
    this.display = true;
    console.log(this.display);
  }

  /**
   * Envoie le score de l'utilisateur
   * Enregistreles stats de révision de la carte
   * @param answer la réponse de l'utilisateur
   */
  submitScore(answer: number): void {
    this.review.score = answer;
    if (this.deckId && this.flashcard?.id) {
      this.flashcardService
        .reviewFlashcard(this.deckId, this.flashcard.id, this.review)
        .pipe(takeUntil(this.destroy$))
        .subscribe((message: string) => {
          this.apiSuccessService.sendSuccess(message);
        });

      this.dailyStatsService
        .addDailyStats(this.deckId, this.review)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => console.log(data));

      this.display = false;
      this.flashcard = undefined;
      this.ngOnInit();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  private setTitle(newTitle: string): void {
    this.title.setTitle(newTitle);
  }
}
