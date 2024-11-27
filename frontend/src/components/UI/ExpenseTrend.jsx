import React, { useMemo } from 'react';

export const ExpenseComparison = ({ expenses, timeType }) => {

  const calculatePeriodData = (expenses, period = 'day') => {
    const now = new Date();

    const filterExpensesByPeriod = (expense) => {
      const expenseDate = new Date(expense.date);
      switch (period) {
        case 'day':
          return expenseDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return expenseDate >= weekAgo && expenseDate <= now;
        case 'month':
          return expenseDate.getMonth() === now.getMonth() &&
            expenseDate.getFullYear() === now.getFullYear();
        default:
          return false;
      }
    };

    const periodExpenses = expenses.filter(filterExpensesByPeriod);

    const totalAmount = periodExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const transactionTypes = periodExpenses.reduce((acc, expense) => {
      acc[expense.transactionFlow] = (acc[expense.transactionFlow] || 0) + expense.amount;
      return acc;
    }, {});

    return {
      total: totalAmount,
      transactionTypes
    };
  };

  const comparisonData = useMemo(() => {
    if (!expenses) return null;

    return {
      day: calculatePeriodData(expenses, 'day'),
      week: calculatePeriodData(expenses, 'week'),
      month: calculatePeriodData(expenses, 'month')
    };
  }, [expenses]);

  // Added explicit return with rendered content
  return (
    <div>
      <h2>Expense Comparison</h2>
      {comparisonData ? (
        <>
          <div>
            <h3>Daily Expenses</h3>
            <p>Total: <span>{'\u20B9'}</span>{comparisonData.day.total.toFixed(2)}</p>
            {Object.entries(comparisonData.day.transactionTypes).map(([type, amount]) => (
              <p key={type}>{type}: <span>{'\u20B9'}</span>{amount.toFixed(2)}</p>
            ))}
          </div>
          <div>
            <h3>Weekly Expenses</h3>
            <p>Total: <span>{'\u20B9'}</span>{comparisonData.week.total.toFixed(2)}</p>
            {Object.entries(comparisonData.week.transactionTypes).map(([type, amount]) => (
              <p key={type}>{type}: <span>{'\u20B9'}</span>{amount.toFixed(2)}</p>
            ))}
          </div>
          <div>
            <h3>Monthly Expenses</h3>
            <p>Total: <span>{'\u20B9'}</span>{comparisonData.month.total.toFixed(2)}</p>
            {Object.entries(comparisonData.month.transactionTypes).map(([type, amount]) => (
              <p key={type}>{type}: <span>{'\u20B9'}</span>{amount.toFixed(2)}</p>
            ))}
          </div>
        </>
      ) : (
        <p>Loading expenses...</p>
      )}
    </div>
  );
};