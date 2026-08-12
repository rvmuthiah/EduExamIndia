import {useEffect, useState} from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {
  getExams,
  deleteExam,
  publishExam,
  closeExam,
} from "../services/exam.service";

interface Exam {
  _id: string;
  title: string;

  questionPaperId?:
    | string
    | {
        _id: string;
        title: string;
      };

  standard?: number;
  subject?: string;

  durationMinutes?: number;
  totalQuestions?: number;
  totalMarks?: number;

  status: "Draft" | "Published" | "Completed" | "Cancelled";

  startDate?: string;
  endDate?: string;
}

const Exams = () => {
  const navigate = useNavigate();

  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD EXAMS
  // =====================================================

  const loadExams = async () => {
    try {
      setLoading(true);

      const response = await getExams();

      console.log("EXAMS API RESPONSE:", response);

      if (response.success) {
        setExams(response.data);
      } else {
        setExams([]);
      }
    } catch (error) {
      console.error("LOAD EXAMS ERROR:", error);
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadExams();
  }, []);

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this exam?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteExam(id);

      alert("Exam deleted successfully.");

      await loadExams();
    } catch (error) {
      console.error("DELETE EXAM ERROR:", error);
      alert("Failed to delete exam.");
    }
  };

  // =====================================================
  // PUBLISH
  // =====================================================

  const handlePublish = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to publish this exam?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await publishExam(id);

      alert("Exam published successfully.");

      await loadExams();
    } catch (error) {
      console.error("PUBLISH EXAM ERROR:", error);
      alert("Failed to publish exam.");
    }
  };

  // =====================================================
  // COMPLETE
  // =====================================================

  const handleClose = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to complete this exam?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await closeExam(id);

      alert("Exam completed successfully.");

      await loadExams();
    } catch (error) {
      console.error("COMPLETE EXAM ERROR:", error);
      alert("Failed to complete exam.");
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
          mb: 2,
        }}>
        Exams
      </Typography>

      <Button
        variant="contained"
        sx={{mb: 2}}
        onClick={() => navigate("/exams/add")}>
        Add Exam
      </Button>

      <Paper sx={{p: 2}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exam</TableCell>
              <TableCell>Question Paper</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Standard</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Questions</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {exams.length > 0 ? (
              exams.map(exam => (
                <TableRow key={exam._id}>
                  {/* Exam */}
                  <TableCell>{exam.title}</TableCell>

                  {/* Question Paper */}
                  <TableCell>
                    {typeof exam.questionPaperId === "object"
                      ? exam.questionPaperId.title
                      : exam.questionPaperId || "-"}
                  </TableCell>

                  {/* Subject */}
                  <TableCell>{exam.subject || "-"}</TableCell>

                  {/* Standard */}
                  <TableCell>{exam.standard || "-"}</TableCell>

                  {/* Duration */}
                  <TableCell>
                    {exam.durationMinutes ? `${exam.durationMinutes} min` : "-"}
                  </TableCell>

                  {/* Questions */}
                  <TableCell>{exam.totalQuestions ?? "-"}</TableCell>

                  {/* Marks */}
                  <TableCell>{exam.totalMarks ?? "-"}</TableCell>

                  {/* Status */}
                  <TableCell>
                    <Chip
                      label={exam.status}
                      color={
                        exam.status === "Published"
                          ? "success"
                          : exam.status === "Completed"
                            ? "info"
                            : exam.status === "Draft"
                              ? "warning"
                              : "default"
                      }
                      size="small"
                    />
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center">
                    {/* View */}
                    <Button
                      size="small"
                      variant="contained"
                      color="info"
                      sx={{mr: 1}}
                      onClick={() => navigate(`/exams/view/${exam._id}`)}>
                      View
                    </Button>

                    {/* Edit */}
                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      sx={{mr: 1}}
                      onClick={() => navigate(`/exams/edit/${exam._id}`)}>
                      Edit
                    </Button>

                    {/* Publish */}
                    {exam.status === "Draft" && (
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        sx={{mr: 1}}
                        onClick={() => handlePublish(exam._id)}>
                        Publish
                      </Button>
                    )}

                    {/* Complete */}
                    {exam.status === "Published" && (
                      <Button
                        size="small"
                        variant="contained"
                        color="info"
                        sx={{mr: 1}}
                        onClick={() => handleClose(exam._id)}>
                        Complete
                      </Button>
                    )}

                    {/* Delete */}
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(exam._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={9}>
                  No Exams Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Exams;
