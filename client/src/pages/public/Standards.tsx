import {Box, Card, CardContent, Typography} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import PublicPageLayout from "./PublicPageLayout";

const Standards = () => {
  const standards = [
    {
      standard: "6th Standard",
      description:
        "Build strong academic foundations through regular practice and online assessments.",
    },
    {
      standard: "7th Standard",
      description:
        "Strengthen subject knowledge with structured examination practice.",
    },
    {
      standard: "8th Standard",
      description:
        "Improve understanding and prepare for school-level examinations.",
    },
    {
      standard: "9th Standard",
      description:
        "Develop consistent examination preparation habits and track performance.",
    },
    {
      standard: "10th Standard",
      description:
        "Prepare effectively for important academic examinations with regular practice.",
    },
    {
      standard: "11th Standard",
      description:
        "Practice subject concepts and evaluate your preparation through online exams.",
    },
    {
      standard: "12th Standard",
      description:
        "Support higher-secondary examination preparation with organized online assessments.",
    },
  ];

  return (
    <PublicPageLayout
      title="Standards"
      subtitle="RankOne is designed for students from 6th to 12th standard.">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}>
        {standards.map(item => (
          <Card
            key={item.standard}
            elevation={0}
            sx={{
              height: "100%",
              border: "1px solid #e2e8f0",
              borderRadius: 3,
              transition: "0.2s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 15px 35px rgba(15, 23, 42, 0.08)",
              },
            }}>
            <CardContent sx={{p: 3.5}}>
              <Box
                sx={{
                  width: 58,
                  height: 58,
                  borderRadius: 2.5,
                  backgroundColor: "#eaf4ff",
                  color: "#1976d2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2.5,
                }}>
                <MenuBookIcon />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: "#0f172a",
                  mb: 1,
                }}>
                {item.standard}
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  lineHeight: 1.7,
                }}>
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          mt: 5,
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
        }}>
        <SchoolIcon
          sx={{
            fontSize: 40,
            color: "#1976d2",
          }}
        />

        <Box>
          <Typography
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              mb: 0.5,
            }}>
            One platform for multiple standards
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              lineHeight: 1.7,
            }}>
            Students can find examinations according to their standard and
            available examination schedule.
          </Typography>
        </Box>
      </Box>
    </PublicPageLayout>
  );
};

export default Standards;
