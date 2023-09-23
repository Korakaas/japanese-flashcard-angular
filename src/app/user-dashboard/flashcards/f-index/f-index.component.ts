import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
  currentPage: number = 1;
  total: number = 0;
  perPage: number = 9;
  private destroy$!: Subject<boolean>;

  constructor(
    private flashcardService: FlashcardsService,
    private activated: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.getFlashcard()

  }

  delete(flashcardId: string) {
    if (this.deckId) {
      this.flashcardService
        .deleteFlashcard(this.deckId, flashcardId)
        .subscribe((data) => console.log(data));
      this.getFlashcard();
    }
  }

  public onGoTo(page: number): void {
    this.currentPage = page;
    this.getFlashcard();
  }

  public onNext(page: number): void {
    this.currentPage = page + 1;
    this.getFlashcard();
  }

  public onPrevious(page: number): void {
    this.currentPage = page - 1;
    this.getFlashcard();
  }

  private getFlashcard(): void {
    this.deckId = this.activated.snapshot.paramMap.get('deckId');

    if (this.deckId) {
      this.flashcardService
        .getUserFlashcards(this.deckId, this.currentPage)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: PaginationFlashcard) => {
          this.flashcardList = data.flashcards;
          console.log(this.flashcardList);
          if (data.total_items)
          this.total = Math.ceil(data.total_items / this.perPage);
          console.log(data.total_items)
          console.log(this.total)


        });
    }
    
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
