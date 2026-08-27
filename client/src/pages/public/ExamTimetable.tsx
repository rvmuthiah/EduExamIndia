import {Box, Chip, Paper, Typography} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import PublicPageLayout from "./PublicPageLayout";

const ExamTimetable = () => {
  const timetable = [
    {
      date: "Coming Soon",
      day: "—",
      subject: "Examination timetable will be announced",
      standard: "6th - 12th",
    },
  ];

  return (
    <PublicPageLayout
      title="Exam Timetable"
      subtitle="Check examination dates and plan your preparation in advance.">
      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          borderRadius: 3,
          border: "1px solid #e2e8f0",
        }}>
        {/* Table Header */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr 2fr 1fr",
            },
            gap: 2,
            p: 2.5,
            backgroundColor: "#f1f5f9",
            borderBottom: "1px solid #e2e8f0",
          }}>
          <Typography sx={{fontWeight: 800}}>Date</Typography>

          <Typography
            sx={{
              fontWeight: 800,
              display: {
                xs: "none",
                md: "block",
              },
            }}>
            Day
          </Typography>

          <Typography
            sx={{
              fontWeight: 800,
              display: {
                xs: "none",
                md: "block",
              },
            }}>
            Examination
          </Typography>

          <Typography
            sx={{
              fontWeight: 800,
              display: {
                xs: "none",
                md: "block",
              },
            }}>
            Standard
          </Typography>
        </Box>

        {/* Table Rows */}

        {timetable.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr 2fr 1fr",
              },
              gap: {
                xs: 1,
                md: 2,
              },
              p: 2.5,
              borderBottom:
                index !== timetable.length - 1 ? "1px solid #e2e8f0" : "none",
            }}>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#0f172a",
                }}>
                {item.date}
              </Typography>

              <Typography
                sx={{
                  display: {
                    xs: "block",
                    md: "none",
                  },
                  color: "#64748b",
                  fontSize: 14,
                  mt: 0.5,
                }}>
                {item.subject}
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "#64748b",
                display: {
                  xs: "none",
                  md: "block",
                },
              }}>
              {item.day}
            </Typography>

            <Typography
              sx={{
                color: "#334155",
                display: {
                  xs: "none",
                  md: "block",
                },
              }}>
              {item.subject}
            </Typography>

            <Box>
              <Chip
                label={item.standard}
                size="small"
                icon={<CalendarMonthIcon />}
                sx={{
                  backgroundColor: "#eaf4ff",
                  color: "#1976d2",
                  fontWeight: 700,
                }}
              />
            </Box>
          </Box>
        ))}
      </Paper>

      <Box
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          backgroundColor: "#eff6ff",
          border: "1px solid #dbeafe",
        }}>
        <Typography
          sx={{
            fontWeight: 800,
            color: "#0f172a",
            mb: 0.8,
          }}>
          Timetable Updates
        </Typography>

        <Typography
          sx={{
            color: "#64748b",
            lineHeight: 1.7,
          }}>
          Examination dates and timings will be updated when the official
          examination schedule is available.
        </Typography>
      </Box>
    </PublicPageLayout>
  );
};

export default ExamTimetable;
