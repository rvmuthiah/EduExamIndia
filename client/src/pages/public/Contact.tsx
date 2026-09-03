import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import PublicPageLayout from "./PublicPageLayout";

const Contact = () => {
  return (
    <PublicPageLayout
      title="Contact Us"
      subtitle="Have a question or need assistance? Get in touch with the RankOne team.">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "0.9fr 1.1fr",
          },
          gap: 4,
        }}>
        {/* Contact Information */}

        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              mb: 2,
            }}>
            Get in Touch
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              lineHeight: 1.8,
              mb: 4,
            }}>
            If you have questions about examinations, student access or the
            RankOne platform, you can contact us using the information below.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid #e2e8f0",
                borderRadius: 3,
              }}>
              <CardContent
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    backgroundColor: "#eaf4ff",
                    color: "#1976d2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <EmailIcon />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: "#0f172a",
                    }}>
                    Email
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748b",
                    }}>
                    support@eduexamindia.com
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                border: "1px solid #e2e8f0",
                borderRadius: 3,
              }}>
              <CardContent
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    backgroundColor: "#eaf4ff",
                    color: "#1976d2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <PhoneIcon />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: "#0f172a",
                    }}>
                    Phone
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748b",
                    }}>
                    Contact us for support and enquiries.
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                border: "1px solid #e2e8f0",
                borderRadius: 3,
              }}>
              <CardContent
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    backgroundColor: "#eaf4ff",
                    color: "#1976d2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <LocationOnIcon />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: "#0f172a",
                    }}>
                    Location
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748b",
                    }}>
                    India
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Contact Form */}

        <Card
          elevation={0}
          sx={{
            border: "1px solid #e2e8f0",
            borderRadius: 3,
          }}>
          <CardContent sx={{p: {xs: 3, md: 4}}}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#0f172a",
                mb: 3,
              }}>
              Send Us a Message
            </Typography>

            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}>
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Subject"
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Message"
                fullWidth
                multiline
                rows={5}
                variant="outlined"
              />

              <Button
                variant="contained"
                size="large"
                type="button"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 700,
                  py: 1.3,
                }}>
                Send Message
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </PublicPageLayout>
  );
};

export default Contact;
