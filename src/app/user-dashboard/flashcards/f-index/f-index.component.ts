import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
    private apiSuccesService: ApiSuccessService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.updateTag({
      name: 'description',
      content:
        'Liste des cartes personnelles de type vocabulaire, grammaire ou kanji',
    });
    this.setTitle('Mes cartes-JapaneseFlashcard');
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.getFlashcard();
  }

  /**
   * Affiche une pop de confirmation de suppression
   * @param id id de la carte à supprimer
   */
  confirmDelete(id: string): void {
    Swal.fire({
      title: 'Etes-vous sûr de vouloir supprimer ce paquet?',
      text: 'Le paquet et toutes les cartes associées seront supprimés définitivement',
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

  //pagination
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  /**
   * Supprime une carte
   * @param flashcardId id de la carte à supprimer
   */
  private delete(flashcardId: string): void {
    if (this.deckId) {
      this.flashcardService
        .deleteFlashcard(this.deckId, flashcardId)
        .subscribe((data: string) => {
          this.apiSuccesService.sendSuccess(data);
          this.getFlashcard();
        });
    }
  }

  private setTitle(newTitle: string): void {
    this.title.setTitle(newTitle);
  }

  /**
   * Récupère les cartes du paquet
   */
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
            if (flashcard.knownLevel || (flashcard.knownLevel as number) === 0) {
              if ( (flashcard.knownLevel as number) <= 3 || (flashcard.knownLevel as number) === 0) {
                flashcard.knownLevel = 'Nouvelle';
              } else if ((flashcard.knownLevel as number) <= 8) {
                flashcard.knownLevel = 'En cours';
              } else {
                flashcard.knownLevel = 'Su';
              }
            }
            if (flashcard.intervalReview) {
              formatedInterval = this.formatInterval(
                flashcard.intervalReview as number
              );
              flashcard.intervalReview ='';
              if(formatedInterval.day)
              {
                flashcard.intervalReview =`${formatedInterval.day}j`;
              }
              if(formatedInterval.hour)
              {
                flashcard.intervalReview +=` ${formatedInterval.hour}h`;
              }
              if(formatedInterval.minute)
              {
                flashcard.intervalReview +=` ${formatedInterval.minute}min`;
              }
            }
          });
          if (data.total_items)
            this.total = Math.ceil(data.total_items / this.perPage);
        });
    }
  }

  /**
   * Formatte la durée de l'interval en jour, heure et minutes
   * @param interval
   * @returns FormatedInterval
   */
  private formatInterval(interval: number): FormatedInterval {
    const day = Math.floor(interval);
    const hour = Math.floor((interval - day) * 24);
    const minute = Math.floor(((interval - day) * 24 - hour) * 60);

    return { day, hour, minute };
  }
}
