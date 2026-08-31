import {Router} from "express";

import {
  registerStudent,
  loginStudent,
  getStudents,
  getStudent,
  editStudent,
  removeStudent,
  leaderboard,
} from "../controllers/student.controller";

import {authenticate} from "../../../middleware/auth.middleware";

const router = Router();

// =====================================================
// STUDENT AUTHENTICATION
// =====================================================

// Student Login
// Public route
router.post("/login", loginStudent);

// Student Registration
// Public route
router.post("/register", registerStudent);

// =====================================================
// STUDENT MANAGEMENT
// =====================================================

// Get All Students
// Admin authentication required
router.get("/", authenticate, getStudents);

// =====================================================
// STUDENT LEADERBOARD
// =====================================================

// IMPORTANT:
// This route MUST come BEFORE /:id
router.get(
  "/leaderboard",
  authenticate,
  leaderboard
);

// =====================================================
// GET STUDENT BY ID
// =====================================================

// Authentication required
router.get(
  "/:id",
  authenticate,
  getStudent
);

// =====================================================
// UPDATE STUDENT
// =====================================================

router.put(
  "/:id",
  authenticate,
  editStudent
);

// =====================================================
// DELETE STUDENT
// =====================================================

router.delete(
  "/:id",
  authenticate,
  removeStudent
);

export default router;