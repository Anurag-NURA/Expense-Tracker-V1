import { LuBarChart3, IoMdAddCircleOutline, MdDeleteOutline } from '@icons';
import { Button } from '@components';

export const Table = ({ data, add, update, remove }) => {

  return (
    <div className="overflow-x-auto sm:rounded-lg border-2 border-purple-400">

      <div className='w-full text-xl bg-purple-50 px-4 py-3 font-semibold flex justify-between items-center'>
        <div>
          <LuBarChart3 className='w-6 h-6 inline-block mr-2' />
          <span>Recent Expenses</span>
        </div>
        <div>
          <Button onClick={add} className='bg-black text-sm font-normal text-white hover:bg-gray-600 flex items-center gap-2'>
            <IoMdAddCircleOutline />
            <span>Add New Transaction</span>
          </Button>
        </div>
      </div>

      <table className="w-full table-auto text-sm text-left  text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-purple-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction Flow
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((expense) => (
            <tr className="bg-white border-b hover:bg-gray-50 " key={expense._id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {expense.title}
              </th>
              <td className={`px-6 py-4 ex ${expense.transactionFlow === 'Income' ? 'text-green-400' : 'text-red-500'}`}>
                <span>{'\u20B9'}</span>
                {expense.amount}
              </td>
              <td className={`px-6 py-4 ${expense.transactionFlow === 'Income' ? 'text-green-400' : 'text-red-500'}`}>
                {expense.transactionFlow}
              </td>
              <td className="px-6 py-4">
                {expense.category}
              </td>
              <td className="px-6 py-4 text-right">
                <button onClick={() => update(expense)} className="font-medium text-purple-600  hover:underline">Edit</button>
              </td>
              <td className="px-6 py-4 text-right">
                <button onClick={() => remove(expense._id)} className="font-normal text-lg text-red-600  hover:underline hover:bg-gray-100 p-1 rounded-full"><MdDeleteOutline /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}
