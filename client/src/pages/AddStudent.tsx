import {useState} from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {createStudent} from "../services/student.service";

const AddStudent = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createStudent(student);
      alert("Student Added Successfully");
      navigate("/students");
    } catch (error) {
      console.error(error);
      alert("Unable to add student");
    }
  };

  return (
    <Paper sx={{p: 3}}>
      <Typography
        variant="h4"
        gutterBottom>
        Add Student
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
            label="Password"
            type="password"
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

        <Grid size={{xs: 12}}>
          <Button
            variant="contained"
            onClick={handleSubmit}>
            Save Student
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddStudent;
