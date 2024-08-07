import dotenv from "dotenv";
import path from "path";
dotenv.config()

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const { MONGO_URI, PORT, JWT_SECRET } = process.env;
