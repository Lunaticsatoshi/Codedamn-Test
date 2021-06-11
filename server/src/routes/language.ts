import { Router } from "express";
import { getLanguages, addLanguages } from "../controllers/language";

const router: Router = Router();

router.get("/api/v1/langages", getLanguages);

router.post("/api/v1/addLanguages", addLanguages);

export default router;
