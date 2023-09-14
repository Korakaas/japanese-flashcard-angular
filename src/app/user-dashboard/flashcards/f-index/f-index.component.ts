import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardsService } from 'src/app/_services/flashcard.service';
import { Flashcard, PaginationFlashcard } from 'src/app/models/flashcard.model';

@Component({
  selector: 'app-f-index',
  templateUrl: './f-index.component.html',
  styleUrls: ['./f-index.component.scss']
})
export class FIndexComponent {
  flashcardList:Flashcard[] = [];

  constructor(private flashcardService: FlashcardsService, private activated: ActivatedRoute){

  }
  ngOnInit(): void {
    let deckId = this.activated.snapshot.paramMap.get('deckId');
    if(deckId){
      this.flashcardService.getUserFlashcards(deckId).subscribe(
        (data:PaginationFlashcard) => {
          this.flashcardList = data.flashcards;
          console.log(this.flashcardList)
        },
      )
    }
  }  
}
