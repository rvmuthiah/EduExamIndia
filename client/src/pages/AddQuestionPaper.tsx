import {useState} from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import {createQuestionPaper} from "../services/questionPaper.service";

const AddQuestionPaper = () => {
  const [formData, setFormData] = useState({
    title: "",
    board: "",
    standard: "",
    subject: "",
    chapter: "",
    examType: "",
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const {title, board, standard, subject, chapter, examType} = formData;

    // Validation
    if (!title || !board || !standard || !subject || !chapter || !examType) {
      alert("Please fill all fields.");
      return;
    }

    if (!pdfFile) {
      alert("Please select a PDF file.");
      return;
    }

    try {
      const form = new FormData();

      form.append("title", title);
      form.append("board", board);
      form.append("standard", standard);
      form.append("subject", subject);
      form.append("chapter", chapter);
      form.append("examType", examType);
      form.append("pdf", pdfFile);

      const response = await createQuestionPaper(form);

      console.log("Response:", response);

      alert("Question Paper Uploaded Successfully!");

      // Reset form
      setFormData({
        title: "",
        board: "",
        standard: "",
        subject: "",
        chapter: "",
        examType: "",
      });

      setPdfFile(null);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Upload Failed!");
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom>
        Add Question Paper
      </Typography>

      <Paper sx={{p: 3}}>
        <Grid
          container
          spacing={2}>
          <Grid size={{xs: 12}}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{xs: 12, md: 6}}>
            <TextField
              select
              fullWidth
              label="Board"
              name="board"
              value={formData.board}
              onChange={handleChange}>
              <MenuItem value="State Board">State Board</MenuItem>
              <MenuItem value="CBSE">CBSE</MenuItem>
              <MenuItem value="ICSE">ICSE</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              type="number"
              label="Standard"
              name="standard"
              value={formData.standard}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              label="Chapter"
              name="chapter"
              value={formData.chapter}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{xs: 12}}>
            <TextField
              select
              fullWidth
              label="Exam Type"
              name="examType"
              value={formData.examType}
              onChange={handleChange}>
              <MenuItem value="Unit Test">Unit Test</MenuItem>
              <MenuItem value="Quarterly">Quarterly</MenuItem>
              <MenuItem value="Half Yearly">Half Yearly</MenuItem>
              <MenuItem value="Annual">Annual</MenuItem>
              <MenuItem value="Model Exam">Model Exam</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{xs: 12}}>
            <Button
              variant="contained"
              component="label">
              Upload PDF
              <input
                hidden
                type="file"
                accept=".pdf"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    setPdfFile(e.target.files[0]);
                  }
                }}
              />
            </Button>

            {pdfFile && (
              <Typography
                variant="body2"
                sx={{mt: 1}}>
                Selected File: {pdfFile.name}
              </Typography>
            )}
          </Grid>

          <Grid size={{xs: 12}}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}>
              Save Question Paper
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default AddQuestionPaper;
