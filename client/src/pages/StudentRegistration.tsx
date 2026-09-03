import {useState} from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SchoolIcon from "@mui/icons-material/School";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import api from "../services/api";

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

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Indian mobile validation
  const isValidMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    // Allow only numbers for mobile fields
    if (name === "mobile" || name === "parentMobile") {
      const numericValue = value.replace(/\D/g, "");

      setStudent({
        ...student,
        [name]: numericValue,
      });

      return;
    }

    setStudent({
      ...student,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Required field validation
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

    // Email validation
    if (!isValidEmail(student.email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    // Student mobile validation
    if (!isValidMobile(student.mobile)) {
      alert(
        "Please enter a valid 10-digit student mobile number starting with 6, 7, 8 or 9.",
      );
      return;
    }

    // Parent mobile validation
    if (!isValidMobile(student.parentMobile)) {
      alert(
        "Please enter a valid 10-digit parent/guardian mobile number starting with 6, 7, 8 or 9.",
      );
      return;
    }

    // Password validation
    if (student.password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    // Terms and Privacy Policy validation
    if (!termsAccepted) {
      alert(
        "Please agree to the Terms & Conditions and Privacy Policy before registering.",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/students/register", {
        ...student,
        email: student.email.trim().toLowerCase(),
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
              {/* Student Name */}

              <TextField
                fullWidth
                required
                label="Student Name"
                name="name"
                value={student.name}
                onChange={handleChange}
              />

              {/* Email */}

              <TextField
                fullWidth
                required
                type="email"
                label="Email"
                name="email"
                value={student.email}
                onChange={handleChange}
                error={student.email.length > 0 && !isValidEmail(student.email)}
                helperText={
                  student.email.length > 0 && !isValidEmail(student.email)
                    ? "Please enter a valid email address"
                    : ""
                }
              />

              {/* Student Mobile */}

              <TextField
                fullWidth
                required
                label="Mobile Number"
                name="mobile"
                value={student.mobile}
                onChange={handleChange}
                error={
                  student.mobile.length > 0 && !isValidMobile(student.mobile)
                }
                helperText={
                  student.mobile.length > 0 && !isValidMobile(student.mobile)
                    ? "Enter a valid 10-digit mobile number"
                    : ""
                }
              />

              {/* Password */}

              <TextField
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                value={student.password}
                onChange={handleChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          aria-label="toggle password visibility">
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Confirm Password */}

              <TextField
                fullWidth
                required
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
                error={
                  confirmPassword.length > 0 &&
                  student.password !== confirmPassword
                }
                helperText={
                  confirmPassword.length > 0 &&
                  student.password !== confirmPassword
                    ? "Passwords do not match"
                    : ""
                }
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                          aria-label="toggle confirm password visibility">
                          {showConfirmPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Board */}

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

              {/* Standard */}

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

              {/* School */}

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

              {/* Parent Name */}

              <TextField
                fullWidth
                required
                label="Parent / Guardian Name"
                name="parentName"
                value={student.parentName}
                onChange={handleChange}
              />

              {/* Parent Mobile */}

              <TextField
                fullWidth
                required
                label="Parent / Guardian Mobile"
                name="parentMobile"
                value={student.parentMobile}
                onChange={handleChange}
                error={
                  student.parentMobile.length > 0 &&
                  !isValidMobile(student.parentMobile)
                }
                helperText={
                  student.parentMobile.length > 0 &&
                  !isValidMobile(student.parentMobile)
                    ? "Enter a valid 10-digit mobile number"
                    : ""
                }
              />
            </Box>

            {/* Terms & Privacy Policy */}

            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={event => setTermsAccepted(event.target.checked)}
                  />
                }
                label={
                  <Typography
                    sx={{
                      color: "#475569",
                      fontSize: {
                        xs: "0.85rem",
                        sm: "0.9rem",
                      },
                    }}>
                    I agree to the{" "}
                    <Box
                      component="span"
                      sx={{
                        color: "#1976d2",
                        fontWeight: 700,
                      }}>
                      Terms & Conditions
                    </Box>{" "}
                    and{" "}
                    <Box
                      component="span"
                      sx={{
                        color: "#1976d2",
                        fontWeight: 700,
                      }}>
                      Privacy Policy
                    </Box>
                    .
                  </Typography>
                }
              />
            </Box>

            {/* Buttons */}

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
                disabled={loading || !termsAccepted}
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
