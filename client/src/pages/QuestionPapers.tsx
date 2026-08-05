import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

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

import {
  getQuestionPapers,
  deleteQuestionPaper,
} from "../services/questionPaper.service";

import DeleteDialog from "../components/DeleteDialog";

interface QuestionPaper {
  _id: string;
  title: string;
  board: string;
  standard: number;
  subject: string;
  examType: string;
  status: string;
  pdfFile: string;
}

const QuestionPapers = () => {
  const navigate = useNavigate();

  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const loadQuestionPapers = async () => {
    setLoading(true);

    try {
      const response = await getQuestionPapers();

      console.log("API RESPONSE:", response);

      if (response.success) {
        setQuestionPapers(response.data);
      } else {
        setQuestionPapers([]);
      }
    } catch (error) {
      console.error("Error loading question papers:", error);
      setQuestionPapers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadQuestionPapers();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteQuestionPaper(deleteId);

      setDialogOpen(false);
      setDeleteId("");

      await loadQuestionPapers();
    } catch (error) {
      console.error("Delete Error:", error);

      setDialogOpen(false);
      setDeleteId("");
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
    <>
      <Typography
        variant="h4"
        gutterBottom>
        Question Papers
      </Typography>

      <Button
        variant="contained"
        sx={{mb: 2}}
        onClick={() => navigate("/questionpapers/add")}>
        Add Question Paper
      </Button>

      <Paper sx={{p: 2}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Board</TableCell>
              <TableCell>Standard</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>PDF File</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {questionPapers.length > 0 ? (
              questionPapers.map(paper => (
                <TableRow key={paper._id}>
                  <TableCell>{paper.title}</TableCell>
                  <TableCell>{paper.board}</TableCell>
                  <TableCell>{paper.standard}</TableCell>
                  <TableCell>{paper.subject}</TableCell>
                  <TableCell>{paper.examType}</TableCell>
                  <TableCell>{paper.status}</TableCell>

                  <TableCell>{paper.pdfFile}</TableCell>

                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="contained"
                      color="info"
                      sx={{mr: 1}}
                      onClick={() => {
                        if (!paper.pdfFile) {
                          alert("PDF file not found.");
                          return;
                        }

                        let file = paper.pdfFile;

                        file = file.replace("uploads/question-papers/", "");
                        file = file.replace("uploads/", "");

                        window.open(
                          `http://localhost:5000/uploads/${file}`,
                          "_blank",
                        );
                      }}>
                      View
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      sx={{mr: 1}}
                      onClick={() =>
                        navigate(`/questionpapers/edit/${paper._id}`)
                      }>
                      Edit
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setDeleteId(paper._id);
                        setDialogOpen(true);
                      }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center">
                  No Question Papers Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <DeleteDialog
        open={dialogOpen}
        title="Delete Question Paper"
        message="Are you sure you want to delete this question paper?"
        onClose={() => {
          setDialogOpen(false);
          setDeleteId("");
        }}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default QuestionPapers;
