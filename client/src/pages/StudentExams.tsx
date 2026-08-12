import {useEffect, useState} from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {getExams} from "../services/exam.service";

interface Exam {
  _id: string;
  title: string;
  subject?: string;
  standard?: number;
  examType?: string;
  durationMinutes?: number;
  totalQuestions?: number;
  totalMarks?: number;
  status?: string;
}

const StudentExams = () => {
  const navigate = useNavigate();

  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD EXAMS
  // =====================================================

  useEffect(() => {
    const loadExams = async () => {
      try {
        const response = await getExams();

        console.log("STUDENT EXAMS:", response);

        if (response.success && response.data) {
          const publishedExams = response.data.filter(
            (exam: Exam) => exam.status === "Published",
          );

          setExams(publishedExams);
        } else {
          setExams([]);
        }
      } catch (error) {
        console.error("STUDENT EXAMS ERROR:", error);
        setExams([]);
      } finally {
        setLoading(false);
      }
    };

    void loadExams();
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <Box sx={{p: 3}}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
        }}>
        Available Exams
      </Typography>

      {/* =====================================================
          NO EXAMS
          ===================================================== */}

      {exams.length === 0 && (
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              align="center">
              No Exams Available
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{mt: 1}}>
              There are currently no published exams.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* =====================================================
          EXAM CARDS
          ===================================================== */}

      {exams.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}>
          {exams.map(exam => (
            <Card
              key={exam._id}
              sx={{
                width: {
                  xs: "100%",
                  sm: "45%",
                  md: "30%",
                },
              }}>
              <CardContent>
                {/* TITLE */}

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                  }}>
                  {exam.title}
                </Typography>

                {/* SUBJECT */}

                <Typography sx={{mb: 1}}>
                  <strong>Subject:</strong> {exam.subject || "-"}
                </Typography>

                {/* STANDARD */}

                <Typography sx={{mb: 1}}>
                  <strong>Standard:</strong> {exam.standard ?? "-"}
                </Typography>

                {/* EXAM TYPE */}

                <Typography sx={{mb: 1}}>
                  <strong>Exam Type:</strong> {exam.examType || "-"}
                </Typography>

                {/* DURATION */}

                <Typography sx={{mb: 1}}>
                  <strong>Duration:</strong>{" "}
                  {exam.durationMinutes != null
                    ? `${exam.durationMinutes} minutes`
                    : "-"}
                </Typography>

                {/* QUESTIONS */}

                <Typography sx={{mb: 1}}>
                  <strong>Questions:</strong> {exam.totalQuestions ?? "-"}
                </Typography>

                {/* MARKS */}

                <Typography sx={{mb: 2}}>
                  <strong>Total Marks:</strong> {exam.totalMarks ?? "-"}
                </Typography>

                {/* START EXAM */}

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    navigate(`/student/exams/${exam._id}`);
                  }}>
                  Start Exam
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default StudentExams;
