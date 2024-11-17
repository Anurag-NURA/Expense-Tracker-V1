export const Button = (props) => {
  const { disabled, onClick, children, className } = props;
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-md flex justify-center items-center font-bold py-2 px-5 transition-all ease-in-out duration-100 ${className} ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  )
}