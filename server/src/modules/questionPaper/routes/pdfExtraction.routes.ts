import express from "express";
import multer from "multer";

import {extractPdfController} from "../controllers/pdfExtraction.controller";

const router = express.Router();

const upload = multer({
  dest: "uploads/temp/",
});

router.post(
  "/extract",
  upload.single("pdf"),
  extractPdfController,
);

export default router;