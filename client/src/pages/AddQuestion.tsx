import React, {useState} from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {createQuestion} from "../services/question.service";

const AddQuestion = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    examId: "6a6f7ab666176544fe70d7fe",
    board: "State Board",
    standard: "10",
    subject: "Science",
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

  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);

      const response = await createQuestion({
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

      console.log("CREATE QUESTION RESPONSE:", response);

      if (response.success) {
        alert("Question created successfully");
        navigate("/questions");
      } else {
        alert(response.message || "Failed to create question");
      }
    } catch (error) {
      console.error("Create Question Error:", error);

      alert("Failed to create question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom>
        Add Question
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
              disabled={loading}>
              {loading ? "Saving..." : "Save Question"}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate("/questions")}
              disabled={loading}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddQuestion;
