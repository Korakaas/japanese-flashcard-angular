import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from 'src/app/_services/deck.service';
import { Deck } from 'src/app/models/deck.model';

@Component({
  selector: 'app-d-add',
  templateUrl: './d-add.component.html',
  styleUrls: ['./d-add.component.scss']
})
export class DAddComponent {
  deck: Deck = new Deck;
  deckForm!: FormGroup;
  message: string = '';

  constructor(
    private activated: ActivatedRoute,
    private deckService: DeckService,
    private formbuilder: FormBuilder

  ) {}

  ngOnInit(): void {
    this.deckForm = this.formbuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
      public: new FormControl(false),
    });
    }

  onSubmit() {
    console.log(this.deckForm.value)
    this.deck = {
      name: this.deckForm.value.name,
      description: this.deckForm.value.description,
      public: this.deckForm.value.public,
    }
    

    this.deckService
      .createUserDecks(this.deck)
      .subscribe((data) => console.log(data));
  }
}
