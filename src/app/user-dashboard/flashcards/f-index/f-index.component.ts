import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FlashcardsService } from 'src/app/_services/flashcard.service';
import { ApiSuccessService } from 'src/app/_subjects/api-success.service';
import { Flashcard, PaginationFlashcard } from 'src/app/models/flashcard.model';
import Swal from 'sweetalert2';
interface FormatedInterval {
  day: number;
  hour: number;
  minute: number;
}

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
    private activated: ActivatedRoute,
    private apiSuccesService: ApiSuccessService
  ) {}
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.getFlashcard();
  }

  confirmDelete(id: string) {
    Swal.fire({
      title: 'Etes-vous sûr de vouloir supprimer ce paquet?',
      text: 'Le paquet et toutes les cartes associées setont supprimés définitivement',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      confirmButtonColor: '#256cb0',
    }).then((result) => {
      if (result.value) {
        this.delete(id);
      }
    });
  }

  private delete(flashcardId: string) {
    if (this.deckId) {
      this.flashcardService
        .deleteFlashcard(this.deckId, flashcardId)
        .subscribe((data: string) => {
          this.apiSuccesService.sendSuccess(data);
          this.getFlashcard();
        });
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
      let formatedInterval!: FormatedInterval;
      this.flashcardService
        .getUserFlashcards(this.deckId, this.currentPage)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: PaginationFlashcard) => {
          this.flashcardList = data.flashcards;
          this.flashcardList.forEach((flashcard) => {
            if (flashcard.knownLevel) {
              if ((flashcard.knownLevel as number) < 3) {
                flashcard.knownLevel = 'Nouvelle';
              } else if ((flashcard.knownLevel as number) < 8) {
                flashcard.knownLevel = 'En cours';
              } else {
                flashcard.knownLevel = 'Su';
              }
            }
            if (flashcard.intervalReview) {
              formatedInterval = this.formatInterval(flashcard.intervalReview as number);
              flashcard.intervalReview = `${formatedInterval.day}j ${formatedInterval.hour}h  ${formatedInterval.minute}min  `;
              console.log(flashcard.intervalReview)
            }
          });
          console.log(this.flashcardList);
          if (data.total_items)
            this.total = Math.ceil(data.total_items / this.perPage);
        });
    }
  }
  private formatInterval(interval: number) {
    const day = Math.floor(interval);
    const hour = Math.floor((interval - day) * 24);
    const minute = Math.floor(((interval - day) * 24 - hour) * 60);

    return { day, hour, minute };
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
