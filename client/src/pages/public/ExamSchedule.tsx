import {Box, Card, CardContent, Chip, Typography} from "@mui/material";

import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";

import PublicPageLayout from "./PublicPageLayout";

const ExamSchedule = () => {
  const schedules = [
    {
      title: "Upcoming Online Examinations",
      standard: "6th - 12th Standard",
      date: "Schedule will be announced",
      time: "Time will be announced",
      status: "Coming Soon",
    },
    {
      title: "Practice Examinations",
      standard: "6th - 12th Standard",
      date: "Schedule will be announced",
      time: "Time will be announced",
      status: "Coming Soon",
    },
  ];

  return (
    <PublicPageLayout
      title="Exam Schedule"
      subtitle="Stay informed about upcoming examinations and plan your preparation.">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
          },
          gap: 3,
        }}>
        {schedules.map(schedule => (
          <Card
            key={schedule.title}
            elevation={0}
            sx={{
              border: "1px solid #e2e8f0",
              borderRadius: 3,
            }}>
            <CardContent sx={{p: 4}}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 2,
                  mb: 3,
                }}>
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
                  }}>
                  <SchoolIcon />
                </Box>

                <Chip
                  label={schedule.status}
                  size="small"
                  sx={{
                    backgroundColor: "#fef3c7",
                    color: "#92400e",
                    fontWeight: 700,
                  }}
                />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: "#0f172a",
                  mb: 1,
                }}>
                {schedule.title}
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  mb: 3,
                }}>
                {schedule.standard}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}>
                  <EventIcon
                    sx={{
                      color: "#1976d2",
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#334155",
                    }}>
                    {schedule.date}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}>
                  <AccessTimeIcon
                    sx={{
                      color: "#1976d2",
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#334155",
                    }}>
                    {schedule.time}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          mt: 5,
          textAlign: "center",
          p: {
            xs: 3,
            md: 5,
          },
          borderRadius: 3,
          backgroundColor: "#f1f5f9",
        }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "#0f172a",
            mb: 1,
          }}>
          Stay Updated
        </Typography>

        <Typography
          sx={{
            maxWidth: 650,
            mx: "auto",
            color: "#64748b",
            lineHeight: 1.8,
          }}>
          Please check this page regularly for the latest examination dates,
          timings and schedule updates.
        </Typography>
      </Box>
    </PublicPageLayout>
  );
};

export default ExamSchedule;
