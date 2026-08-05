import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";

import {getStudent, updateStudent} from "../services/student.service";

interface StudentForm {
  name: string;
  email: string;
  mobile: string;
  password: string;
  board: string;
  standard: string;
  school: string;
  parentName: string;
  parentMobile: string;
  subscriptionType: string;
  status: string;
}

const EditStudent = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState<StudentForm>({
    name: "",
    email: "",
    mobile: "",
    password: "",
    board: "",
    standard: "",
    school: "",
    parentName: "",
    parentMobile: "",
    subscriptionType: "Free",
    status: "Active",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (!id) return;

        const response = await getStudent(id);

        if (response.success) {
          setStudent({
            name: response.data.name || "",
            email: response.data.email || "",
            mobile: response.data.mobile || "",
            password: "",
            board: response.data.board || "",
            standard: String(response.data.standard || ""),
            school: response.data.school || "",
            parentName: response.data.parentName || "",
            parentMobile: response.data.parentMobile || "",
            subscriptionType: response.data.subscriptionType || "Free",
            status: response.data.status || "Active",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    void fetchStudent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!id) return;

      const payload = {...student};

      if (!payload.password) {
        delete (payload as Partial<StudentForm>).password;
      }

      await updateStudent(id, payload);

      alert("Student Updated Successfully");

      navigate("/students");
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper sx={{p: 3}}>
      <Typography
        variant="h4"
        gutterBottom>
        Edit Student
      </Typography>

      <Grid
        container
        spacing={2}>
        <Grid size={{xs: 12, md: 6}}>
          <TextField
            fullWidth
            label="Student Name"
            name="name"
            value={student.name}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{xs: 12, md: 6}}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={student.email}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{xs: 12, md: 6}}>
          <TextField
            fullWidth
            label="Mobile"
            name="mobile"
            value={student.mobile}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{xs: 12, md: 6}}>
          <TextField
            fullWidth
            type="password"
            label="New Password (Optional)"
            name="password"
            value={student.password}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{xs: 12, md: 6}}>
          <TextField
            select
            fullWidth
            label="Board"
            name="board"
            value={student.board}
            onChange={handleChange}>
            <MenuItem value="State Board">State Board</MenuItem>
            <MenuItem value="CBSE">CBSE</MenuItem>
            <MenuItem value="ICSE">ICSE</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{xs: 12, md: 6}}>
          <TextField
            fullWidth
            label="Standard"
            name="standard"
            value={student.standard}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{xs: 12}}>
          <TextField
            fullWidth
            label="School"
            name="school"
            value={student.school}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{xs: 12, md: 6}}>
          <TextField
            fullWidth
            label="Parent Name"
            name="parentName"
            value={student.parentName}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{xs: 12, md: 6}}>
          <TextField
            fullWidth
            label="Parent Mobile"
            name="parentMobile"
            value={student.parentMobile}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{xs: 12, md: 6}}>
          <TextField
            select
            fullWidth
            label="Subscription"
            name="subscriptionType"
            value={student.subscriptionType}
            onChange={handleChange}>
            <MenuItem value="Free">Free</MenuItem>
            <MenuItem value="Premium">Premium</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{xs: 12, md: 6}}>
          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={student.status}
            onChange={handleChange}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{xs: 12}}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{mr: 2}}>
            Update Student
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/students")}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EditStudent;
