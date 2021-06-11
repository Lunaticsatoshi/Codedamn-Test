import { Router } from "express";
import { getLanguages, addLanguages } from "../controllers/language";

const router: Router = Router();

router.get("/api/v1/todos", getLanguages);

router.post("/api/v1/addTodo", addLanguages);

export default router;
