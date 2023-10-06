export class PaginationFlashcard {
  flashcards: Flashcard[] = [];
  page?: number;
  total_items?: number;
}

export class Flashcard {
  id?: string;
  example?: string;
  furigana?: string;
  front?: string;
  back?: string;
  type?: FlashcardType;
  updatedAt?: Date;
  createdAt?: Date;
  reverse?: Boolean;
  knownLevel?: number|string;
  intervalReview?: number|string;
  reviewedAt?: Date;
}

export class FlashcardKanji extends Flashcard {
  mnemotic?: string;
  onyomi?: string;
  kunyomi?: string;
}

export class FlashcardGrammar extends Flashcard {
  construction?: string;
  grammarnotes?: string;
}
export class FlashcardVocabulary extends Flashcard {
  synonym?: string;
  antonym?: string;
}

export enum FlashcardType {
  Kanji = 'kanji',
  Vocabulary = 'vocabulary',
  Grammar = 'grammar',
}

export type Union = FlashcardVocabulary | FlashcardGrammar | FlashcardKanji;
