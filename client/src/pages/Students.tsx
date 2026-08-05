import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  TextField,
  TablePagination,
  TableContainer,
  Box,
} from "@mui/material";

import DeleteDialog from "../components/DeleteDialog";
import {getStudents, deleteStudent} from "../services/student.service";

interface Student {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  board: string;
  standard: number;
  school: string;
}

const Students = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Load Students
  const loadStudents = async () => {
    setLoading(true);

    try {
      const response = await getStudents();

      if (response.success) {
        setStudents(response.data);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error("Error loading students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadStudents();
  }, []);

  // Search
  const filteredStudents = students.filter(student => {
    const keyword = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(keyword) ||
      student.email.toLowerCase().includes(keyword) ||
      student.mobile.includes(search) ||
      student.board.toLowerCase().includes(keyword) ||
      student.school.toLowerCase().includes(keyword) ||
      student.standard.toString().includes(search)
    );
  });

  // Pagination
  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  // Delete
  const handleDelete = async () => {
    try {
      await deleteStudent(deleteId);

      setDialogOpen(false);
      setDeleteId("");

      await loadStudents();

      if (page > 0 && filteredStudents.length - 1 <= page * rowsPerPage) {
        setPage(page - 1);
      }
    } catch (error) {
      console.error("Delete Error:", error);
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
        Students
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{mb: 2}}
        onClick={() => navigate("/students/add")}>
        Add Student
      </Button>

      <TextField
        fullWidth
        label="Search Student"
        variant="outlined"
        sx={{mb: 2}}
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setPage(0);
        }}
      />

      <Paper sx={{p: 2}}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Board</TableCell>
                <TableCell>Standard</TableCell>
                <TableCell>School</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(student => (
                    <TableRow key={student._id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.mobile}</TableCell>
                      <TableCell>{student.board}</TableCell>
                      <TableCell>{student.standard}</TableCell>
                      <TableCell>{student.school}</TableCell>

                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          sx={{mr: 1}}
                          onClick={() =>
                            navigate(`/students/edit/${student._id}`)
                          }>
                          Edit
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => {
                            setDeleteId(student._id);
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
                    colSpan={7}>
                    No students found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredStudents.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <DeleteDialog
        open={dialogOpen}
        title="Delete Student"
        message="Are you sure you want to delete this student?"
        onClose={() => {
          setDialogOpen(false);
          setDeleteId("");
        }}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Students;
