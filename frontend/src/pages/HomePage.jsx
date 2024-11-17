import { Link } from 'react-router-dom';

import { LuArrowUpRight, LuBarChart3 } from '@icons';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Manage Your Expenses Easily With{' '}
            <span className="text-purple-500">Expense Tracker</span>
          </h1>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            Take control of your finances with our intuitive expense tracking solution.
            Monitor your spending and make informed financial decisions.
          </p>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-6 py-3 border border-zinc-700 text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Join Today
            </Link>
          </div>
        </div>

        {/* Floating Cards Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="relative">
            {/* Expenses Card */}
            <div className="absolute right-0 top-0 w-72 bg-purple-100 rounded-lg p-6 transform rotate-3">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-zinc-600 text-sm">Total Expenses</p>
                  <h3 className="text-2xl font-bold text-zinc-900">$1,220.00</h3>
                </div>
                <span className="text-red-500 text-sm">-10%</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-zinc-500 text-sm">This month</p>
                <LuBarChart3 className="h-5 w-5 text-zinc-600" />
              </div>
            </div>


          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Analytics Chart */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Analytics</h3>
                <div className="flex gap-4">
                  <span className="text-sm text-zinc-500">Revenue</span>
                  <span className="text-sm text-zinc-500">Expenses</span>
                </div>
              </div>
              <div className="h-48 flex items-end justify-between gap-4">
                {[60, 80, 65, 85].map((height, i) => (
                  <div key={i} className="flex gap-2 items-end h-full">
                    <div
                      className="w-8 bg-indigo-500 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                    <div
                      className="w-8 bg-purple-200 rounded-t"
                      style={{ height: `${height * 0.6}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Card */}
            <div className="bg-coral-500 rounded-lg p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-coral-100">Total Revenue</p>
                  <h3 className="text-2xl font-bold"><span>{'\u20B9'}</span>8,675.00</h3>
                </div>
                <span className="text-coral-100">+24%</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-coral-100">This month</p>
                <LuArrowUpRight className="h-5 w-5 text-coral-100" />
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">Latest Transactions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <LuArrowUpRight className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-white">Income: Salary Oct</p>
                      <p className="text-zinc-400">Successfully</p>
                    </div>
                  </div>
                  <p className="text-emerald-400">+<span>{'\u20B9'}</span>200</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <LuArrowUpRight className="h-4 w-4 text-red-700" />
                    </div>
                    <div>
                      <p className="text-white">Electric Bill</p>
                      <p className="text-zinc-400">Successfully</p>
                    </div>
                  </div>
                  <p className="text-red-400">-<span>{'\u20B9'}</span>480</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};