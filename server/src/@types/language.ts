import { Document } from "mongoose";

export interface ILanguage extends Document {
  file: string;
  description: string;
}
