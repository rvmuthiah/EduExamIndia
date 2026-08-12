import {useEffect, useState} from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {createExam} from "../services/exam.service";
import {getQuestionPapers} from "../services/questionPaper.service";

interface QuestionPaper {
  _id: string;
  title: string;
  board: string;
  standard: number;
  subject: string;
  chapter?: string;
  status?: string;
}

const AddExam = () => {
  const navigate = useNavigate();

  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([]);
  const [loadingPapers, setLoadingPapers] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    questionPaperId: "",
    board: "",
    standard: "",
    subject: "",
    chapter: "",
    examType: "",
    durationMinutes: "",
    negativeMarking: false,
    negativeMarks: "0",
    startDate: "",
    endDate: "",
  });

  // =====================================================
  // LOAD QUESTION PAPERS
  // =====================================================

  useEffect(() => {
    const loadQuestionPapers = async () => {
      try {
        setLoadingPapers(true);

        const response = await getQuestionPapers();

        console.log("QUESTION PAPERS FOR EXAM:", response);

        if (response.success) {
          const approvedPapers = response.data.filter(
            (paper: QuestionPaper) => paper.status === "Approved",
          );

          setQuestionPapers(approvedPapers);
        }
      } catch (error) {
        console.error("LOAD QUESTION PAPERS ERROR:", error);

        alert("Failed to load question papers.");
      } finally {
        setLoadingPapers(false);
      }
    };

    void loadQuestionPapers();
  }, []);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // QUESTION PAPER SELECT
  // =====================================================

  const handleQuestionPaperChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const questionPaperId = event.target.value;

    const selectedPaper = questionPapers.find(
      paper => paper._id === questionPaperId,
    );

    setFormData(prev => ({
      ...prev,
      questionPaperId,
      board: selectedPaper?.board || "",
      standard: selectedPaper?.standard ? String(selectedPaper.standard) : "",
      subject: selectedPaper?.subject || "",
      chapter: selectedPaper?.chapter || "",
    }));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.questionPaperId ||
      !formData.examType ||
      !formData.durationMinutes
    ) {
      alert("Please fill title, question paper, exam type and duration.");
      return;
    }

    if (formData.negativeMarking && Number(formData.negativeMarks) <= 0) {
      alert("Please enter negative marks greater than 0.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: formData.title,

        questionPaperId: formData.questionPaperId,

        board: formData.board,

        standard: Number(formData.standard),

        subject: formData.subject,

        chapter: formData.chapter,

        examType: formData.examType,

        durationMinutes: Number(formData.durationMinutes),

        // These will be calculated properly
        // when we connect the Question collection.
        totalQuestions: 0,
        totalMarks: 0,

        negativeMarking: formData.negativeMarking,

        negativeMarks: formData.negativeMarking
          ? Number(formData.negativeMarks)
          : 0,

        startDate: formData.startDate
          ? new Date(formData.startDate)
          : undefined,

        endDate: formData.endDate ? new Date(formData.endDate) : undefined,

        status: "Draft",
      };

      console.log("CREATE EXAM PAYLOAD:", payload);

      const response = await createExam(payload);

      console.log("CREATE EXAM RESPONSE:", response);

      if (!response.success) {
        throw new Error(response.message || "Failed to create exam");
      }

      alert("Exam created successfully.");

      navigate("/exams");
    } catch (error) {
      console.error("CREATE EXAM ERROR:", error);

      alert("Failed to create exam.");
    } finally {
      setSaving(false);
    }
  };

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
        Add Exam
      </Typography>

      <Paper sx={{p: 3}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
          <TextField
            fullWidth
            label="Exam Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <TextField
            select
            fullWidth
            label="Question Paper"
            name="questionPaperId"
            value={formData.questionPaperId}
            onChange={handleQuestionPaperChange}
            disabled={loadingPapers}>
            {questionPapers.map(paper => (
              <MenuItem
                key={paper._id}
                value={paper._id}>
                {paper.title}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Board"
            value={formData.board}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />

          <TextField
            fullWidth
            label="Standard"
            value={formData.standard}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />

          <TextField
            fullWidth
            label="Subject"
            value={formData.subject}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />

          <TextField
            fullWidth
            label="Chapter"
            value={formData.chapter}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />

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

          <TextField
            fullWidth
            type="number"
            label="Duration (Minutes)"
            name="durationMinutes"
            value={formData.durationMinutes}
            onChange={handleChange}
            slotProps={{
              htmlInput: {
                min: 1,
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.negativeMarking}
                onChange={event =>
                  setFormData(prev => ({
                    ...prev,
                    negativeMarking: event.target.checked,
                  }))
                }
              />
            }
            label="Enable Negative Marking"
          />

          {formData.negativeMarking && (
            <TextField
              fullWidth
              type="number"
              label="Negative Marks"
              name="negativeMarks"
              value={formData.negativeMarks}
              onChange={handleChange}
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
            />
          )}

          <TextField
            fullWidth
            type="datetime-local"
            label="Start Date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            fullWidth
            type="datetime-local"
            label="End Date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
            }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/exams")}
              disabled={saving}>
              Back
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              disabled={saving}>
              {saving ? "Creating..." : "Create Exam"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddExam;
