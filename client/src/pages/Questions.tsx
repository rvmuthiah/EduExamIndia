import {useEffect, useState} from "react";
import {
  Box,
  Button,
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

import {getQuestions, deleteQuestion} from "../services/question.service";

import type {Question} from "../services/question.service";

const Questions = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const loadQuestions = async () => {
    try {
      setLoading(true);

      const response = await getQuestions();

      console.log("QUESTIONS API RESPONSE:", response);

      if (response.success) {
        setQuestions(response.data);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error("Error loading questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadQuestions();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteQuestion(id);

      alert("Question deleted successfully");

      await loadQuestions();
    } catch (error) {
      console.error("Delete Question Error:", error);

      alert("Failed to delete question");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom>
        Questions
      </Typography>

      <Button
        variant="contained"
        sx={{mb: 2}}
        onClick={() => navigate("/questions/add")}>
        Add Question
      </Button>

      <Paper sx={{p: 2}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Board</TableCell>
              <TableCell>Standard</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {questions.length > 0 ? (
              questions.map(question => (
                <TableRow key={question._id}>
                  <TableCell>{question.question}</TableCell>

                  <TableCell>{question.board}</TableCell>

                  <TableCell>{question.standard}</TableCell>

                  <TableCell>{question.subject}</TableCell>

                  <TableCell>{question.difficulty}</TableCell>

                  <TableCell>{question.correctAnswer}</TableCell>

                  <TableCell>{question.marks}</TableCell>

                  <TableCell>{question.status}</TableCell>

                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="contained"
                      color="info"
                      sx={{mr: 1}}>
                      View
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      sx={{mr: 1}}>
                      Edit
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(question._id)}>
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
                  No Questions Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Questions;
