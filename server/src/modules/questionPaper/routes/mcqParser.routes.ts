import express from "express";
import multer from "multer";

import {parseMcqPdf} from "../controllers/mcqParser.controller";

const router = express.Router();

const upload = multer({
  dest: "uploads/temp/",
});

router.post(
  "/parse",
  upload.single("pdf"),
  parseMcqPdf,
);

export default router;