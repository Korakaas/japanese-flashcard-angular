export class PaginationFlashcard {
  flashcards: Flashcard[] = [];
  page?: number;
  total_items?: number;
}

export class Flashcard{
    id?: string;
    example?: string;
    furigana?: string;
    translation?: string;
    type?:FlashcardType;
    updatedAt?:Date;
    createdAt?:Date;
  }

  export class FlashcardKanji extends Flashcard{
    kanji?: string;
    onyomi?: string;
    kunyomi?: string;
  }

  export class FlashcardGrammar extends Flashcard{
    grammarRule?: string;
    grammarPoint?: string;
  }

  export class FlashcardConjugation extends Flashcard{
    polite?: string;
    dictionnary?: string;
    negative?: string;
    conditionnalBa?: string;
    conditionnalTara?: string;
    imperative?: string;
    volitional?: string;
    causative?: string;
    potential?: string;
    teForm?: string;
    taForm?: string;
  }

  export class FlashcardVocabulary extends Flashcard{
    word?: string;
    audio?: string;
    image?: string;
  }

  export enum FlashcardType {
    Kanji = "kanji",
    Vocabulary = "vocabulary",
    Grammar = "grammar",
    Conjugation = "conjugation"
  }