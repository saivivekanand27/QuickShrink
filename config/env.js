import { z } from "zod";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
dotenv.config();


// FIX __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const env = z
  .object({
    PORT: z.coerce.number().default(3002),
    MONGODB_URI: z.string(),
    MONGODB_DATABASE_NAME: z.string(),
  })
  .parse(process.env);
