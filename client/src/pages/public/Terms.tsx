import {Box, Card, CardContent, Typography} from "@mui/material";

import GavelIcon from "@mui/icons-material/Gavel";

import PublicPageLayout from "./PublicPageLayout";

const Terms = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing or using the RankOne online examination platform, users agree to follow these terms and use the platform responsibly.",
    },
    {
      title: "Student Accounts",
      content:
        "Students are responsible for providing accurate information and keeping their account information secure. Accounts should only be used by the authorized student.",
    },
    {
      title: "Use of the Platform",
      content:
        "The platform should be used for legitimate educational and examination purposes. Users should not attempt to interfere with, misuse or disrupt the platform.",
    },
    {
      title: "Examinations",
      content:
        "Students are expected to follow the instructions provided for each examination and complete examinations honestly and responsibly.",
    },
    {
      title: "Results and Performance",
      content:
        "Examination results and performance information are provided through the platform based on the examination and evaluation process.",
    },
    {
      title: "Changes to the Service",
      content:
        "RankOne may update, improve or modify platform features and services from time to time.",
    },
    {
      title: "Changes to These Terms",
      content:
        "These terms may be updated when necessary. Continued use of the platform after changes may indicate acceptance of the updated terms.",
    },
  ];

  return (
    <PublicPageLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using the RankOne online examination platform.">
      <Card
        elevation={0}
        sx={{
          border: "1px solid #e2e8f0",
          borderRadius: 3,
        }}>
        <CardContent sx={{p: {xs: 3, md: 5}}}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 4,
            }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: 3,
                backgroundColor: "#eaf4ff",
                color: "#1976d2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <GavelIcon sx={{fontSize: 32}} />
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#0f172a",
              }}>
              Platform Terms
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}>
            {sections.map(section => (
              <Box key={section.title}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: "#0f172a",
                    mb: 1,
                  }}>
                  {section.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#64748b",
                    lineHeight: 1.8,
                  }}>
                  {section.content}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </PublicPageLayout>
  );
};

export default Terms;
