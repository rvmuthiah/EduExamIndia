import {Router} from "express";

import {
  login,
  studentLogin,
} from "../controllers/auth.controller";

const router = Router();


// Admin Login
router.post(
  "/login",
  login,
);


// Student Login
router.post(
  "/student-login",
  studentLogin,
);


export default router;