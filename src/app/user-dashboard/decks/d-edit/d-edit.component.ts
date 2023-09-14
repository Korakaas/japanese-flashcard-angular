import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from 'src/app/_services/deck.service';
import { Deck } from 'src/app/models/deck.model';

@Component({
  selector: 'app-d-edit',
  templateUrl: './d-edit.component.html',
  styleUrls: ['./d-edit.component.scss'],
})
export class DEditComponent implements OnInit {
  deck!: Deck;
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
      reverse: new FormControl(false),
    });
    let id = this.activated.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.deckService.getUserDecksDetail(id).subscribe((data: Deck) => {
        this.deck = data;
        console.log(this.deck);
        this.initializeDeckForm(this.deck);
      });
    }
  }

  initializeDeckForm(deck: Deck) {
    this.deckForm.patchValue({
      name: deck.name,
      description: deck.description,
      public: deck.public,
    });
  }

  onSubmit() {
    this.deck.name = this.deckForm.value.name;
    this.deck.description = this.deckForm.value.description;
    this.deck.public = this.deckForm.value.public;

    this.deckService
      .updateUserDecks(this.deck)
      .subscribe((data: string) => this.message = data);
  }
}
