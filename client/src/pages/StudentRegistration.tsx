import {useState} from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const StudentRegistration = () => {
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
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !student.name.trim() ||
      !student.email.trim() ||
      !student.mobile.trim() ||
      !student.password.trim() ||
      !student.board ||
      !student.standard ||
      !student.school.trim() ||
      !student.parentName.trim() ||
      !student.parentMobile.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
  "http://localhost:5000/api/students/register", {
        ...student,
        standard: Number(student.standard),
        subscriptionType: "Free",
      });

      if (response.data?.success) {
        alert(
          "Registration successful! Please login with your email or mobile.",
        );

        navigate("/student/login");
      } else {
        alert(response.data?.message || "Registration failed.");
      }
    } catch (error: unknown) {
      console.error("STUDENT REGISTRATION ERROR:", error);

      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Unable to register student.");
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        py: {
          xs: 4,
          md: 7,
        },
      }}>
      <Container maxWidth="md">
        {/* Header */}

        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: 3,
              backgroundColor: "#1976d2",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}>
            <SchoolIcon sx={{fontSize: 34}} />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              mb: 1,
            }}>
            Student Registration
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
            }}>
            Create your RankOne student account
          </Typography>
        </Box>

        {/* Registration Form */}

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 3,
              md: 5,
            },
            borderRadius: 4,
            border: "1px solid #e2e8f0",
          }}>
          <Box
            component="form"
            onSubmit={handleSubmit}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#0f172a",
                mb: 3,
              }}>
              Student Details
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr",
                },
                gap: 2,
              }}>
              <TextField
                fullWidth
                required
                label="Student Name"
                name="name"
                value={student.name}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                required
                type="email"
                label="Email"
                name="email"
                value={student.email}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                required
                label="Mobile Number"
                name="mobile"
                value={student.mobile}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                required
                type="password"
                label="Password"
                name="password"
                value={student.password}
                onChange={handleChange}
              />

              <TextField
                select
                fullWidth
                required
                label="Board"
                name="board"
                value={student.board}
                onChange={handleChange}>
                <MenuItem value="State Board">State Board</MenuItem>

                <MenuItem value="CBSE">CBSE</MenuItem>

                <MenuItem value="ICSE">ICSE</MenuItem>

                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                required
                label="Standard"
                name="standard"
                value={student.standard}
                onChange={handleChange}>
                {[6, 7, 8, 9, 10, 11, 12].map(standard => (
                  <MenuItem
                    key={standard}
                    value={standard}>
                    {standard}th Standard
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                required
                label="School Name"
                name="school"
                value={student.school}
                onChange={handleChange}
                sx={{
                  gridColumn: {
                    xs: "auto",
                    md: "1 / -1",
                  },
                }}
              />

              <TextField
                fullWidth
                required
                label="Parent / Guardian Name"
                name="parentName"
                value={student.parentName}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                required
                label="Parent / Guardian Mobile"
                name="parentMobile"
                value={student.parentMobile}
                onChange={handleChange}
              />
            </Box>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                gap: 2,
                flexDirection: {
                  xs: "column-reverse",
                  sm: "row",
                },
              }}>
              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={() => navigate("/student/login")}
                sx={{
                  py: 1.4,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                }}>
                Already have an account?
              </Button>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.4,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  backgroundColor: "#1976d2",
                }}>
                {loading ? "Creating Account..." : "Create Student Account"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StudentRegistration;
