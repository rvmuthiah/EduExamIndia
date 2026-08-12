import mongoose, {Schema, Document} from "mongoose";

export interface IImportedQuestion {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface IQuestionPaperImport extends Document {
  questionPaperId?: mongoose.Types.ObjectId;
  fileName: string;
  filePath: string;
  questions: IImportedQuestion[];
  status: "Draft" | "Review" | "Approved" | "Rejected";
  createdAt: Date;
  updatedAt: Date;
}

const importedQuestionSchema =
  new Schema<IImportedQuestion>(
    {
      question: {
        type: String,
        required: true,
      },

      optionA: {
        type: String,
        required: true,
      },

      optionB: {
        type: String,
        required: true,
      },

      optionC: {
        type: String,
        required: true,
      },

      optionD: {
        type: String,
        required: true,
      },

      correctAnswer: {
        type: String,
        enum: ["A", "B", "C", "D"],
        required: true,
      },

      explanation: {
        type: String,
        default: "",
      },
    },
    {_id: true},
  );

const questionPaperImportSchema =
  new Schema<IQuestionPaperImport>(
    {
      questionPaperId: {
        type: Schema.Types.ObjectId,
        ref: "QuestionPaper",
        required: false,
      },

      fileName: {
        type: String,
        required: true,
      },

      filePath: {
        type: String,
        required: true,
      },

      questions: {
        type: [importedQuestionSchema],
        default: [],
      },

      status: {
        type: String,
        enum: [
          "Draft",
          "Review",
          "Approved",
          "Rejected",
        ],
        default: "Draft",
      },
    },
    {
      timestamps: true,
    },
  );

export default mongoose.model<IQuestionPaperImport>(
  "QuestionPaperImport",
  questionPaperImportSchema,
);