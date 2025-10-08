interface GameConfig {
  n: number; // The value of N for the n-back task
  mode: 'letters' | 'shapes'; // The current mode of the game
}

interface SequenceItem {
  value: string; // The current letter or shape
  index: number; // The index of the item in the sequence
}

interface UserStats {
  correct: number; // Number of correct responses
  incorrect: number; // Number of incorrect responses
  total: number; // Total number of responses
}

export type { GameConfig, SequenceItem, UserStats };