import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { uploadPDF } from "../controllers/upload.controller";
import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

router.post(
  "/pdf",
  authenticate,
  upload.single("pdf"),
  uploadPDF
);

export default router;