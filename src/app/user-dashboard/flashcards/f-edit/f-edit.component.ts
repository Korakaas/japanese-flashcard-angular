import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FlashcardsService } from 'src/app/_services/flashcard.service';
import {
  Flashcard,
  FlashcardConjugation,
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

  message: string = '';

  constructor(
    private activated: ActivatedRoute,
    private flashcardService: FlashcardsService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.flashcardForm = this.formbuilder.group({
      translation: '',
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

          this.initializeFlashcardForm(this.flashcard);
        });
    }
  }

  initializeFlashcardForm(flashcard: Flashcard) {
    this.flashcardTypeForm = this.formbuilder.group({});

    switch (this.type) {
      case 'vocabulary':
        this.flashcardTypeForm.addControl('word', this.formbuilder.control(''));
        this.flashcardTypeForm.addControl(
          'audio',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'image',
          this.formbuilder.control('')
        );
        break;
      case 'kanji':
        this.flashcardTypeForm.addControl(
          'kanji',
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
          'grammarRule',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'grammarPoint',
          this.formbuilder.control('')
        );
        break;
      case 'conjugation':
        this.flashcardTypeForm.addControl(
          'dictionnary',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'polite',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'negative',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'conditionnalBa',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'conditionnalTara',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'imperative',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'volitional',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'causative',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'potential',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'teForm',
          this.formbuilder.control('')
        );
        this.flashcardTypeForm.addControl(
          'taForm',
          this.formbuilder.control('')
        );
        break;

      default:
        console.error('Le type de la carte est inconnu');
        break;
    }

    this.flashcardForm.setControl('flashcardTypeForm', this.flashcardTypeForm);
    this.flashcardForm.patchValue({
      translation: flashcard.translation,
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
            word: flashcardVocab.word,
            audio: flashcardVocab.audio,
            image: flashcardVocab.image,
          },
        });
        break;
      case 'kanji':
        const flashcardKanji: FlashcardKanji = flashcard;
        this.flashcardForm.patchValue({
          flashcardTypeForm: {
            kanji: flashcardKanji.kanji,
            onyomi: flashcardKanji.onyomi,
            kunyomi: flashcardKanji.kunyomi,
          },
        });
        break;
      case 'grammar':
        const flashcardGrammar: FlashcardGrammar = flashcard;
        this.flashcardForm.patchValue({
          flashcardTypeForm: {
            grammarRule: flashcardGrammar.grammarRule,
            grammarPoint: flashcardGrammar.grammarPoint,
          },
        });
        break;
      case 'conjugation':
        const flashcardConjugation: FlashcardConjugation = flashcard;
        this.flashcardForm.patchValue({
          flashcardTypeForm: {
            dictionnary: flashcardConjugation.dictionnary,
            polite: flashcardConjugation.polite,
            negative: flashcardConjugation.negative,
            conditionnalBa: flashcardConjugation.conditionnalBa,
            conditionnalTara: flashcardConjugation.conditionnalTara,
            imperative: flashcardConjugation.imperative,
            volitional: flashcardConjugation.volitional,
            causative: flashcardConjugation.causative,
            potential: flashcardConjugation.potential,
            teForm: flashcardConjugation.teForm,
            taForm: flashcardConjugation.taForm,
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
        .subscribe((data: string) => (this.message = data));
    }
  }
}
