import {Box, Container, Typography} from "@mui/material";
import type {ReactNode} from "react";

import PublicHeader from "../../components/public/PublicHeader";
import PublicFooter from "../../components/public/PublicFooter";

interface PublicPageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const PublicPageLayout = ({
  children,
  title,
  subtitle,
}: PublicPageLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        display: "flex",
        flexDirection: "column",
      }}>
      {/* ================= SHARED HEADER ================= */}

      <PublicHeader />

      {/* ================= PAGE HEADER ================= */}

      <Box
        sx={{
          background: "linear-gradient(135deg, #eaf4ff 0%, #ffffff 100%)",
          py: {
            xs: 6,
            md: 8,
          },
        }}>
        <Container maxWidth="lg">
          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
              fontWeight: 800,
              color: "#0f172a",
              mb: 1.5,
            }}>
            {title}
          </Typography>

          {subtitle && (
            <Typography
              sx={{
                maxWidth: 750,
                color: "#64748b",
                lineHeight: 1.8,
                fontSize: {
                  xs: "1rem",
                  md: "1.1rem",
                },
              }}>
              {subtitle}
            </Typography>
          )}
        </Container>
      </Box>

      {/* ================= PAGE CONTENT ================= */}

      <Box
        component="main"
        sx={{
          py: {
            xs: 5,
            md: 8,
          },
          flex: 1,
        }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>

      {/* ================= SHARED FOOTER ================= */}

      <PublicFooter />
    </Box>
  );
};

export default PublicPageLayout;
