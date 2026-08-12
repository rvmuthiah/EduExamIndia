import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";

import {getExam} from "../services/exam.service";

// Exam interface
interface Exam {
  _id: string;
  title: string;

  questionPaperId?:
    | string
    | {
        _id: string;
        title: string;
      };

  board?: string;
  standard?: number;
  subject?: string;
  chapter?: string;

  examType?: string;

  durationMinutes?: number;

  totalQuestions?: number;
  totalMarks?: number;

  negativeMarking?: boolean;
  negativeMarks?: number;

  startDate?: string;
  endDate?: string;

  status: "Draft" | "Published" | "Completed" | "Cancelled";

  createdBy?:
    | string
    | {
        _id: string;
        username: string;
        role: string;
      };
}

// API response interface
interface GetExamResponse {
  success: boolean;
  message?: string;
  data?: Exam;
}

const ViewExam = () => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();

  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadExam = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const response: GetExamResponse = await getExam(id);

        console.log("VIEW EXAM RESPONSE:", response);

        if (response.success && response.data) {
          setExam(response.data);
        } else {
          alert(response.message || "Exam not found");
          setExam(null);
        }
      } catch (error) {
        console.error("VIEW EXAM ERROR:", error);
        alert("Failed to load exam");
        setExam(null);
      } finally {
        setLoading(false);
      }
    };

    loadExam();
  }, [id]);

  // Format date
  const formatDate = (date?: string) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleString();
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  // Exam not found
  if (!exam) {
    return (
      <Box sx={{p: 3}}>
        <Typography variant="h5">Exam Not Found</Typography>

        <Button
          sx={{mt: 2}}
          variant="contained"
          onClick={() => navigate("/exams")}>
          Back to Exams
        </Button>
      </Box>
    );
  }

  // Status chip color
  const getStatusColor = () => {
    switch (exam.status) {
      case "Published":
        return "success";

      case "Completed":
        return "info";

      case "Draft":
        return "warning";

      case "Cancelled":
        return "error";

      default:
        return "default";
    }
  };

  return (
    <Box sx={{p: 3}}>
      {/* Page title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
        }}>
        View Exam
      </Typography>

      <Card elevation={3}>
        <CardContent>
          {/* Exam title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 2,
            }}>
            {exam.title}
          </Typography>

          {/* Status */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              mb: 3,
            }}>
            <Chip
              label={exam.status}
              color={getStatusColor()}
            />

            <Chip label={exam.examType || "Exam"} />
          </Box>

          <Divider sx={{mb: 3}} />

          {/* Academic Details */}
          <Typography
            variant="h6"
            sx={{mb: 2}}>
            Academic Details
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>Question Paper:</strong>{" "}
            {typeof exam.questionPaperId === "object" &&
            exam.questionPaperId !== null
              ? exam.questionPaperId.title
              : exam.questionPaperId || "-"}
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>Board:</strong> {exam.board || "-"}
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>Standard:</strong> {exam.standard ?? "-"}
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>Subject:</strong> {exam.subject || "-"}
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>Chapter:</strong> {exam.chapter || "-"}
          </Typography>

          <Divider sx={{my: 3}} />

          {/* Exam Details */}
          <Typography
            variant="h6"
            sx={{mb: 2}}>
            Exam Details
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>Exam Type:</strong> {exam.examType || "-"}
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>Duration:</strong>{" "}
            {exam.durationMinutes != null
              ? `${exam.durationMinutes} minutes`
              : "-"}
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>Total Questions:</strong> {exam.totalQuestions ?? "-"}
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>Total Marks:</strong> {exam.totalMarks ?? "-"}
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>Negative Marking:</strong>{" "}
            {exam.negativeMarking ? "Yes" : "No"}
          </Typography>

          {/* Negative marks */}
          {exam.negativeMarking && (
            <Typography sx={{mb: 1}}>
              <strong>Negative Marks:</strong> {exam.negativeMarks ?? 0}
            </Typography>
          )}

          <Divider sx={{my: 3}} />

          {/* Exam Schedule */}
          <Typography
            variant="h6"
            sx={{mb: 2}}>
            Exam Schedule
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>Start Date:</strong> {formatDate(exam.startDate)}
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>End Date:</strong> {formatDate(exam.endDate)}
          </Typography>

          <Divider sx={{my: 3}} />

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 3,
            }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/exams")}>
              Back
            </Button>

            <Button
              variant="contained"
              color="warning"
              onClick={() => navigate(`/exams/edit/${exam._id}`)}>
              Edit Exam
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewExam;
