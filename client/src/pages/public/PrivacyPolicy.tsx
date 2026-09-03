import {Box, Card, CardContent, Typography} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";

import PublicPageLayout from "./PublicPageLayout";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content:
        "RankOne may collect information required to provide the online examination experience, including information provided by students when creating or using an account.",
    },
    {
      title: "How We Use Information",
      content:
        "Information may be used to provide examination services, manage student accounts, maintain examination records and improve the overall platform experience.",
    },
    {
      title: "Examination Information",
      content:
        "Information related to examinations and student performance may be stored as part of providing examination and result-related functionality.",
    },
    {
      title: "Data Security",
      content:
        "We take reasonable measures to protect information handled through the platform and help maintain a secure online examination environment.",
    },
    {
      title: "Third-Party Services",
      content:
        "The platform may use third-party services where required to provide hosting, technical infrastructure or other supporting functionality.",
    },
    {
      title: "Changes to This Policy",
      content:
        "This privacy policy may be updated from time to time to reflect changes to the platform, services or applicable requirements.",
    },
  ];

  return (
    <PublicPageLayout
      title="Privacy Policy"
      subtitle="Learn how information may be handled when using the RankOne online examination platform.">
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
              <SecurityIcon sx={{fontSize: 32}} />
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#0f172a",
              }}>
              Your Privacy Matters
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

export default PrivacyPolicy;
