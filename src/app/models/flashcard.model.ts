import { Review } from './review.model';

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
  knownLevel?: number;
  intervalReview?: number;
  reviewedAt?: Date;
}

export class FlashcardKanji extends Flashcard {
  mnemotic?: string;
  onyomi?: string;
  kunyomi?: string;
}

export class FlashcardGrammar extends Flashcard {
  grammarConstruction?: string;
  grammarNotes?: string;
}

// export class FlashcardConjugation extends Flashcard{
//   polite?: string;
//   dictionnary?: string;
//   negative?: string;
//   conditionnalBa?: string;
//   conditionnalTara?: string;
//   imperative?: string;
//   volitional?: string;
//   causative?: string;
//   potential?: string;
//   teForm?: string;
//   taForm?: string;
// }

export class FlashcardVocabulary extends Flashcard {
  // audio?: string;
  // image?: string;
  synonym?: string;
  antonym?: string;
}

export enum FlashcardType {
  Kanji = 'kanji',
  Vocabulary = 'vocabulary',
  Grammar = 'grammar',
  // Conjugation = "conjugation"
}

export type Union = FlashcardVocabulary | FlashcardGrammar | FlashcardKanji;
