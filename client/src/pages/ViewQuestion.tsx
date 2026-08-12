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

import {getQuestion} from "../services/question.service";
import type {Question} from "../services/question.service";

const ViewQuestion = () => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestion = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const response = await getQuestion(id);

        console.log("VIEW QUESTION RESPONSE:", response);

        if (response.success) {
          setQuestion(response.data);
        } else {
          alert(response.message || "Question not found");
        }
      } catch (error) {
        console.error("View Question Error:", error);
        alert("Failed to load question");
      } finally {
        setLoading(false);
      }
    };

    void loadQuestion();
  }, [id]);

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

  if (!question) {
    return (
      <Box sx={{p: 3}}>
        <Typography variant="h5">Question not found</Typography>

        <Button
          sx={{mt: 2}}
          variant="contained"
          onClick={() => navigate("/questions")}>
          Back to Questions
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{p: 3}}>
      <Typography
        variant="h4"
        sx={{fontWeight: "bold", mb: 3}}>
        View Question
      </Typography>

      <Card elevation={3}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{fontWeight: "bold", mb: 2}}>
            Question
          </Typography>

          <Typography sx={{mb: 3}}>{question.question}</Typography>

          <Divider sx={{mb: 3}} />

          <Typography sx={{mb: 1}}>
            <strong>A.</strong> {question.optionA}
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>B.</strong> {question.optionB}
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>C.</strong> {question.optionC}
          </Typography>

          <Typography sx={{mb: 1}}>
            <strong>D.</strong> {question.optionD}
          </Typography>

          <Divider sx={{my: 3}} />

          <Box sx={{display: "flex", gap: 2, flexWrap: "wrap"}}>
            <Chip
              label={`Correct Answer: ${question.correctAnswer}`}
              color="success"
            />

            <Chip label={`Marks: ${question.marks}`} />

            <Chip label={`Negative Marks: ${question.negativeMarks}`} />

            <Chip
              label={question.difficulty}
              color="warning"
            />

            <Chip
              label={question.status}
              color={question.status === "Active" ? "success" : "default"}
            />
          </Box>

          <Divider sx={{my: 3}} />

          <Typography>
            <strong>Board:</strong> {question.board}
          </Typography>

          <Typography>
            <strong>Standard:</strong> {question.standard}
          </Typography>

          <Typography>
            <strong>Subject:</strong> {question.subject}
          </Typography>

          <Typography>
            <strong>Chapter:</strong> {question.chapter || "Not specified"}
          </Typography>

          <Divider sx={{my: 3}} />

          <Typography variant="h6">Explanation</Typography>

          <Typography
            sx={{mt: 1}}
            color="text.secondary">
            {question.explanation || "No explanation available."}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 4,
            }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/questions")}>
              Back
            </Button>

            <Button
              variant="contained"
              color="warning"
              onClick={() => navigate(`/questions/edit/${question._id}`)}>
              Edit Question
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewQuestion;
