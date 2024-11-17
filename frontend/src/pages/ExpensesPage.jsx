import { useReducer, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import { useGetAllExpensesQuery } from "../slices/expensesApiSlice.js";
import { Table, Spinner, AddExpense, UpdateExpense, DeleteExpense, Card } from "@components";
import { IoMdCash, CiCircleChevUp, CiCircleChevDown } from "@icons";

const initialState = {
  addExpenseModal: false,
  updateExpenseModal: {
    open: false,
    data: null
  },
  deleteExpenseModal: {
    open: false,
    id: null
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, addExpenseModal: action.payload };
    case 'UPDATE':
      return { ...state, updateExpenseModal: action.payload };
    case 'DELETE':
      return { ...state, deleteExpenseModal: action.payload };
    default:
      return state;
  }
};

export const ExpensesPage = () => {

  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

  }, [userInfo]);

  const { data: allExpenses, isLoading } = useGetAllExpensesQuery();

  const [state, dispatch] = useReducer(reducer, initialState);

  const totalIncome = allExpenses && allExpenses
    .filter((expense) => expense.transactionFlow === 'Income')
    .reduce((total, expense) => total + expense.amount, 0);

  const totalExpense = allExpenses && allExpenses
    .filter((expense) => expense.transactionFlow === 'Expense')
    .reduce((total, expense) => total + expense.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <section className='mt-20 min-h-[69vh] max-w-full p-10 flex flex-col custom_lg:grid grid-cols-3 grid-rows-3 justify-center items-center gap-10 overflow-x-hidden'>

      <div id="expenses_table" className="max-h-100 w-full col-span-2 row-span-3 overflow-x-auto">
        {isLoading && <Spinner />}
        {allExpenses &&
          <Table
            data={allExpenses}
            add={() => dispatch({ type: 'ADD', payload: true })}
            update={(data) => dispatch({ type: 'UPDATE', payload: { open: true, data: data } })}
            remove={(id) => dispatch({ type: 'DELETE', payload: { open: true, id: id } })}
          />
        }

        {state.addExpenseModal && <AddExpense closeModal={() => dispatch({ type: 'ADD', payload: false })} />}
        {state.updateExpenseModal.open && <UpdateExpense expenseData={state.updateExpenseModal.data} closeModal={() => dispatch({ type: 'UPDATE', payload: { open: false } })} />}
        {state.deleteExpenseModal.open && <DeleteExpense expenseId={state.deleteExpenseModal.id} closeModal={() => dispatch({ type: 'DELETE', payload: { open: false } })} />}
      </div>

      <Card
        heading='Income'
        balance={totalIncome}
        icon={<CiCircleChevUp />}
        className='col-span-1 h-4/5 w-full'
      />
      <Card
        heading='Expenses'
        balance={totalExpense}
        icon={<CiCircleChevDown />}
        className='col-span-1 h-4/5 w-full'
      />
      <Card
        heading='Balance'
        balance={totalBalance}
        icon={<IoMdCash />}
        className='col-span-1 h-4/5 w-full'
      />
    </section>
  )
};
