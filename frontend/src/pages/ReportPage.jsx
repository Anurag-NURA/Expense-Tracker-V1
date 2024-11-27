import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetAllExpensesQuery } from '../slices/expensesApiSlice.js';
import { IoWalletOutline, LuUtensils, LuCar, LuShoppingCart, LuShoppingBag, RiBillLine, LuSmartphone, GrMultiple } from '@icons';

const category = [
  { id: 1, name: 'Food', icon: <LuUtensils />, color: 'bg-green-500' },
  { id: 2, name: 'Transport', icon: <LuCar />, color: 'bg-purple-500' },
  { id: 3, name: 'Groceries', icon: <LuShoppingCart />, color: 'bg-blue-500' },
  { id: 4, name: 'Shopping', icon: <LuShoppingBag />, color: 'bg-yellow-500' },
  { id: 5, name: 'Bills', icon: <RiBillLine />, color: 'bg-red-500' },
  { id: 6, name: 'Entertainment', icon: <LuSmartphone />, color: 'bg-pink-500' },
  { id: 7, name: 'Others', icon: <GrMultiple />, color: 'bg-gray-500' }
]

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

  return (
    <section className='mt-20 min-h-[70vh] max-w-full p-10 flex flex-col bg-gray-50'>
      {isLoading && <>...Loading</>}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Expenses Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <IoWalletOutline className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Expenses</dt>
                  <dd className="text-3xl font-semibold text-gray-900">${totalExpense}</dd>
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

        {/* Expense Trend Card */}
        {/* <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <BarChart className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Expense Trend</dt>
                  <dd className="text-3xl font-semibold text-gray-900">-12%</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-green-600 hover:text-green-500">
                Compared to last {timeRange.toLowerCase()}
              </a>
            </div>
          </div>
        </div> */}
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
                        <p className="text-sm text-gray-500">{calculatePercentage(calculateCategoryTotal(category.name), totalExpense)}% of total expenses</p>
                      </div>
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                      <p className="text-lg font-medium text-gray-900">{calculateCategoryTotal(category.name)}</p>
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
