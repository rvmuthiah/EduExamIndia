import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PublicPageLayout from "./PublicPageLayout";

const FAQ = () => {
  const faqs = [
    {
      question: "What is RankOne?",
      answer:
        "RankOne is an online examination platform designed to help students prepare, practice and evaluate their knowledge through online examinations.",
    },
    {
      question: "Which students can use RankOne?",
      answer: "RankOne is designed for students from 6th to 12th standard.",
    },
    {
      question: "Can students take examinations online?",
      answer:
        "Yes. Students can access available examinations through their student account and complete them online.",
    },
    {
      question: "Can I view my examination results?",
      answer:
        "Yes. After completing an examination, students can view their examination results through the platform.",
    },
    {
      question: "Can students access examinations from anywhere?",
      answer:
        "RankOne is designed to provide students with an online examination experience that can be accessed from anywhere with a suitable internet connection.",
    },
    {
      question: "How do I start an examination?",
      answer:
        "Students can log in using their student account and access the examinations available to them.",
    },
  ];

  return (
    <PublicPageLayout
      title="Frequently Asked Questions"
      subtitle="Find answers to common questions about the RankOne online examination platform.">
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
        }}>
        {faqs.map((faq, index) => (
          <Accordion
            key={faq.question}
            elevation={0}
            sx={{
              mb: 2,
              border: "1px solid #e2e8f0",
              borderRadius: 3,
              "&:before": {
                display: "none",
              },
              "&.Mui-expanded": {
                margin: "0 0 16px 0",
              },
            }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{color: "#1976d2"}} />}
              sx={{
                px: 3,
                py: 1,
              }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "#0f172a",
                }}>
                {index + 1}. {faq.question}
              </Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                px: 3,
                pb: 3,
              }}>
              <Typography
                sx={{
                  color: "#64748b",
                  lineHeight: 1.8,
                }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </PublicPageLayout>
  );
};

export default FAQ;
