export class DeckStats {
  deckname?: string;
  dailyStats?: DailyStats[];
  flashcards?: FlashcardStats;
}

export class DailyStats {
  date?: Date;
  reviewNumber?: number;
  correctAnswer?: number;
}

export class FlashcardStats {
  known?: number;
  learning?: number;
  new?: number;
}
