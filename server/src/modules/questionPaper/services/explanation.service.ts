import type {ParsedQuestion} from "./mcqParser.service";

export interface ExplainedQuestion extends ParsedQuestion {
  explanation: string;
}

export const generateExplanation = (
  question: ParsedQuestion,
): string => {
  const answerMap = {
    A: question.optionA,
    B: question.optionB,
    C: question.optionC,
    D: question.optionD,
  };

  const correctOption =
    answerMap[question.correctAnswer];

  return `The correct answer is ${question.correctAnswer}. ${correctOption}.`;
};

export const addExplanations = (
  questions: ParsedQuestion[],
): ExplainedQuestion[] => {
  return questions.map(question => ({
    ...question,
    explanation: generateExplanation(question),
  }));
};