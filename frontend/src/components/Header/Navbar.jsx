import { NavLink } from "react-router-dom";

const links = [
  {
    id: '1',
    name: 'Home',
    link: '/'
  },
  {
    id: '2',
    name: 'Expenses',
    link: '/expenses'
  }
]

export const Navbar = (props) => {
  const { className } = props;
  return (
    <nav
      id='Navigation_links'
      className={`flex justify-center items-center font-semibold text-gray-700 ${className}`}
    >
      {
        links.map(link => (
          <NavLink
            key={link.id}
            to={link.link}
            className='text-lg hover:scale-110 transition duration-200 hover:text-indigo-600'
          >
            {link.name}
          </NavLink>
        ))
      }
    </nav >
  )
}
