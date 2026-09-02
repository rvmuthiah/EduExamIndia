import {useEffect, useState} from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import api from "../services/api";

interface Student {
  name: string;
  email: string;
  mobile: string;
  board: string;
  standard: number;
  school: string;
  parentName: string;
  parentMobile: string;
  subscriptionType: string;
  status: string;
}

const StudentProfile = () => {
  const navigate = useNavigate();

  const studentId = localStorage.getItem("studentId");
  const token = localStorage.getItem("token");

  const [student, setStudent] = useState<Student>({
    name: "",
    email: "",
    mobile: "",
    board: "",
    standard: 6,
    school: "",
    parentName: "",
    parentMobile: "",
    subscriptionType: "Free",
    status: "Active",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ============================================
  // LOAD STUDENT
  // ============================================

  useEffect(() => {
    const loadStudent = async () => {
      if (!studentId || !token) {
        navigate("/student/login");
        return;
      }

      try {
        const response = await api.get(
          `/students/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data?.success) {
          setStudent(response.data.data);
        }
      } catch (error) {
        console.error("PROFILE LOAD ERROR:", error);

        alert("Unable to load student profile.");
      } finally {
        setLoading(false);
      }
    };

    void loadStudent();
  }, [studentId, token, navigate]);

  // ============================================
  // HANDLE CHANGE
  // ============================================

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setStudent(prev => ({
      ...prev,
      [name]: name === "standard" ? Number(value) : value,
    }));
  };

  // ============================================
  // UPDATE PROFILE
  // ============================================

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!studentId || !token) {
      navigate("/student/login");
      return;
    }

    try {
      setSaving(true);

      const response = await api.put(
        `/students/${studentId}`,
        {
          name: student.name,
          email: student.email,
          mobile: student.mobile,
          board: student.board,
          standard: student.standard,
          school: student.school,
          parentName: student.parentName,
          parentMobile: student.parentMobile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data?.success) {
        // Update displayed student name
        localStorage.setItem("studentName", student.name);

        alert("Profile Updated Successfully");
      } else {
        alert(response.data?.message || "Profile update failed.");
      }
    } catch (error) {
      console.error("PROFILE UPDATE ERROR:", error);

      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Unable to update profile.");
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  // ============================================
  // PROFILE UI
  // ============================================

  return (
    <Container maxWidth="md">
      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 3,
            md: 5,
          },
          borderRadius: 3,
          border: "1px solid #e2e8f0",
        }}>
        {/* HEADER */}

        <Box sx={{mb: 4}}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 1,
            }}>
            My Profile
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
            }}>
            View and update your student information.
          </Typography>
        </Box>

        {/* FORM */}

        <Box
          component="form"
          onSubmit={handleSubmit}
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
            label="Student Name"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Mobile Number"
            name="mobile"
            value={student.mobile}
            onChange={handleChange}
            required
          />

          <TextField
            select
            fullWidth
            label="Board"
            name="board"
            value={student.board}
            onChange={handleChange}
            required>
            <MenuItem value="State Board">State Board</MenuItem>

            <MenuItem value="CBSE">CBSE</MenuItem>

            <MenuItem value="ICSE">ICSE</MenuItem>

            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Standard"
            name="standard"
            value={student.standard}
            onChange={handleChange}
            required>
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
            label="School"
            name="school"
            value={student.school}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Parent / Guardian Name"
            name="parentName"
            value={student.parentName}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Parent / Guardian Mobile"
            name="parentMobile"
            value={student.parentMobile}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Subscription"
            value={student.subscriptionType}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />

          <TextField
            fullWidth
            label="Account Status"
            value={student.status}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />

          {/* BUTTONS */}

          <Box
            sx={{
              gridColumn: {
                xs: "auto",
                md: "1 / -1",
              },
              display: "flex",
              gap: 2,
              mt: 2,
            }}>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate("/student/exams")}>
              Back to Exams
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default StudentProfile;
