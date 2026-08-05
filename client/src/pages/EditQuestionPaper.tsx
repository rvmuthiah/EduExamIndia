import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";

import {
  getQuestionPaper,
  updateQuestionPaper,
} from "../services/questionPaper.service";

const EditQuestionPaper = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    board: "",
    standard: "",
    subject: "",
    chapter: "",
    examType: "",
  });

  useEffect(() => {
    const loadQuestionPaper = async () => {
      if (!id) return;

      try {
        const response = await getQuestionPaper(id);

        if (response.success) {
          setForm({
            title: response.data.title,
            board: response.data.board,
            standard: response.data.standard.toString(),
            subject: response.data.subject,
            chapter: response.data.chapter || "",
            examType: response.data.examType,
          });
        }
      } catch (error) {
        console.error(error);
        alert("Failed to load Question Paper.");
      } finally {
        setLoading(false);
      }
    };

    void loadQuestionPaper();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!id) return;

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("board", form.board);
      formData.append("standard", form.standard);
      formData.append("subject", form.subject);
      formData.append("chapter", form.chapter);
      formData.append("examType", form.examType);

      const response = await updateQuestionPaper(id, formData);

      if (response.success) {
        alert("Question Paper Updated Successfully");
        navigate("/questionpapers");
      } else {
        alert(response.message || "Update Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom>
        Edit Question Paper
      </Typography>

      <Paper sx={{p: 3}}>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          select
          margin="normal"
          label="Board"
          name="board"
          value={form.board}
          onChange={handleChange}>
          <MenuItem value="State Board">State Board</MenuItem>
          <MenuItem value="CBSE">CBSE</MenuItem>
          <MenuItem value="ICSE">ICSE</MenuItem>
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          label="Standard"
          name="standard"
          type="number"
          value={form.standard}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Chapter"
          name="chapter"
          value={form.chapter}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          select
          margin="normal"
          label="Exam Type"
          name="examType"
          value={form.examType}
          onChange={handleChange}>
          <MenuItem value="Unit Test">Unit Test</MenuItem>
          <MenuItem value="Quarterly">Quarterly</MenuItem>
          <MenuItem value="Half Yearly">Half Yearly</MenuItem>
          <MenuItem value="Annual">Annual</MenuItem>
          <MenuItem value="Model Exam">Model Exam</MenuItem>
        </TextField>

        <Button
          variant="contained"
          color="warning"
          sx={{mt: 2}}
          onClick={handleSubmit}>
          Update Question Paper
        </Button>
      </Paper>
    </>
  );
};

export default EditQuestionPaper;
