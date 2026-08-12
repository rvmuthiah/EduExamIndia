import React, {useEffect, useState} from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";

import {getQuestion, updateQuestion} from "../services/question.service";

const EditQuestion = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    examId: "",
    board: "",
    standard: "",
    subject: "",
    chapter: "",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A",
    marks: "1",
    negativeMarks: "0",
    difficulty: "Easy",
    explanation: "",
    status: "Active",
  });

  useEffect(() => {
    const loadQuestion = async () => {
      if (!id) {
        alert("Question ID is missing");
        navigate("/questions");
        return;
      }

      try {
        setLoading(true);

        const response = await getQuestion(id);

        console.log("QUESTION DETAILS RESPONSE:", response);

        if (!response.success || !response.data) {
          alert(response.message || "Question not found");

          navigate("/questions");
          return;
        }

        const question = response.data;

        setFormData({
          examId:
            typeof question.examId === "object"
              ? question.examId._id
              : question.examId || "",

          board: question.board || "",
          standard: question.standard?.toString() || "",
          subject: question.subject || "",
          chapter: question.chapter || "",
          question: question.question || "",
          optionA: question.optionA || "",
          optionB: question.optionB || "",
          optionC: question.optionC || "",
          optionD: question.optionD || "",
          correctAnswer: question.correctAnswer || "A",
          marks: question.marks?.toString() || "1",
          negativeMarks: question.negativeMarks?.toString() || "0",
          difficulty: question.difficulty || "Easy",
          explanation: question.explanation || "",
          status: question.status || "Active",
        });
      } catch (error) {
        console.error("Get Question Error:", error);

        alert("Failed to load question");
        navigate("/questions");
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [id, navigate]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = event.target;

    setFormData(previous => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      alert("Question ID is missing");
      return;
    }

    try {
      setSaving(true);

      const response = await updateQuestion(id, {
        examId: formData.examId,
        board: formData.board,
        standard: Number(formData.standard),
        subject: formData.subject,
        chapter: formData.chapter,
        question: formData.question,
        optionA: formData.optionA,
        optionB: formData.optionB,
        optionC: formData.optionC,
        optionD: formData.optionD,
        correctAnswer: formData.correctAnswer as "A" | "B" | "C" | "D",
        marks: Number(formData.marks),
        negativeMarks: Number(formData.negativeMarks),
        difficulty: formData.difficulty as "Easy" | "Medium" | "Hard",
        explanation: formData.explanation,
        status: formData.status as "Active" | "Inactive",
      });

      console.log("UPDATE QUESTION RESPONSE:", response);

      if (response.success) {
        alert("Question updated successfully");

        navigate("/questions");
      } else {
        alert(response.message || "Failed to update question");
      }
    } catch (error) {
      console.error("Update Question Error:", error);

      alert("Failed to update question");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="h5">Loading question...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom>
        Edit Question
      </Typography>

      <Paper
        sx={{
          p: 3,
          maxWidth: 900,
        }}>
        <Box
          component="form"
          onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Exam ID"
            name="examId"
            value={formData.examId}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Board"
            name="board"
            value={formData.board}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Standard"
            name="standard"
            type="number"
            value={formData.standard}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Chapter"
            name="chapter"
            value={formData.chapter}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
            required
          />

          <TextField
            fullWidth
            label="Option A"
            name="optionA"
            value={formData.optionA}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Option B"
            name="optionB"
            value={formData.optionB}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Option C"
            name="optionC"
            value={formData.optionC}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Option D"
            name="optionD"
            value={formData.optionD}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            select
            fullWidth
            label="Correct Answer"
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            margin="normal"
            required>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="D">D</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Marks"
            name="marks"
            type="number"
            value={formData.marks}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Negative Marks"
            name="negativeMarks"
            type="number"
            value={formData.negativeMarks}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            select
            fullWidth
            label="Difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            margin="normal">
            <MenuItem value="Easy">Easy</MenuItem>

            <MenuItem value="Medium">Medium</MenuItem>

            <MenuItem value="Hard">Hard</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Explanation"
            name="explanation"
            value={formData.explanation}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />

          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            margin="normal">
            <MenuItem value="Active">Active</MenuItem>

            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 3,
            }}>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}>
              {saving ? "Updating..." : "Update Question"}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate("/questions")}
              disabled={saving}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditQuestion;
