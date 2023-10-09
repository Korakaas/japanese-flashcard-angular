import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DeckService } from 'src/app/_services/deck.service';
import { ApiSuccessService } from 'src/app/_subjects/api-success.service';
import { Deck } from 'src/app/models/deck.model';

@Component({
  selector: 'app-d-edit',
  templateUrl: './d-edit.component.html',
  styleUrls: ['./d-edit.component.scss'],
})
export class DEditComponent implements OnInit {
  deck!: Deck;
  deckForm!: FormGroup;
  name = new FormControl('', [Validators.required, Validators.maxLength(40)]);
  description = new FormControl('');
  public = new FormControl(false);
  private destroy$!: Subject<boolean>;

  constructor(
    private activated: ActivatedRoute,
    private deckService: DeckService,
    private formbuilder: FormBuilder,
    private apiSuccessService: ApiSuccessService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.updateTag({
      name: 'description',
      content: 'Modifier un paquet de cartes de révision du japonais',
    });
    this.setTitle('Modifier paquet-JapaneseFlashcard');
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();

    this.deckForm = this.formbuilder.group({
      name: this.name,
      description: this.description,
      public: this.public,
    });
    let id = this.activated.snapshot.paramMap.get('id');
    if (id) {
      this.deckService
        .getUserDecksDetail(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: Deck) => {
          this.deck = data;
          this.initializeDeckForm(this.deck);
        });
    }
  }

  /**
   * Remplit le formulaire avec les données du paquet
   * @param deck
   */
  initializeDeckForm(deck: Deck): void {
    this.deckForm.patchValue({
      name: deck.name,
      description: deck.description,
      public: deck.public,
    });
  }

  /**
   * Modification du paquet si formulaire valide
   */
  onSubmit(): void {
    if (this.deckForm.valid) {
      this.deck.name = this.deckForm.value.name;
      this.deck.description = this.deckForm.value.description;
      this.deck.public = this.deckForm.value.public;

      this.deckService
        .updateUserDecks(this.deck)
        .pipe(takeUntil(this.destroy$))
        .subscribe((message: string) =>
          this.apiSuccessService.sendSuccess(message)
        );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  private setTitle(newTitle: string): void {
    this.title.setTitle(newTitle);
  }
}
