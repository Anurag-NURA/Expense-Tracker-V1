import { useReducer } from "react";

import { IoMdAddCircleOutline } from "@icons";
import { Button, Modal } from "@components";
import { toast } from "react-toastify";
import { useAddExpenseMutation } from "../../slices/expensesApiSlice";

const initialState = {
  title: '',
  amount: '',
  transactionFlow: 'income',
  category: 'food'
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload };
    case 'amount':
      return { ...state, amount: action.payload };
    case 'transactionFlow':
      return { ...state, transactionFlow: action.payload };
    case 'category':
      return { ...state, category: action.payload };
    default:
      return state;
  }
}

export const AddExpense = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const [addExpense, { isLoading }] = useAddExpenseMutation();

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    if (!state.title || !state.amount) {
      toast.error('Title and Amount are required');
      return;
    }
    try {
      await addExpense(state).unwrap();
      toast.success('Expense added successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Modal closeModal={props.closeModal}>
      <form action="">
        <div className="flex flex-col">
          <h2 className="mb-5 text-4xl font-bold text-purple-500 flex flex-col md:flex-row  items-center justify-center md:justify-start gap-2">
            <IoMdAddCircleOutline />
            <span className="text-center">Add Expense</span>
          </h2>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium ">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              onChange={(e) => dispatch({ type: 'title', payload: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium ">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              onChange={(e) => dispatch({ type: 'amount', payload: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="transactionFlow" className="block text-sm font-medium">Transaction Flow</label>
            <select
              id="transactionFlow"
              name="transactionFlow"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
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
            onClick={formSubmissionHandler}
            className="w-full col-span-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            {isLoading ? 'Adding...' : 'Add Expense'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
