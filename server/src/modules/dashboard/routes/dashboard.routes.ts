import { Router } from "express";

import {
  adminDashboard,
  studentDashboard,
} from "../controllers/dashboard.controller";

import { authenticate } from "../../../middleware/auth.middleware";
import { authorize } from "../../../middleware/role.middleware";

const router = Router();

// Admin Dashboard
// router.get(
//   "/admin",
//   authenticate,
//   adminDashboard
// );
router.get(
  "/admin",
  authenticate,
  authorize("Admin"),
  adminDashboard
);


// Student Dashboard
// router.get(
//   "/student/:studentId",
//   authenticate,
//   studentDashboard
// );
router.get(
  "/student/:studentId",
  authenticate,
  authorize("Student"),
  studentDashboard
);



export default router;