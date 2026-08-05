import {useEffect, useState} from "react";
import {Grid, Paper, Typography, CircularProgress} from "@mui/material";

import {getAdminDashboard} from "../services/dashboard.service";

interface DashboardData {
  students: number;
  exams: number;
  questions: number;
  questionPapers: number;
  attempts: number;
  results: number;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<DashboardData>({
    students: 0,
    exams: 0,
    questions: 0,
    questionPapers: 0,
    attempts: 0,
    results: 0,
  });


  const loadDashboard = async () => {
    try {
      const response = await getAdminDashboard();

      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      const fetchData = async () => {
        await loadDashboard();
      };

      fetchData();
    }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const cards = [
    {
      title: "Students",
      value: data.students,
    },
    {
      title: "Question Papers",
      value: data.questionPapers,
    },
    {
      title: "Questions",
      value: data.questions,
    },
    {
      title: "Exams",
      value: data.exams,
    },
    {
      title: "Results",
      value: data.results,
    },
    {
      title: "Exam Attempts",
      value: data.attempts,
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom>
        Dashboard
      </Typography>

      <Grid
        container
        spacing={3}>
        {cards.map(card => (
          <Grid
            key={card.title}
            size={{xs: 12, sm: 6, md: 4}}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
              }}>
              <Typography variant="h6">{card.title}</Typography>

              <Typography
                variant="h3"
                color="primary">
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
