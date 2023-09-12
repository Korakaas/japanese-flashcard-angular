export class Flashcard{
    id?: string;
    example?: string;
    furigana?: string;
    translation?: string;
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
    negative?: string;
    conditionnalBa?: string;
    conditionnalTara?: string;
    imperative?: string;
    volitional?: string;
    causative?: string;
    potential?: string;
    teForm?: string;
    Taform?: string;
  }

  export class FlashcardVocabulary extends Flashcard{
    word?: string;
    audio?: string;
    image?: string;
  }