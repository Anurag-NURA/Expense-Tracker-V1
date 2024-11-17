import { Link } from "react-router-dom";

import { IoWalletOutline } from "@icons";

export function Logo({ className }) {
  return (
    <Link to="/" className={`group text-2xl flex justify-center items-center font-semibold ${className}`}>
      {/* Icon for logo */}
      <IoWalletOutline className='mr-2 text-purple-500' />

      {/* Span for underline animation on hover */}
      <span className="bg-left-bottom bg-gradient-to-r from-purple-500 to-indigo-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
        <p className='whitespace-nowrap'>Expense Tracker</p>
      </span>
    </Link>
  )
}
