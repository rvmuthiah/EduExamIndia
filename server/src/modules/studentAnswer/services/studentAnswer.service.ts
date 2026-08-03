import StudentAnswer, {
  IStudentAnswer,
} from "../models/studentAnswer.model";

// Save Answer
export const createStudentAnswer = async (
  data: Partial<IStudentAnswer>
) => {
  return await StudentAnswer.create(data);
};

// Get All Answers
export const getAllStudentAnswers = async () => {
  return await StudentAnswer.find()
    .populate("attemptId")
    .populate("questionId");
};

// Get Answer By ID
export const getStudentAnswerById = async (
  id: string
) => {
  return await StudentAnswer.findById(id)
    .populate("attemptId")
    .populate("questionId");
};

// Get Answers By Attempt
export const getAnswersByAttempt = async (
  attemptId: string
) => {
  return await StudentAnswer.find({
    attemptId,
  }).populate("questionId");
};

// Find Existing Answer
export const getStudentAnswer = async (
  attemptId: string,
  questionId: string
) => {
  return await StudentAnswer.findOne({
    attemptId,
    questionId,
  });
};

// Update Answer
export const updateStudentAnswer = async (
  id: string,
  data: Partial<IStudentAnswer>
) => {
  return await StudentAnswer.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
};

// Delete Answer
export const deleteStudentAnswer = async (
  id: string
) => {
  return await StudentAnswer.findByIdAndDelete(id);
};