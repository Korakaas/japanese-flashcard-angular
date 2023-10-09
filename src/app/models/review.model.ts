import { Flashcard } from './flashcard.model';

export class Review {
  score?: number;
}
export class Test {
  totalCardCount?: number;
  cards?: Flashcard;
}
