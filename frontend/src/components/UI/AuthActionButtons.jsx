import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@components';
import { CgLogIn, TiUserAddOutline, IoMdLogOut, FaRegUserCircle } from "@icons";
import { clearCredentials } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/usersApiSlice';

const auth = [
  {
    id: '3',
    name: 'Login',
    link: '/login',
    icon: <CgLogIn className='inline-block' />,
    className: 'bg-white text-purple-500 border-2 border-purple-500 hover:bg-gray-100'
  },
  {
    id: '4',
    name: 'Register',
    link: '/register',
    icon: <TiUserAddOutline className='inline-block' />,
    className: 'bg-gray-800 text-white border-2 border-black hover:bg-purple-500 hover:border-purple-500'
  }
];

export const AuthActionButtons = ({ className }) => {

  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate('/login');
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <div id='Auth_Action_Buttons' className={`flex items-center gap-3 ${className}`}>
      {userInfo ?
        <>
          <Button onClick={logoutHandler} className='gap-2 bg-red-500 text-white border-2 border-red-500 hover:bg-red-600'>
            <IoMdLogOut className='inline-block' /> <span>Logout</span>
          </Button>
          <Link to='/profile'>
            <Button className='gap-2 border-2 border-black bg-black text-white'>
              <FaRegUserCircle /> <span>Profile</span>
            </Button>
          </Link>
        </>
        : auth.map((item) => (
          <Link key={item.id} to={item.link}>
            <Button className={`gap-2 rounded-md ${item.className}`}>
              {item.icon} <span>{item.name}</span>
            </Button>
          </Link>
        ))}
    </div>
  )
}