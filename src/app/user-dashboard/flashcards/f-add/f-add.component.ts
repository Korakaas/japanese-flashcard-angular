import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  type: string = '';
  flashcardForm!: FormGroup;
  flashcardTypeForm!: FormGroup;
  deckId: string | null = '';

  constructor(
    private activated: ActivatedRoute,
    private flashcardService: FlashcardsService,
    private formbuilder: FormBuilder,
    private apiSuccesService: ApiSuccessService
  ) {}
  ngOnInit(): void {
    this.flashcardForm = this.formbuilder.group({
      front: new FormControl(''),
      back: new FormControl(''),
      example: new FormControl(''),
      furigana: new FormControl(''),
      type: new FormControl(''),
      flashcardTypeForm: this.formbuilder.group({}),
      reverse: new FormControl(''),
    });
    this.deckId = this.activated.snapshot.paramMap.get('deckId');
  }
  onselectchange(test: any) {
    this.type = test.target.value;
    this.initializeFlashcardForm();
  }
  initializeFlashcardForm() {
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
  }
  onSubmit() {
    const newFlashcard: Flashcard = {};
    console.log(this.flashcardForm.value);
    Object.assign(newFlashcard, this.flashcardForm.value);
    Object.assign(newFlashcard, this.flashcardForm.value.flashcardTypeForm);
    if (this.deckId) {
      this.flashcardService
        .createFlashcard(this.deckId, newFlashcard)
        .subscribe((message: string) =>
          this.apiSuccesService.sendSuccess(message)
        );
    }
  }
}
