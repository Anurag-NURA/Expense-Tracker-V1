import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header, Footer } from '@components';

export const App = () => {
  return (
    <div className="relative min-h-max w-full flex flex-col overflow-x-hidden">
      <Header />
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  )
}
