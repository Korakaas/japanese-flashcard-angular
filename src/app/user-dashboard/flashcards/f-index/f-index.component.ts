import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardsService } from 'src/app/_services/flashcard.service';
import { Flashcard, PaginationFlashcard } from 'src/app/models/flashcard.model';

@Component({
  selector: 'app-f-index',
  templateUrl: './f-index.component.html',
  styleUrls: ['./f-index.component.scss'],
})
export class FIndexComponent {
  flashcardList: Flashcard[] = [];
  deckId: string | null = '';

  constructor(
    private flashcardService: FlashcardsService,
    private activated: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.deckId = this.activated.snapshot.paramMap.get('deckId');
    if (this.deckId) {
      this.flashcardService
        .getUserFlashcards(this.deckId)
        .subscribe((data: PaginationFlashcard) => {
          this.flashcardList = data.flashcards;
          console.log(this.flashcardList);
        });
    }
  }

  delete(flashcardId: string) {
    if (this.deckId) {
      this.flashcardService
        .deleteFlashcard(this.deckId, flashcardId)
        .subscribe((data) => console.log(data));
      this.flashcardService
        .getUserFlashcards(this.deckId)
        .subscribe((data: PaginationFlashcard) => {
          this.flashcardList = data.flashcards;
          console.log(this.flashcardList);
        });
    }
  }
}
