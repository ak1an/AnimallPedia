export interface MatchingPair {
  animal: string;
  habitat: string;
}

export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface MiniQuestQuestion {
  id: number;
  type: 'matching' | 'puzzle' | 'identification' | 'sequence' | 'classification' | 'memory' | 'quiz' | 'truefalse' | 'imageGuess';
  title: string;
  description: string;
  pairs?: MatchingPair[];
  image?: string;
  pieces?: number;
  clues?: string[];
  answer?: string;
  items?: string[];
  correctOrder?: number[];
  groups?: {
    mammals: number[];
    birds: number[];
  };
  sequence?: string[];
  options?: QuizOption[]; // For quiz and truefalse types
  imageUrl?: string; // For imageGuess type
  correctAnswer?: string; // For imageGuess type
}