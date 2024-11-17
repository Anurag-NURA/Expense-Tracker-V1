import { toast } from "react-toastify";

import { useDeleteExpenseMutation } from "../../slices/expensesApiSlice";
import { MdDeleteOutline } from "@icons";
import { Button, Modal } from "@components";

export const DeleteExpense = ({ expenseId, closeModal }) => {

  const [deleteExpense, { isLoading }] = useDeleteExpenseMutation();

  const confirmHandler = async () => {
    try {
      await deleteExpense(expenseId).unwrap();
      toast.success('Expense deleted successfully');
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="flex flex-col">
        <h2 className="mb-5 text-4xl font-bold text-purple-500 flex flex-col md:flex-row items-center justify-center md:justify-start gap-2">
          <MdDeleteOutline />
          <span className="text-center">Delete Expense</span>
        </h2>
        <p className="text-lg text-gray-500">Are you sure you want to delete this expense?</p>

      </div>
      <div className="flex justify-end gap-5 mt-10">
        <Button onClick={closeModal} className='bg-black text-white hover:bg-gray-700'>Cancel</Button>
        <Button onClick={confirmHandler} className='bg-red-600 text-white hover:bg-red-500'>
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Modal>
  )
}
