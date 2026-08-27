import {Box, Card, CardContent, Typography} from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SchoolIcon from "@mui/icons-material/School";

import PublicPageLayout from "./PublicPageLayout";

const Boards = () => {
  const boards = [
    {
      title: "CBSE",
      description:
        "Central Board of Secondary Education students can use the platform to practice and take online examinations.",
    },
    {
      title: "State Board",
      description:
        "State Board students can prepare for their academic examinations through structured online assessments.",
    },
    {
      title: "Other Boards",
      description:
        "Additional educational boards can be supported as the RankOne platform continues to grow.",
    },
  ];

  return (
    <PublicPageLayout
      title="Boards"
      subtitle="Explore the educational boards supported by the RankOne online examination platform.">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}>
        {boards.map(board => (
          <Card
            key={board.title}
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
            <CardContent sx={{p: 4}}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 3,
                  backgroundColor: "#eaf4ff",
                  color: "#1976d2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}>
                <AccountBalanceIcon sx={{fontSize: 34}} />
              </Box>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#0f172a",
                  mb: 1.5,
                }}>
                {board.title}
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  lineHeight: 1.8,
                }}>
                {board.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          mt: 5,
          p: {
            xs: 3,
            md: 4,
          },
          borderRadius: 3,
          backgroundColor: "#eff6ff",
          border: "1px solid #dbeafe",
          display: "flex",
          alignItems: {
            xs: "flex-start",
            md: "center",
          },
          gap: 2,
        }}>
        <SchoolIcon
          sx={{
            color: "#1976d2",
            fontSize: 35,
          }}
        />

        <Box>
          <Typography
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              mb: 0.5,
            }}>
            Growing with Students
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              lineHeight: 1.7,
            }}>
            Our platform can continue expanding to support more boards,
            curricula and examination patterns.
          </Typography>
        </Box>
      </Box>
    </PublicPageLayout>
  );
};

export default Boards;
