import { useReducer, useEffect } from "react";
import { CiEdit } from "@icons";
import { Button, Modal } from "@components";
import { toast } from "react-toastify";
import { useUpdateExpenseMutation } from "../../slices/expensesApiSlice";

const initialState = {
  id: '',
  title: '',
  amount: 0,
  transactionFlow: 'Income',
  category: 'Food'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'id':
      return { ...state, id: action.payload };
    case 'title':
      return { ...state, title: action.payload };
    case 'amount':
      return { ...state, amount: action.payload };
    case 'transactionFlow':
      return { ...state, transactionFlow: action.payload };
    case 'category':
      return { ...state, category: action.payload };
    case 'reset':
      return initialState;
    case 'initialize':
      return { ...action.payload };
    default:
      return state;
  }
};

export const UpdateExpense = ({ expenseData, closeModal }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [updateExpense, { isLoading }] = useUpdateExpenseMutation();

  // Initialize form data only once when component mounts
  useEffect(() => {
    dispatch({
      type: 'initialize',
      payload: {
        id: expenseData._id,
        title: expenseData.title,
        amount: expenseData.amount,
        transactionFlow: expenseData.transactionFlow,
        category: expenseData.category
      }
    });
  }, [expenseData]); // Empty dependency array means it only runs once

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!state.title || !state.amount) {
      toast.error('Title and Amount are required');
      return;
    }

    try {
      const data = { ...state };
      // Send the state data as the second argument (the update data)
      await updateExpense(data).unwrap();

      toast.success('Expense updated successfully');
      dispatch({ type: 'reset' });
      closeModal();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };



  return (
    <Modal closeModal={closeModal}>
      <form >
        <div className="flex flex-col">
          <h2 className="mb-5 text-4xl font-bold text-purple-500 flex flex-col md:flex-row items-center justify-center md:justify-start gap-2">
            <CiEdit />
            <span>Update Transaction</span>
          </h2>
        </div>
        <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={state.title}
              onChange={(e) => dispatch({ type: 'title', payload: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={state.amount}
              onChange={(e) => dispatch({ type: 'amount', payload: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="transactionFlow" className="block text-sm font-medium">Transaction Flow</label>
            <select
              id="transactionFlow"
              name="transactionFlow"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={state.transactionFlow}
              onChange={(e) => dispatch({ type: 'transactionFlow', payload: e.target.value })}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium">Category</label>
            <select
              id="category"
              name="category"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={state.category}
              onChange={(e) => dispatch({ type: 'category', payload: e.target.value })}
            >
              <option value="Income">Income</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Groceries</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Payment">Payment</option>
              <option value="Health">Health</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <Button
            type="submit"
            onClick={formSubmissionHandler}
            className="w-full col-span-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};