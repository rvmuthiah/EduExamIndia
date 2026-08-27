import {useState} from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {Link as RouterLink} from "react-router-dom";

const PublicHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255,255,255,0.96)",
        color: "#0F172A",
        borderBottom: "1px solid #E2E8F0",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{minHeight: {xs: 64, md: 72}}}>
          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            sx={{
              textDecoration: "none",
              color: "#0F172A",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              mr: 4,
            }}
          >
            EduExam<span style={{color: "#1976D2"}}>India</span>
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{display: {xs: "none", md: "flex"}, alignItems: "center"}}
          >
            <Button href="#home" sx={{color: "#475569", fontWeight: 600}}>Home</Button>
            <Button href="#why-us" sx={{color: "#475569", fontWeight: 600}}>Why RankOne</Button>
            <Button href="#how-it-works" sx={{color: "#475569", fontWeight: 600}}>How It Works</Button>
          </Stack>

          <Box sx={{flexGrow: 1}} />

          <Stack
            direction="row"
            spacing={1}
            sx={{display: {xs: "none", md: "flex"}, alignItems: "center"}}
          >
            <Button component={RouterLink} to="/student/login" sx={{fontWeight: 700}}>
              Student Login
            </Button>
            <Button
              component={RouterLink}
              to="/admin/login"
              variant="contained"
              sx={{
                borderRadius: 2,
                px: 2.2,
                fontWeight: 700,
                boxShadow: "none",
                "&:hover": {boxShadow: "none"},
              }}
            >
              Admin Login
            </Button>
          </Stack>

          <IconButton
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
            sx={{display: {xs: "inline-flex", md: "none"}, ml: 1}}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={closeMobileMenu}
        PaperProps={{sx: {width: "min(86vw, 340px)"}}}
      >
        <Box sx={{p: 2}}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography fontWeight={800}>EduExamIndia</Typography>
            <IconButton aria-label="Close navigation menu" onClick={closeMobileMenu}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>
        <List>
          {[
            ["Home", "#home"],
            ["Why RankOne", "#why-us"],
            ["How It Works", "#how-it-works"],
          ].map(([label, href]) => (
            <ListItem key={href} disablePadding>
              <ListItemButton component="a" href={href} onClick={closeMobileMenu}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{px: 2, pt: 2}}>
            <Button
              fullWidth
              component={RouterLink}
              to="/student/login"
              onClick={closeMobileMenu}
              variant="outlined"
            >
              Student Login
            </Button>
          </ListItem>
          <ListItem sx={{px: 2}}>
            <Button
              fullWidth
              component={RouterLink}
              to="/admin/login"
              onClick={closeMobileMenu}
              variant="contained"
            >
              Admin Login
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default PublicHeader;
