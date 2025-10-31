// utils/questions.ts
export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getRandomQuestions<T>(allQuestions: T[], count: number): T[] {
  if (allQuestions.length <= count) return shuffleArray(allQuestions);
  return shuffleArray(allQuestions).slice(0, count);
}