import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionFlow: {
    type: String,
    required: true,
    enum: ["Income", "Expense"],
  },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Transport", "Groceries", "Shopping", "Bills", "Entertainment", "Payment", "Health", "Others"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;