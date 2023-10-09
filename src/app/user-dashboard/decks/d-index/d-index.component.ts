import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { DeckService } from 'src/app/_services/deck.service';
import { ApiSuccessService } from 'src/app/_subjects/api-success.service';
import { Deck, PaginationDeck } from 'src/app/models/deck.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-d-index',
  templateUrl: './d-index.component.html',
  styleUrls: ['./d-index.component.scss'],
})
export class DIndexComponent implements OnInit {
  deckList: Deck[] = [];
  currentPage: number = 1;
  total: number = 0;
  perPage: number = 9;
  private destroy$!: Subject<boolean>;

  constructor(
    private deckService: DeckService,
    private apiSuccessService: ApiSuccessService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.updateTag({
      name: 'description',
      content: 'Liste des paquets personnels de cartes de révision du japonais',
    });
    this.setTitle('Mes paquets-JapaneseFlashcard');
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.getdeck();
  }

  /**
   * Affiche une pop up confirmation de suppression
   * @param id
   */
  confirmDelete(id: string): void {
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

  //pagination
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
  //fin pagination

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  /**
   * Récupère les paquets de l'utilisateur
   */
  private getdeck(): void {
    this.deckService
      .getUserDecks(this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PaginationDeck) => {
        this.deckList = data.decks;
        if (data.total_items)
          this.total = Math.ceil(data.total_items / this.perPage);
      });
  }
  /**
   * Supprime le deck de l'utilisateur
   * @param id id du deck à supprimer
   */
  private delete(id: string): void {
    this.deckService.deleteUserDecks(id).subscribe((data: string) => {
      this.apiSuccessService.sendSuccess(data);
      this.getdeck();
    });
  }

  private setTitle(newTitle: string): void {
    this.title.setTitle(newTitle);
  }
}
