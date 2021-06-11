import { Request, Response } from "express";
import { ILanguage } from "./../@types/language";
import Language from "../models/language";

export const getTodos = async (_: Request, res: Response): Promise<void> => {
  try {
    const language: ILanguage[] = await Language.find();
    if (language) {
      res.status(200).json({ language });
    } else {
      res.status(200).json({
        file: "javascript",
        description: "#comment",
      });
    }
  } catch (error) {
    throw error;
  }
};

export const addTodos = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as Pick<ILanguage, "file" | "description">;
  try {
    const language: ILanguage[] = await Language.find();
    if (!language) {
      const language: ILanguage = new Language({
        file: body.file,
        description: body.description,
      });

      const newLanguage: ILanguage = await language.save();

      res.status(201).json({ message: "File Added", language: newLanguage });
    } else {
      const updatedLanguage: ILanguage | null =
        await Language.findByIdAndUpdate({ _id: language[0]._id }, body);
      res
        .status(201)
        .json({ message: "File Updated", language: updatedLanguage });
    }
  } catch (error) {
    throw error;
  }
};
