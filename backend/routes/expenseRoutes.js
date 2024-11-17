import express from 'express';
const router = express.Router();

import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById,
  getFilteredExpenses
} from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
  .post(protect, createExpense)
  .get(protect, getExpenses)

router.route('/filter')
  .get(protect, getFilteredExpenses)

router.route('/:id')
  .get(protect, getExpenseById)
  .put(protect, updateExpenseById)
  .delete(protect, deleteExpenseById)



export default router;