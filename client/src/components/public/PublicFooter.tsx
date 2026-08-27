import {Box, Container, Divider, Stack, Typography} from "@mui/material";

const PublicFooter = () => (
  <Box component="footer" sx={{bgcolor: "#0F172A", color: "#CBD5E1", mt: 8}}>
    <Container maxWidth="lg" sx={{py: 5}}>
      <Stack spacing={2}>
        <Typography variant="h6" sx={{color: "#fff", fontWeight: 800}}>
          EduExamIndia
        </Typography>
        <Typography variant="body2" sx={{maxWidth: 620, lineHeight: 1.8}}>
          A student-focused online examination platform designed to make practice,
          assessment and academic preparation simple and accessible.
        </Typography>
        <Divider sx={{borderColor: "rgba(255,255,255,0.12)"}} />
        <Typography variant="body2" sx={{color: "#94A3B8"}}>
          © {new Date().getFullYear()} EduExamIndia. All rights reserved.
        </Typography>
      </Stack>
    </Container>
  </Box>
);

export default PublicFooter;
