import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import {getExam} from "../services/exam.service";
import {startExamAttempt, submitExam} from "../services/examAttempt.service";
import {getQuestionsForExam} from "../services/question.service";
import {saveStudentAnswer} from "../services/studentAnswer.service";

// =====================================================
// EXAM INTERFACE
// =====================================================

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

// =====================================================
// QUESTION INTERFACE
// =====================================================

interface Question {
  _id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer?: "A" | "B" | "C" | "D";
  marks?: number;
  negativeMarks?: number;
  difficulty?: "Easy" | "Medium" | "Hard";
  explanation?: string;
}

// =====================================================
// ANSWER TYPE
// =====================================================

type Answer = "A" | "B" | "C" | "D";

// =====================================================
// TAKE EXAM
// =====================================================

const TakeExam = () => {
  const {id: examId} = useParams<{id: string}>();
  const navigate = useNavigate();

  const [exam, setExam] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [attemptId, setAttemptId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [timeLeft, setTimeLeft] = useState(0);
  const [savingAnswer, setSavingAnswer] = useState(false);

  // =====================================================
  // TRACK LAST ANSWER SAVE REQUEST
  // =====================================================

  const lastAnswerSaveRef = useRef<Promise<void> | null>(null);

  // =====================================================
  // LOAD EXAM
  // =====================================================

  useEffect(() => {
    const loadExam = async () => {
      if (!examId) {
        setError("Exam ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const studentId = localStorage.getItem("studentId") || "";

        console.log("CURRENT STUDENT ID:", studentId);

        if (!studentId) {
          setError("Student information not found. Please login again.");
          return;
        }

        // =================================================
        // GET EXAM
        // =================================================

        const examResponse = await getExam(examId);

        console.log("TAKE EXAM RESPONSE:", examResponse);

        if (!examResponse.success || !examResponse.data) {
          setError("Exam could not be loaded.");
          return;
        }

        const examData = examResponse.data;

        setExam(examData);

        // =================================================
        // TIMER
        // =================================================

        const duration = examData.durationMinutes ?? 0;

        setTimeLeft(duration * 60);

        // =================================================
        // START / RECOVER ATTEMPT
        // =================================================

        console.log("BEFORE START EXAM ATTEMPT:", {
          studentId,
          examId,
        });

        const attemptResponse = await startExamAttempt(studentId, examId);

        console.log("AFTER START EXAM ATTEMPT:", attemptResponse);

        if (!attemptResponse.success || !attemptResponse.data) {
          setError(attemptResponse.message || "Unable to start exam.");
          return;
        }

        setAttemptId(attemptResponse.data._id);

        // =================================================
        // LOAD QUESTIONS
        // =================================================

        const questionResponse = await getQuestionsForExam(examId);

        console.log("EXAM QUESTIONS RESPONSE:", questionResponse);

        if (!questionResponse.success || !questionResponse.data) {
          setError("Questions could not be loaded.");
          return;
        }

        setQuestions(questionResponse.data);
      } catch (loadError: unknown) {
        console.error("TAKE EXAM LOAD ERROR:", loadError);

        if (
          typeof loadError === "object" &&
          loadError !== null &&
          "response" in loadError
        ) {
          const axiosError = loadError as {
            response?: {
              data?: {
                message?: string;
              };
            };
          };

          setError(
            axiosError.response?.data?.message ||
              "Something went wrong while loading the exam.",
          );
        } else {
          setError("Something went wrong while loading the exam.");
        }
      } finally {
        setLoading(false);
      }
    };

    void loadExam();
  }, [examId]);

  // =====================================================
  // TIMER
  // =====================================================

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft(previous => {
        if (previous <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [timeLeft]);

  // =====================================================
  // FORMAT TIMER
  // =====================================================

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;

  // =====================================================
  // ANSWER COUNT
  // =====================================================

  const answeredCount = Object.keys(answers).length;

  const allQuestionsAnswered =
    questions.length > 0 && answeredCount === questions.length;

  // =====================================================
  // SELECT ANSWER
  // =====================================================

  const handleAnswerChange = (answer: Answer) => {
    const question = questions[currentQuestion];

    if (!question || !attemptId) {
      return;
    }

    // =================================================
    // UPDATE UI IMMEDIATELY
    // =================================================

    setAnswers(previous => ({
      ...previous,
      [question._id]: answer,
    }));

    // =================================================
    // SAVE ANSWER
    // =================================================

    setSavingAnswer(true);

    const saveRequest = saveStudentAnswer({
      attemptId,
      questionId: question._id,
      selectedAnswer: answer,
    })
      .then(response => {
        console.log("STUDENT ANSWER SAVED:", response);
      })
      .catch(error => {
        console.error("SAVE STUDENT ANSWER ERROR:", error);
      })
      .finally(() => {
        setSavingAnswer(false);
      });

    lastAnswerSaveRef.current = saveRequest;
  };

  // =====================================================
  // SUBMIT EXAM
  // =====================================================

  const handleSubmit = async () => {
    if (!attemptId) {
      setError("Exam attempt not found.");
      return;
    }

    // =================================================
    // CHECK ALL QUESTIONS ANSWERED
    // =================================================

    if (!allQuestionsAnswered) {
      setError(
        `Please answer all questions before submitting. ${answeredCount}/${questions.length} answered.`,
      );
      return;
    }

    // =================================================
    // WAIT FOR LAST ANSWER SAVE
    // =================================================

    if (lastAnswerSaveRef.current) {
      setSavingAnswer(true);

      try {
        await lastAnswerSaveRef.current;
      } finally {
        setSavingAnswer(false);
      }
    }

    try {
      setLoading(true);
      setError("");

      console.log("SUBMITTING EXAM:", {
        examId,
        attemptId,
        answeredCount,
        totalQuestions: questions.length,
      });

      // =================================================
      // SUBMIT EXAM
      // =================================================

      const response = await submitExam(attemptId);

      console.log(
        "SUBMIT EXAM RESPONSE JSON:",
        JSON.stringify(response, null, 2),
      );

      if (!response.success) {
        setError(response.message || "Unable to submit exam.");
        return;
      }

      // =================================================
      // EVALUATION
      // =================================================

      console.log(
        "EXAM EVALUATED JSON:",
        JSON.stringify(response.result, null, 2),
      );

      navigate(`/student/result/${attemptId}`);
    } catch (error: unknown) {
      console.error("SUBMIT EXAM ERROR:", error);

      setError("Unable to submit exam. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // NEXT QUESTION
  // =====================================================

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(previous => previous + 1);
    }
  };

  // =====================================================
  // PREVIOUS QUESTION
  // =====================================================

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(previous => previous - 1);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <Box sx={{p: 3}}>
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              color="error"
              sx={{mb: 2}}>
              {error}
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/student/exams")}>
              Back to Exams
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // =====================================================
  // NO QUESTIONS
  // =====================================================

  if (!exam || questions.length === 0) {
    return (
      <Box sx={{p: 3}}>
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              sx={{mb: 2}}>
              No Questions Found
            </Typography>

            <Typography
              variant="body2"
              sx={{mb: 2}}>
              This exam does not have any questions available yet.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/student/exams")}>
              Back to Exams
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // =====================================================
  // CURRENT QUESTION
  // =====================================================

  const question = questions[currentQuestion];

  const selectedAnswer = answers[question._id] || "";

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 4,
        },
        maxWidth: "1000px",
        margin: "0 auto",
      }}>
      {/* =================================================
          EXAM HEADER
          ================================================= */}

      <Card sx={{mb: 3}}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 2,
              flexWrap: "wrap",
            }}>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                }}>
                {exam.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary">
                {exam.subject || "-"} • Standard {exam.standard || "-"} •{" "}
                {exam.examType || "-"}
              </Typography>
            </Box>

            {/* TIMER */}

            <Box
              sx={{
                textAlign: "center",
                minWidth: "120px",
              }}>
              <Typography
                variant="caption"
                color="text.secondary">
                Time Left
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: timeLeft <= 60 ? "error.main" : "primary.main",
                }}>
                {formattedTime}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{my: 2}} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}>
            <Typography>
              Question {currentQuestion + 1} of {questions.length}
            </Typography>

            <Typography>Marks: {question.marks ?? 1}</Typography>

            {/* ANSWER COUNT */}

            <Typography
              sx={{
                fontWeight: "bold",
                color: allQuestionsAnswered ? "success.main" : "warning.main",
              }}>
              Answered: {answeredCount}/{questions.length}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* =================================================
          QUESTION
          ================================================= */}

      <Card>
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 3,
              lineHeight: 1.6,
            }}>
            {currentQuestion + 1}. {question.question}
          </Typography>

          <FormControl fullWidth>
            <RadioGroup
              value={selectedAnswer}
              onChange={event =>
                handleAnswerChange(event.target.value as Answer)
              }>
              {/* OPTION A */}

              <FormControlLabel
                value="A"
                control={<Radio />}
                label={<Typography>A. {question.optionA}</Typography>}
                sx={{
                  mb: 1,
                  p: 1,
                  border: "1px solid",
                  borderColor:
                    selectedAnswer === "A" ? "primary.main" : "divider",
                  borderRadius: 1,
                }}
              />

              {/* OPTION B */}

              <FormControlLabel
                value="B"
                control={<Radio />}
                label={<Typography>B. {question.optionB}</Typography>}
                sx={{
                  mb: 1,
                  p: 1,
                  border: "1px solid",
                  borderColor:
                    selectedAnswer === "B" ? "primary.main" : "divider",
                  borderRadius: 1,
                }}
              />

              {/* OPTION C */}

              <FormControlLabel
                value="C"
                control={<Radio />}
                label={<Typography>C. {question.optionC}</Typography>}
                sx={{
                  mb: 1,
                  p: 1,
                  border: "1px solid",
                  borderColor:
                    selectedAnswer === "C" ? "primary.main" : "divider",
                  borderRadius: 1,
                }}
              />

              {/* OPTION D */}

              <FormControlLabel
                value="D"
                control={<Radio />}
                label={<Typography>D. {question.optionD}</Typography>}
                sx={{
                  mb: 1,
                  p: 1,
                  border: "1px solid",
                  borderColor:
                    selectedAnswer === "D" ? "primary.main" : "divider",
                  borderRadius: 1,
                }}
              />
            </RadioGroup>
          </FormControl>

          {/* =================================================
              NAVIGATION
              ================================================= */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
              gap: 2,
            }}>
            <Button
              variant="outlined"
              disabled={currentQuestion === 0 || savingAnswer}
              onClick={handlePrevious}>
              Previous
            </Button>

            {currentQuestion < questions.length - 1 ? (
              <Button
                variant="contained"
                disabled={savingAnswer}
                onClick={handleNext}>
                {savingAnswer ? "Saving..." : "Next"}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                disabled={loading || savingAnswer || !allQuestionsAnswered}>
                {loading
                  ? "Submitting..."
                  : savingAnswer
                    ? "Saving Answer..."
                    : allQuestionsAnswered
                      ? "Submit Exam"
                      : `Answer All Questions (${answeredCount}/${questions.length})`}
              </Button>
            )}
          </Box>

          {/* =================================================
              SUBMIT INFORMATION
              ================================================= */}

          {!allQuestionsAnswered &&
            currentQuestion === questions.length - 1 && (
              <Typography
                align="center"
                color="warning.main"
                sx={{
                  mt: 2,
                  fontWeight: 600,
                }}>
                Please answer all {questions.length} questions before
                submitting.
              </Typography>
            )}
        </CardContent>
      </Card>

      {/* =================================================
          DEBUG
          ================================================= */}

      <Box sx={{mt: 2}}>
        <Typography
          variant="caption"
          color="text.secondary">
          Attempt ID: {attemptId || "Not created"}
        </Typography>
      </Box>
    </Box>
  );
};

export default TakeExam;
