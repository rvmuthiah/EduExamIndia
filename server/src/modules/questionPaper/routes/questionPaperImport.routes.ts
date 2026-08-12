import {Router} from "express";

import {
  createImport,
  getAllImports,
  getImportById,
  updateImport,
  deleteImport,
} from "../controllers/questionPaperImport.controller";

const router = Router();

router.post("/", createImport);

router.get("/", getAllImports);

router.get("/:id", getImportById);

router.put("/:id", updateImport);

router.delete("/:id", deleteImport);

export default router;