import express, { Application, json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./config/db";

const app: Application = express();

config();

app.use(cors());

app.use(json());

// app.use(todoRoutes);

connectDB();

const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
