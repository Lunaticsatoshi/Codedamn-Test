import { Request, Response } from "express";
import { ILanguage } from "./../@types/language";
import Todo from "../models/language";

export const getTodos = async (_: Request, res: Response): Promise<void> => {
  try {
    const todos: ILanguage[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

export const addTodos = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as Pick<ILanguage, "file" | "description">;
  try {
    const language: ILanguage = new Todo({
      file: body.file,
      description: body.description,
    });

    const newLanguage: ILanguage = await language.save();

    res.status(201).json({ message: "File Added", language: newLanguage });
  } catch (error) {
    throw error;
  }
};
