import {
  getAnswersByAttempt,
  updateStudentAnswer,
} from "../../studentAnswer/services/studentAnswer.service";

import Question from "../../question/models/question.model";

export const evaluateExam = async (
  attemptId: string
) => {

  const studentAnswers =
    await getAnswersByAttempt(attemptId);

  let score = 0;

  let totalMarks = 0;

  let correctAnswers = 0;

  let wrongAnswers = 0;

  for (const answer of studentAnswers) {

    const question = await Question.findById(
      answer.questionId
    );

    if (!question) continue;

    // Total marks of the exam
    totalMarks += question.marks;

    let isCorrect = false;

    let marksAwarded = 0;

    if (
      answer.selectedAnswer ===
      question.correctAnswer
    ) {

      isCorrect = true;

      marksAwarded = question.marks;

      score += question.marks;

      correctAnswers++;

    } else {

      marksAwarded =
        -(question.negativeMarks || 0);

      score += marksAwarded;

      wrongAnswers++;
    }

    await updateStudentAnswer(
      String(answer._id),
      {
        isCorrect,
        marksAwarded,
      }
    );
  }

  return {
    score,
    totalMarks,
    correctAnswers,
    wrongAnswers,
  };
};