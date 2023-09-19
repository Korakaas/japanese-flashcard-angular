import { Flashcard } from './flashcard.model';

export class PaginationDeck {
  decks: Deck[] = [];
  page?: number;
  total_items?: number;
}

export class Deck {
  id?: string;
  name?: string;
  description?: string;
  public?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  flashcards?: Flashcard[];
}
