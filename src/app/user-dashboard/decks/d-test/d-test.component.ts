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

@Component({
  selector: 'app-d-test',
  templateUrl: './d-test.component.html',
  styleUrls: ['./d-test.component.scss'],
})
export class DTestComponent {
  flashcard!: Union | undefined;
  deckId: string | null = '';
  scores = [
    { label: 'Très difficile', value: 1 },
    { label: 'Difficile', value: 2 },
    { label: 'Ok', value: 3 },
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

  constructor(
    private activated: ActivatedRoute,
    private flashcardService: FlashcardsService,
    private dailyStatsService: DailyStatsService,
    private apiSuccessService: ApiSuccessService
  ) {}

  ngOnInit(): void {
    this.deckId = this.activated.snapshot.paramMap.get('id');
    console.log(this.deckId);
    if (this.deckId) {
      this.flashcardService
        .getFlashcardForTest(this.deckId)
        .subscribe((data: Test) => {
          console.log(data);

          this.flashcard = data.cards;
          console.log(this.flashcard);
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
          console.log(this.flashcard);

          this.totalCardCount = data.totalCardCount;
        });
    }
  }
  displayBack() {
    this.display = true;
    console.log(this.display);
  }
  submitScore(answer: number) {
    this.review.score = answer;
    if (this.deckId && this.flashcard?.id) {
      this.flashcardService
        .reviewFlashcard(this.deckId, this.flashcard.id, this.review)
        .subscribe((message: string) => {
          console.log(message);
          this.apiSuccessService.sendSuccess(message);
        });

      this.dailyStatsService
        .addDailyStats(this.deckId, this.review)
        .subscribe((data) => console.log(data));

      this.display = false;
      this.flashcard = undefined;
      this.ngOnInit();
    }
  }
}
