import React, {useEffect, useState} from "react";
import axios from "axios";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import type {SelectChangeEvent} from "@mui/material/Select";

import {useNavigate, useParams} from "react-router-dom";

import {getExam, updateExam} from "../services/exam.service";

// =====================================================
// EXAM INTERFACE
// =====================================================

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
}

// =====================================================
// FORM DATA
// =====================================================

interface FormData {
  title: string;
  board: string;
  standard: string;
  subject: string;
  chapter: string;
  examType: string;
  durationMinutes: string;
  negativeMarking: boolean;
  negativeMarks: string;
  startDate: string;
  endDate: string;
  status: Exam["status"];
}

// =====================================================
// EDIT EXAM
// =====================================================

const EditExam = () => {
  const {id} = useParams<{id: string}>();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  const [saving, setSaving] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
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
    status: "Draft",
  });

  // =====================================================
  // LOAD EXAM
  // =====================================================

  useEffect(() => {
    const loadExam = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const response = await getExam(id);

        console.log("EDIT EXAM RESPONSE:", response);

        if (!response.success || !response.data) {
          alert(response.message || "Exam not found");

          navigate("/exams");

          return;
        }

        const exam: Exam = response.data;

        setFormData({
          title: exam.title || "",

          board: exam.board || "",

          standard: exam.standard !== undefined ? String(exam.standard) : "",

          subject: exam.subject || "",

          chapter: exam.chapter || "",

          examType: exam.examType || "",

          durationMinutes:
            exam.durationMinutes !== undefined
              ? String(exam.durationMinutes)
              : "",

          negativeMarking: exam.negativeMarking ?? false,

          negativeMarks:
            exam.negativeMarks !== undefined ? String(exam.negativeMarks) : "0",

          startDate: exam.startDate
            ? new Date(exam.startDate).toISOString().slice(0, 16)
            : "",

          endDate: exam.endDate
            ? new Date(exam.endDate).toISOString().slice(0, 16)
            : "",

          status: exam.status || "Draft",
        });
      } catch (error) {
        console.error("LOAD EDIT EXAM ERROR:", error);

        alert("Failed to load exam");

        navigate("/exams");
      } finally {
        setLoading(false);
      }
    };

    void loadExam();
  }, [id, navigate]);

  // =====================================================
  // TEXT INPUT
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
  // NEGATIVE MARKING
  // =====================================================

  const handleNegativeMarkingChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData(prev => ({
      ...prev,

      negativeMarking: event.target.checked,

      negativeMarks: event.target.checked ? prev.negativeMarks || "1" : "0",
    }));
  };

  // =====================================================
  // STATUS
  // =====================================================

  const handleStatusChange = (event: SelectChangeEvent) => {
    setFormData(prev => ({
      ...prev,

      status: event.target.value as Exam["status"],
    }));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      alert("Exam ID is missing.");

      return;
    }

    // =================================================
    // REQUIRED FIELDS
    // =================================================

    if (!formData.title.trim()) {
      alert("Exam title is required.");

      return;
    }

    if (!formData.board.trim()) {
      alert("Board is required.");

      return;
    }

    if (!formData.standard) {
      alert("Standard is required.");

      return;
    }

    if (!formData.subject.trim()) {
      alert("Subject is required.");

      return;
    }

    if (!formData.examType.trim()) {
      alert("Exam type is required.");

      return;
    }

    if (!formData.durationMinutes) {
      alert("Duration is required.");

      return;
    }

    // =================================================
    // NUMBER VALIDATION
    // =================================================

    const standard = Number(formData.standard);

    const durationMinutes = Number(formData.durationMinutes);

    if (Number.isNaN(standard) || standard <= 0) {
      alert("Please enter a valid standard.");

      return;
    }

    if (Number.isNaN(durationMinutes) || durationMinutes <= 0) {
      alert("Please enter a valid duration.");

      return;
    }

    // =================================================
    // DATE VALIDATION
    // =================================================

    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.endDate) <= new Date(formData.startDate)
    ) {
      alert("End date must be after start date.");

      return;
    }

    // =================================================
    // UPDATE
    // =================================================

    try {
      setSaving(true);

      const response = await updateExam(id, {
        title: formData.title.trim(),

        board: formData.board.trim(),

        standard,

        subject: formData.subject.trim(),

        chapter: formData.chapter.trim(),

        examType: formData.examType.trim(),

        durationMinutes,

        negativeMarking: formData.negativeMarking,

        negativeMarks: formData.negativeMarking
          ? Number(formData.negativeMarks || 0)
          : 0,

        startDate: formData.startDate
          ? new Date(formData.startDate).toISOString()
          : undefined,

        endDate: formData.endDate
          ? new Date(formData.endDate).toISOString()
          : undefined,

        status: formData.status,
      });

      console.log("UPDATE EXAM RESPONSE:", response);

      if (!response.success) {
        alert(response.message || "Failed to update exam.");

        return;
      }

      alert("Exam updated successfully.");

      navigate(`/exams/view/${id}`);
    } catch (error: unknown) {
  console.error("UPDATE EXAM ERROR:", error);

  if (axios.isAxiosError(error)) {
    console.error("STATUS:", error.response?.status);
    console.error("RESPONSE:", error.response?.data);

    alert(
      error.response?.data?.message ||
        "Failed to update exam.",
    );
  } else {
    alert("Failed to update exam.");
  }
}finally {
      setSaving(false);
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
          mb: 3,
        }}>
        Edit Exam
      </Typography>

      <Card elevation={3}>
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}>
            {/* TITLE */}

            <TextField
              fullWidth
              label="Exam Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              sx={{mb: 2}}
            />

            {/* BOARD */}

            <TextField
              fullWidth
              label="Board"
              name="board"
              value={formData.board}
              onChange={handleChange}
              sx={{mb: 2}}
            />

            {/* STANDARD */}

            <TextField
              fullWidth
              type="number"
              label="Standard"
              name="standard"
              value={formData.standard}
              onChange={handleChange}
              sx={{mb: 2}}
            />

            {/* SUBJECT */}

            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              sx={{mb: 2}}
            />

            {/* CHAPTER */}

            <TextField
              fullWidth
              label="Chapter"
              name="chapter"
              value={formData.chapter}
              onChange={handleChange}
              sx={{mb: 2}}
            />

            {/* EXAM TYPE */}

            <TextField
              fullWidth
              label="Exam Type"
              name="examType"
              value={formData.examType}
              onChange={handleChange}
              sx={{mb: 2}}
            />

            {/* DURATION */}

            <TextField
              fullWidth
              type="number"
              label="Duration (Minutes)"
              name="durationMinutes"
              value={formData.durationMinutes}
              onChange={handleChange}
              sx={{mb: 2}}
            />

            {/* NEGATIVE MARKING */}

            <FormControlLabel
              control={
                <Switch
                  checked={formData.negativeMarking}
                  onChange={handleNegativeMarkingChange}
                />
              }
              label="Enable Negative Marking"
              sx={{mb: 2}}
            />

            {/* NEGATIVE MARKS */}

            {formData.negativeMarking && (
              <TextField
                fullWidth
                type="number"
                label="Negative Marks"
                name="negativeMarks"
                value={formData.negativeMarks}
                onChange={handleChange}
                sx={{mb: 2}}
              />
            )}

            {/* START DATE */}

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
              sx={{mb: 2}}
            />

            {/* END DATE */}

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
              sx={{mb: 2}}
            />

            {/* STATUS */}

            <FormControl
              fullWidth
              sx={{mb: 3}}>
              <InputLabel id="status-label">Status</InputLabel>

              <Select
                labelId="status-label"
                value={formData.status}
                label="Status"
                onChange={handleStatusChange}>
                <MenuItem value="Draft">Draft</MenuItem>

                <MenuItem value="Published">Published</MenuItem>

                <MenuItem value="Completed">Completed</MenuItem>

                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>

            {/* BUTTONS */}

            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/exams/view/${id}`)}
                disabled={saving}>
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="warning"
                disabled={saving}>
                {saving ? "Updating..." : "Update Exam"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditExam;
