import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.ORIGIN_URI, // Specify the frontend URL here
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));

app.options("*", cors());

app.use(cookieParser());
app.use(express.json()); //use to parse json data
app.use(express.urlencoded({ extended: true })); //use to parse form data

app.use("/api/all", (req, res) =>
  res.status(200).json({ message: "API is working", cors: "enabled" }),
);

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
