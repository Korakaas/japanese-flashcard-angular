import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FlashcardsService } from 'src/app/_services/flashcard.service';
import { ApiSuccessService } from 'src/app/_subjects/api-success.service';
import { Flashcard } from 'src/app/models/flashcard.model';

@Component({
  selector: 'app-f-add',
  templateUrl: './f-add.component.html',
  styleUrls: ['./f-add.component.scss'],
})
export class FAddComponent implements OnInit {
  cardType = [
    { value: 'kanji', label: 'Kanji' },
    { value: 'vocabulary', label: 'Vocabulaire' },
    { value: 'grammar', label: 'Grammaire' },
  ];
  typeFlashcard: string = '';
  flashcardForm!: FormGroup;
  flashcardTypeForm!: FormGroup;
  front = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  back = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  example = new FormControl('', Validators.maxLength(255));
  furigana = new FormControl('', Validators.maxLength(255));
  type = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  reverse = new FormControl(false);
  synonym = new FormControl('', Validators.maxLength(255));
  antonym = new FormControl('', Validators.maxLength(255));
  mnemotic = new FormControl('', Validators.maxLength(255));
  onyomi = new FormControl('', Validators.maxLength(60));
  kunyomi = new FormControl('', Validators.maxLength(60));
  construction = new FormControl('', Validators.maxLength(255));
  grammarnotes = new FormControl('', Validators.maxLength(255));
  deckId: string | null = '';
  private destroy$!: Subject<boolean>;

  constructor(
    private activated: ActivatedRoute,
    private flashcardService: FlashcardsService,
    private formbuilder: FormBuilder,
    private apiSuccesService: ApiSuccessService
  ) {}
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.flashcardForm = this.formbuilder.group({
      front: this.front,
      back: this.back,
      example: this.example,
      furigana: this.furigana,
      type: this.type,
      flashcardTypeForm: this.formbuilder.group({}),
      reverse: this.reverse,
    });
    this.deckId = this.activated.snapshot.paramMap.get('deckId');
  }
  onselectchange(test: any) {
    this.typeFlashcard = test.target.value;
    this.initializeFlashcardForm();
  }
  initializeFlashcardForm() {
    this.flashcardTypeForm = this.formbuilder.group({});

    switch (this.typeFlashcard) {
      case 'vocabulary':
        this.flashcardTypeForm.addControl('synonym', this.synonym);
        this.flashcardTypeForm.addControl('antonym', this.antonym);
        break;
      case 'kanji':
        this.flashcardTypeForm.addControl('mnemotic', this.mnemotic);
        this.flashcardTypeForm.addControl('onyomi', this.onyomi);
        this.flashcardTypeForm.addControl('kunyomi', this.kunyomi);
        break;
      case 'grammar':
        this.flashcardTypeForm.addControl('construction', this.construction);
        this.flashcardTypeForm.addControl('grammarnotes', this.grammarnotes);
        break;

      default:
        console.error('Le type de la carte est inconnu');
        break;
    }

    this.flashcardForm.setControl('flashcardTypeForm', this.flashcardTypeForm);
  }
  onSubmit() {
    if (this.flashcardForm.valid) {
      const newFlashcard: Flashcard = {};
      Object.assign(newFlashcard, this.flashcardForm.value);
      Object.assign(newFlashcard, this.flashcardForm.value.flashcardTypeForm);
      if (this.deckId) {
        this.flashcardService
          .createFlashcard(this.deckId, newFlashcard)
          .pipe(takeUntil(this.destroy$))
          .subscribe((message: string) => {
            this.apiSuccesService.sendSuccess(message);
            this.flashcardForm.reset();
          });
      }
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
