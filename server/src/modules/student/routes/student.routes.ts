import { Router } from "express";
import { authenticate } from "../../../middleware/auth.middleware";

import {
  registerStudent,
  loginStudent,
  getStudents,
  getStudent,
  editStudent,
  removeStudent,
} from "../controllers/student.controller";

const router = Router();

// Student Login
router.post("/login", loginStudent);

// Create Student
router.post("/", authenticate, registerStudent);

// Get All Students
router.get("/", authenticate, getStudents);

// Get Student By ID
router.get("/:id", authenticate, getStudent);

// Update Student
router.put("/:id", authenticate, editStudent);

// Delete Student
router.delete("/:id", authenticate, removeStudent);

export default router;