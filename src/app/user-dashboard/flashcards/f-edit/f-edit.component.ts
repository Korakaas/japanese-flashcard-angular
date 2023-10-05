import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FlashcardsService } from 'src/app/_services/flashcard.service';
import { ApiSuccessService } from 'src/app/_subjects/api-success.service';
import {
  Flashcard,
  FlashcardGrammar,
  FlashcardKanji,
  FlashcardVocabulary,
} from 'src/app/models/flashcard.model';

@Component({
  selector: 'app-f-edit',
  templateUrl: './f-edit.component.html',
  styleUrls: ['./f-edit.component.scss'],
})
export class FEditComponent implements OnInit {
  flashcard!: Flashcard;
  flashcardForm!: FormGroup;
  flashcardTypeForm!: FormGroup;
  type: string | undefined = '';
  deckId: string | null = '';

  constructor(
    private activated: ActivatedRoute,
    private flashcardService: FlashcardsService,
    private formbuilder: FormBuilder,
    private apiSuccessService: ApiSuccessService
  ) {}

  ngOnInit(): void {
    this.flashcardForm = this.formbuilder.group({
      front: '',
      back: '',
      example: '',
      furigana: '',
      flashcardTypeForm: this.formbuilder.group({}),
    });

    this.deckId = this.activated.snapshot.paramMap.get('deckId');
    const flashcardId = this.activated.snapshot.paramMap.get('flashcardId');

    if (this.deckId && flashcardId) {
      this.flashcardService
        .getUserDetailFlashcard(this.deckId, flashcardId)
        .subscribe((data: Flashcard) => {
          this.flashcard = data;
          this.type = this.flashcard.type;
          console.log(this.flashcard);

          this.initializeFlashcardForm(this.flashcard);
        });
    }
  }

  initializeFlashcardForm(flashcard: Flashcard) {
    this.flashcardTypeForm = this.formbuilder.group({});

    switch (this.type) {
      case 'vocabulary':
        this.flashcardTypeForm.addControl(
          'synonym',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'antonym',
          this.formbuilder.control('')
        );
        break;
      case 'kanji':
        this.flashcardTypeForm.addControl(
          'mnemotic',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'onyomi',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'kunyomi',
          this.formbuilder.control('')
        );
        break;
      case 'grammar':
        this.flashcardTypeForm.addControl(
          'construction',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'grammarnotes',
          this.formbuilder.control('')
        );
        break;

      default:
        console.error('Le type de la carte est inconnu');
        break;
    }

    this.flashcardForm.setControl('flashcardTypeForm', this.flashcardTypeForm);
    this.flashcardForm.patchValue({
      front: flashcard.front,
      back: flashcard.back,
      example: flashcard.example,
      furigana: flashcard.furigana,
    });
    this.patchValueFlashcardTypeForm(flashcard);
  }

  patchValueFlashcardTypeForm(flashcard: Flashcard) {
    switch (this.type) {
      case 'vocabulary':
        const flashcardVocab: FlashcardVocabulary = flashcard;
        this.flashcardForm.patchValue({
          flashcardTypeForm: {
            synonym: flashcardVocab.synonym,
            antonym: flashcardVocab.antonym,
          },
        });
        break;
      case 'kanji':
        const flashcardKanji: FlashcardKanji = flashcard;
        this.flashcardForm.patchValue({
          flashcardTypeForm: {
            mnemotic: flashcardKanji.mnemotic,
            onyomi: flashcardKanji.onyomi,
            kunyomi: flashcardKanji.kunyomi,
          },
        });
        break;
      case 'grammar':
        const flashcardGrammar: FlashcardGrammar = flashcard;
        this.flashcardForm.patchValue({
          flashcardTypeForm: {
            construction: flashcardGrammar.construction,
            grammarnotes: flashcardGrammar.grammarnotes,
          },
        });
        break;
      default:
        console.error('Le type de la carte est inconnu');
        break;
    }
  }

  onSubmit() {
    Object.assign(this.flashcard, this.flashcardForm.value);
    Object.assign(this.flashcard, this.flashcardForm.value.flashcardTypeForm);
    if (this.deckId) {
      this.flashcardService
        .updatelFlashcard(this.deckId, this.flashcard)
        .subscribe((message: string) =>
          this.apiSuccessService.sendSuccess(message)
        );
    }
  }
}
