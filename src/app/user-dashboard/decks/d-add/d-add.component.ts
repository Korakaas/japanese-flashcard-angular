import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  constructor(
    private deckService: DeckService,
    private formbuilder: FormBuilder,
    private apiSuccessService: ApiSuccessService
  ) {}

  ngOnInit(): void {
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

      this.deckService.createUserDecks(this.deck).subscribe((message) => {
        this.apiSuccessService.sendSuccess(message);
      });
    }
  }
}
