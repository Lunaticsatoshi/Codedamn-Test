import { connect } from "mongoose";
import { config } from "dotenv";

config({ path: "src/.env" });

const mongoURI: string = process.env.MONGOURI!;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

export const connectDB = async () => {
  try {
    await connect(mongoURI, options);
    console.log("Connected to MongoDb!");
  } catch (error) {
    throw error;
  }
};
