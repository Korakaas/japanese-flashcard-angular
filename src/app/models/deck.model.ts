export class PaginationDeck {
  decks: Deck[] = [];
  page?: number;
  total_items?: number;
}

export class Deck {
  _id?: string;
  name?: string;
}
