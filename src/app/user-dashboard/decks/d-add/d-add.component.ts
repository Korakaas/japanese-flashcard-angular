import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  message: string = '';

  constructor(
    private deckService: DeckService,
    private formbuilder: FormBuilder,
    private apiSuccessService: ApiSuccessService
  ) {}

  ngOnInit(): void {
    this.deckForm = this.formbuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
      public: new FormControl(false),
    });
  }

  onSubmit() {
    console.log(this.deckForm.value);
    this.deck = {
      name: this.deckForm.value.name,
      description: this.deckForm.value.description,
      public: this.deckForm.value.public,
    };

    this.deckService.createUserDecks(this.deck).subscribe((message) => {
      console.log(message);
      this.apiSuccessService.sendSuccess(message);
    });
  }
}
