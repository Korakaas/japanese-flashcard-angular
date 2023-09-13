import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FlashcardsService } from 'src/app/_services/flashcard.service';
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
    { value: 'conjugation', label: 'Conjugaison' },
    { value: 'grammar', label: 'Grammaire' },
  ];

  type: string = '';
  message: string = '';
  flashcardForm!: FormGroup;
  flashcardTypeForm!: FormGroup;
  deckId: string | null = '';

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
    type: '',
    flashcardTypeForm: this.formbuilder.group({}),
  });
  this.deckId = this.activated.snapshot.paramMap.get('deckId');
}
  onselectchange(test: any) {
    this.type = test.target.value;
    this.initializeFlashcardForm()
  }
  initializeFlashcardForm() {
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

  }
  onSubmit(){
    const newFlashcard:Flashcard = {};
    console.log(this.flashcardForm.value)
    Object.assign(newFlashcard, this.flashcardForm.value);
    Object.assign(newFlashcard, this.flashcardForm.value.flashcardTypeForm);
    if (this.deckId) {
      this.flashcardService
        .createFlashcard(this.deckId, newFlashcard)
        .subscribe((data: string) => (this.message = data));
    }
  }
  }
