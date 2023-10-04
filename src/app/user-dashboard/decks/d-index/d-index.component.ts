import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DeckService } from 'src/app/_services/deck.service';
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

  constructor(private deckService: DeckService) {}
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.getdeck();
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
    this.deckService
      .getUserDecks(this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PaginationDeck) => {
        this.deckList = data.decks;
        if (data.total_items)
          this.total = Math.ceil(data.total_items / this.perPage);
      });
  }

  private delete(id: string) {
    this.deckService.deleteUserDecks(id).subscribe((data) => this.getdeck());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
