import Result from "../../result/models/result.model";

export const getExamLeaderboard = async (
  examId: string
) => {
  return await Result.find({
    examId,
  })
    .populate("studentId", "name email school")
    .sort({
      percentage: -1,
      score: -1,
    });
};

export const getOverallLeaderboard =
  async () => {
    return await Result.find()
      .populate(
        "studentId",
        "name email school"
      )
      .sort({
        percentage: -1,
        score: -1,
      });
  };