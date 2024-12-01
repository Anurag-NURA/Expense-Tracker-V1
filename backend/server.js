import cors from "cors";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

//Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//setup for cors
app.use(
  cors({
    origin: "https://expense-tracker-v1-sand.vercel.app",
    credentials: true,
  }),
);
app.options("*", cors());

app.use(cookieParser());
app.use(express.json()); //use to parse json data
app.use(express.urlencoded({ extended: true })); //use to parse form data

app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
