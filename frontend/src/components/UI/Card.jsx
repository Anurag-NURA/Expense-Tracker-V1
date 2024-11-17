export const Card = ({ heading, balance, icon, className }) => {

  let textColor = 'text-black';
  if (heading === 'Expenses') {
    textColor = 'text-red-500'
  }
  if (heading === 'Income') {
    textColor = 'text-green-500'
  }

  return (
    <div className={`flex items-center justify-between bg-white p-5 rounded-lg shadow-md ${className} hover:cursor-pointer hover:scale-110 transition-all ease-in-out duration-200`}>
      <div className="flex items-center gap-5">
        <div className={`p-2 rounded-full bg-purple-100 ${textColor} text-3xl`}>{icon}</div>
        <div>
          <h2 className="text-2xl font-bold">{heading}</h2>
        </div>
      </div>
      <h2 className={`text-2xl font-bold ${textColor}`}> <span>{'\u20B9'}</span>{balance}</h2>
    </div>
  )
}
