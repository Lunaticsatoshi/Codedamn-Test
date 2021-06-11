import { model, Schema } from "mongoose";
import { ILanguage } from "../@types/language";

const languageSchema: Schema = new Schema(
  {
    file: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ILanguage>("Todo", languageSchema);
