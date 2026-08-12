import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import {
  getQuestionPaperImportForReview,
  approveQuestionPaperImport,
} from "../services/questionPaperReview.service";

interface ImportedQuestion {
  _id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
}

interface QuestionPaperImport {
  _id: string;
  fileName: string;
  filePath: string;
  status: "Draft" | "Review" | "Approved" | "Rejected";
  questions: ImportedQuestion[];
  questionPaperId?: string;
}

const QuestionPaperReview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [importData, setImportData] =
    useState<QuestionPaperImport | null>(null);

  const [approving, setApproving] = useState(false);

  // =====================================================
  // LOAD IMPORT
  // =====================================================

  useEffect(() => {
    const loadImport = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await getQuestionPaperImportForReview(id);

        console.log("REVIEW DATA:", response);

        if (response.success) {
          setImportData(response.data);
        } else {
          alert(
            response.message || "Failed to load question paper",
          );
        }
      } catch (error) {
        console.error("Review Load Error:", error);

        alert("Failed to load question paper review.");
      } finally {
        setLoading(false);
      }
    };

    void loadImport();
  }, [id]);

  // =====================================================
  // APPROVE ALL
  // =====================================================

  const handleApproveAll = async () => {
    if (!id) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to approve this question paper?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setApproving(true);

      const response = await approveQuestionPaperImport(id);

      if (response.success) {
        alert("Question paper approved successfully!");

        navigate("/questionpapers");
      } else {
        alert(response.message || "Approval failed.");
      }
    } catch (error) {
      console.error("Approval Error:", error);

      alert("Failed to approve question paper.");
    } finally {
      setApproving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // =====================================================
  // NOT FOUND
  // =====================================================

  if (!importData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">
          Question paper import not found.
        </Typography>

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() => navigate("/questionpapers")}
        >
          Back to Question Papers
        </Button>
      </Box>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <Box sx={{ p: 3 }}>
      {/* =================================================
          HEADER
      ================================================= */}

      <Paper
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              md: "center",
            },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
              }}
            >
              Question Paper Review
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 1,
              }}
            >
              {importData.fileName}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Total Questions:{" "}
              {importData.questions.length}
            </Typography>
          </Box>

          <Chip
            label={importData.status}
            color={
              importData.status === "Review"
                ? "warning"
                : importData.status === "Approved"
                  ? "success"
                  : "default"
            }
          />
        </Box>
      </Paper>

      {/* =================================================
          QUESTIONS
      ================================================= */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {importData.questions.map(
          (question, index) => (
            <Card
              key={question._id}
              elevation={2}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Question {index + 1}
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    mb: 2,
                  }}
                >
                  {question.question}
                </Typography>

                {/* OPTIONS */}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography>
                    <strong>A.</strong>{" "}
                    {question.optionA}
                  </Typography>

                  <Typography>
                    <strong>B.</strong>{" "}
                    {question.optionB}
                  </Typography>

                  <Typography>
                    <strong>C.</strong>{" "}
                    {question.optionC}
                  </Typography>

                  <Typography>
                    <strong>D.</strong>{" "}
                    {question.optionD}
                  </Typography>
                </Box>

                <Divider
                  sx={{
                    my: 2,
                  }}
                />

                {/* CORRECT ANSWER */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography>
                    <strong>
                      Correct Answer:
                    </strong>
                  </Typography>

                  <Chip
                    label={question.correctAnswer}
                    color="success"
                    size="small"
                  />
                </Box>

                {/* EXPLANATION */}

                <Typography
                  sx={{
                    mt: 2,
                  }}
                  color="text.secondary"
                >
                  <strong>
                    Explanation:
                  </strong>{" "}
                  {question.explanation ||
                    "No explanation available."}
                </Typography>
              </CardContent>
            </Card>
          ),
        )}
      </Box>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <Paper
        sx={{
          p: 3,
          mt: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: 2,
          }}
        >
          {/* BACK */}

          <Button
            variant="outlined"
            onClick={() =>
              navigate("/questionpapers")
            }
          >
            Back
          </Button>

          {/* APPROVE */}

          <Button
            variant="contained"
            color="success"
            disabled={
              approving ||
              importData.status !== "Review"
            }
            onClick={handleApproveAll}
          >
            {approving
              ? "Approving..."
              : "Approve All Questions"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default QuestionPaperReview;