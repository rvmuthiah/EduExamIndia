import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import {
  getQuestionPapers,
  deleteQuestionPaper,
} from "../services/questionPaper.service";

import DeleteDialog from "../components/DeleteDialog";
import api from "../services/api";

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

  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // -----------------------------
  // Load Question Papers
  // -----------------------------
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

  // -----------------------------
  // Delete Question Paper
  // -----------------------------
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

  // -----------------------------
  // Search Filter
  // -----------------------------
  const filteredQuestionPapers = questionPapers.filter(paper => {
    const keyword = search.toLowerCase();

    return (
      paper.title.toLowerCase().includes(keyword) ||
      paper.subject.toLowerCase().includes(keyword) ||
      paper.board.toLowerCase().includes(keyword) ||
      paper.examType.toLowerCase().includes(keyword) ||
      paper.standard.toString().includes(search)
    );
  });

  // -----------------------------
  // Pagination
  // -----------------------------
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // -----------------------------
  // Loading
  // -----------------------------
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

      <TextField
        fullWidth
        label="Search Question Paper"
        variant="outlined"
        sx={{mb: 2}}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

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
            {filteredQuestionPapers.length > 0 ? (
              filteredQuestionPapers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(paper => (
                  <TableRow key={paper._id}>
                    <TableCell>{paper.title}</TableCell>

                    <TableCell>{paper.board}</TableCell>

                    <TableCell>{paper.standard}</TableCell>

                    <TableCell>{paper.subject}</TableCell>

                    <TableCell>{paper.examType}</TableCell>

                    <TableCell>
                      <Chip
                        label={paper.status}
                        color={
                          paper.status === "Approved"
                            ? "success"
                            : paper.status === "Rejected"
                              ? "error"
                              : "warning"
                        }
                        size="small"
                      />
                    </TableCell>

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

                         const baseURL =
                           api.defaults.baseURL?.replace("/api", "") || "";

                         window.open(`${baseURL}/uploads/${file}`, "_blank");
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
                  align="center"
                  colSpan={8}>
                  No Question Papers Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredQuestionPapers.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
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
