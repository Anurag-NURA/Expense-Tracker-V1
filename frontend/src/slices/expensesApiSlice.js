import { apiSlice } from "./apiSlice";

const EXPENSES_URL = "/api/expenses";

export const expensesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllExpenses: builder.query({
      query: () => ({
        url: EXPENSES_URL,
        method: "GET",
      }),
      providesTags: ["Expenses"],
      keepUnusedDataFor: 5,
    }),
    addExpense: builder.mutation({
      query: (data) => ({
        url: EXPENSES_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Expenses"],
    }),
    updateExpense: builder.mutation({
      query: (data) => ({
        url: `${EXPENSES_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Expenses"],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `${EXPENSES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenses"],
    }),
  })

})

export const {
  useGetAllExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApiSlice;