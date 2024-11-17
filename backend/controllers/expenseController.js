import Expense from "../models/expenseModel.js";

// @description    Create new expense 
// @route          POST: /api/expenses
// @access         Private
const createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, transactionFlow } = req.body;

    if (!title || !amount || !category || !transactionFlow) {
      res.status(400);
      throw new Error("Please provide all the required fields");
    }

    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
      transactionFlow
    });

    if (expense) {
      res.status(201).json(expense);
    } else {
      res.status(400);
      throw new Error("Invalid expense data");
    }
  } catch (error) {
    next(error);
  }
};

// @description    Get all expenses
// @route          GET: /api/expenses
// @access         Private
const getExpenses = async (req, res, next) => {
  try {

    const expenses =
      await Expense
        .find({ user: req.user._id })//only get expenses of the logged in user
        .sort({ createdAt: -1 });//latest expenses will be shown first

    if (!expenses) {
      res.status(404);
      throw new Error("No expenses found");
    }

    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

//@description    Get single expense
// @route          GET: /api/expenses/:id
// @access         Private
const getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id // Ensures expense belongs to user
    });

    if (!expense) {
      res.status(404);
      throw new Error("Expense not found");
    }

    res.status(200).json(expense);

  } catch (error) {
    next(error);
  }
};


//@description    Update single expense
// @route          PUT: /api/expenses/:id
// @access         Private
const updateExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (expense) {

      expense.title = req.body.title || expense.title;
      expense.amount = req.body.amount || expense.amount;
      expense.category = req.body.category || expense.category;
      expense.transactionFlow = req.body.transactionFlow || expense.transactionFlow;

      //save the updated expense
      const updatedExpense = await expense.save();

      //send a response with the updated expense details
      res.status(200).json({
        _id: updatedExpense._id,
        title: updatedExpense.title,
        amount: updatedExpense.amount,
        category: updatedExpense.category,
        transactionFlow: updatedExpense.transactionFlow,
      });
    } else {
      res.status(404);
      throw new Error("Expense not found");
    }
  } catch (error) {
    next(error);
  }
}

//@description    Delete single expense
// @route          DELETE: /api/expenses/:id
// @access         Private
const deleteExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (expense) {
      await expense.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Expense removed" });
    } else {
      res.status(404);
      throw new Error("Expense not found");
    }
  } catch (error) {
    next(error);
  }
}

//@description    Get filtered expenses
// @route          GET: /api/expenses/filter
// @access         Private
const getFilteredExpenses = async (req, res, next) => {
  try {
    const { transactionFlow, category } = req.query;

    const filter = { user: req.user._id };

    if (transactionFlow) {
      filter.transactionFlow = transactionFlow;
    }

    if (category) {
      filter.category = category;
    }

    const expenses = await Expense.find(filter).sort({ createdAt: -1 });

    if (expenses.length === 0) {
      res.status(404);
      throw new Error("No expenses found");
    }

    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

export {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById,
  getFilteredExpenses
};