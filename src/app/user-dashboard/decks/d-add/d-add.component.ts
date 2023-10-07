import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { DeckService } from 'src/app/_services/deck.service';
import { ApiSuccessService } from 'src/app/_subjects/api-success.service';
import { Deck } from 'src/app/models/deck.model';

@Component({
  selector: 'app-d-add',
  templateUrl: './d-add.component.html',
  styleUrls: ['./d-add.component.scss'],
})
export class DAddComponent {
  deck: Deck = new Deck();
  deckForm!: FormGroup;
  name = new FormControl('', [Validators.required, Validators.maxLength(40)]);
  description = new FormControl('');
  public = new FormControl(false);
  private destroy$!: Subject<boolean>;

  constructor(
    private deckService: DeckService,
    private formbuilder: FormBuilder,
    private apiSuccessService: ApiSuccessService,
    private meta: Meta,
   private title: Title
  ) {
    this.meta.updateTag(
      {
        name: 'description',
        content: "Créer un paquet de carte de révision du japonais",
      },
    );
    this.setTitle('Créer paquet-JapaneseFlashcard');
  }
  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.deckForm = this.formbuilder.group({
      name: this.name,
      description: this.description,
      public: this.public,
    });
  }

  onSubmit() {
    if (this.deckForm.valid) {
      this.deck = {
        name: this.deckForm.value.name,
        description: this.deckForm.value.description,
        public: this.deckForm.value.public,
      };

      this.deckService
        .createUserDecks(this.deck)
        .pipe(takeUntil(this.destroy$))
        .subscribe((message: string) => {
          this.apiSuccessService.sendSuccess(message);
          this.deckForm.reset();
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
