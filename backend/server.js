import path from "path";
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

app.use(cookieParser());
app.use(express.json());//use to parse json data
app.use(express.urlencoded({ extended: true }));//use to parse form data

app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")
    ));
} else {
  //it means we are in development mode
  app.get("/", (req, res) => {
    res.send("Server is ready");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
