import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetAllExpensesQuery } from '../slices/expensesApiSlice.js';
import { IoWalletOutline, LuUtensils, LuCar, LuShoppingCart, LuShoppingBag, RiBillLine, LuSmartphone, GrMultiple } from '@icons';
import { DoughnutChart } from '@components';


export const ReportPage = () => {

  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);

  const { data: allExpenses, isLoading } = useGetAllExpensesQuery();

  const totalExpense = allExpenses && allExpenses
    .filter((expense) => expense.transactionFlow === 'Expense')
    .reduce((total, expense) => total + expense.amount, 0);

  const totalIncome = allExpenses && allExpenses
    .filter((expense) => expense.transactionFlow === 'Income')
    .reduce((accumulator, expense) => accumulator + expense.amount, 0);

  const calculateCategoryTotal = (category) => {
    if (!allExpenses) {
      return 0;
    }
    return allExpenses.filter(expense => expense.category === category)
      .reduce((acc, expense) => acc + expense.amount, 0);
  };

  function calculatePercentage(sectionTotal, totalExpense) {
    if (totalExpense === 0) {
      return "Total expense cannot be zero.";
    }
    const percentage = (sectionTotal / totalExpense) * 100;
    return percentage.toFixed(2) + "%";
  }

  const category = [
    { id: 1, name: 'Food', icon: <LuUtensils />, color: 'bg-green-500', totalExpense: calculateCategoryTotal('Food') },
    { id: 2, name: 'Transport', icon: <LuCar />, color: 'bg-purple-500', totalExpense: calculateCategoryTotal('Transport') },
    { id: 3, name: 'Groceries', icon: <LuShoppingCart />, color: 'bg-blue-500', totalExpense: calculateCategoryTotal('Groceries') },
    { id: 4, name: 'Shopping', icon: <LuShoppingBag />, color: 'bg-yellow-500', totalExpense: calculateCategoryTotal('Shopping') },
    { id: 5, name: 'Bills', icon: <RiBillLine />, color: 'bg-red-500', totalExpense: calculateCategoryTotal('Bills') },
    { id: 6, name: 'Entertainment', icon: <LuSmartphone />, color: 'bg-pink-500', totalExpense: calculateCategoryTotal('Entertainment') },
    { id: 7, name: 'Others', icon: <GrMultiple />, color: 'bg-gray-500', totalExpense: calculateCategoryTotal('Others') }
  ]

  return (
    <section className='mt-20 min-h-[70vh] max-w-full p-10 flex flex-col bg-gray-50'>
      {isLoading && <>...Loading</>}
      <div className="flex flex-col custom_lg:flex-row items-center justify-center gap-4">
        <div className='flex flex-col gap-4'>
          {/* Total Expenses Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg w-[25rem]">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <IoWalletOutline className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Expenses</dt>
                    <dd className="text-3xl font-semibold text-gray-900">
                      <span>{'\u20B9'}</span>{totalExpense}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">View all</a>
              </div>
            </div>
          </div>

          {/* Total Income */}
          <div className="bg-white overflow-hidden shadow rounded-lg w-[25rem]">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <IoWalletOutline className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Expenses</dt>
                    <dd className="text-3xl font-semibold text-gray-900">
                      <span>{'\u20B9'}</span>{totalIncome}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">View all</a>
              </div>
            </div>
          </div></div>

        {/* Doughnut Chart from chart.js */}
        <div className='h-[20rem]'>
          <DoughnutChart
            data={category.map((category) => category.totalExpense)}
            labels={category.map((category) => category.name)}
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Expenses by Category</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {category.map((category) => (
              <li key={category.id}>
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full ${category.color} flex items-center justify-center text-white`}>
                        {category.icon}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-sm text-gray-500">
                          {calculatePercentage(category.totalExpense, totalExpense)}% of total expenses
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                      <p className="text-lg font-medium text-gray-900">
                        {calculateCategoryTotal(category.name)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}