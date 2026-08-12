export interface ParsedQuestion {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: "A" | "B" | "C" | "D";
}

export const parseMcqText = (
  text: string,
): ParsedQuestion[] => {
  // Remove PDF page markers
  const cleanedText = text
    .replace(/--\s*\d+\s+of\s+\d+\s+--/gi, "")
    .trim();

  // Separate answer key from questions
  const answerKeyMatch = cleanedText.match(
    /ANSWER KEY[\s\S]*?(\d+\s*-\s*[A-D](?:\s*,\s*\d+\s*-\s*[A-D])*)/i,
  );

  const answerKey: Record<number, "A" | "B" | "C" | "D"> = {};

  if (answerKeyMatch) {
    const answerText = answerKeyMatch[1];

    const answers = answerText.matchAll(
      /(\d+)\s*-\s*([A-D])/gi,
    );

    for (const match of answers) {
      answerKey[Number(match[1])] =
        match[2].toUpperCase() as "A" | "B" | "C" | "D";
    }
  }

  // Remove answer key section
  const questionText = cleanedText
    .split(/ANSWER KEY/i)[0];

  // Find numbered questions
  const questionMatches = questionText.matchAll(
    /(?:^|\n)\s*(\d+)\.\s*(.*?)(?=\n\s*\d+\.\s|$)/gs,
  );

  const parsedQuestions: ParsedQuestion[] = [];

  for (const match of questionMatches) {
    const questionNumber = Number(match[1]);
    const block = match[2].trim();

    const optionMatch = block.match(
      /^([\s\S]*?)\n\s*A\.\s*(.*?)\n\s*B\.\s*(.*?)\n\s*C\.\s*(.*?)\n\s*D\.\s*([\s\S]*)$/s,
    );

    if (!optionMatch) {
      console.warn(
        `Could not parse question ${questionNumber}`,
      );

      continue;
    }

    const question = optionMatch[1].trim();
    const optionA = optionMatch[2].trim();
    const optionB = optionMatch[3].trim();
    const optionC = optionMatch[4].trim();
    const optionD = optionMatch[5].trim();

    const correctAnswer = answerKey[questionNumber];

    if (!correctAnswer) {
      console.warn(
        `No answer found for question ${questionNumber}`,
      );

      continue;
    }

    parsedQuestions.push({
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
    });
  }

  return parsedQuestions;
};