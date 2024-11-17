import { useState } from 'react';

import { Button, Navbar, Sidebar, Logo, AuthActionButtons } from '@components';
import { GoSidebarExpand } from "@icons";

export const Header = () => {

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <header className='h-20 fixed z-40 px-10 top-0 w-full flex justify-around items-center bg-white border-b-2'>

      {/* Logo with Navlinks */}
      <div className='flex justify-start items-center h-10 w-1/2'>
        <Logo />
        <Navbar className="hidden custom_md:flex ml-5 gap-4" />
      </div>

      {/* Login and Logout Buttons */}
      <div className='w-1/2 custom_md:flex hidden justify-end'>
        <AuthActionButtons />
      </div>

      <div className='w-1/2 custom_md:hidden flex justify-end'>
        {showSidebar === true ?
          <Sidebar closeSidebar={() => setShowSidebar(false)} /> :
          <Button className="custom_md:hidden p-0 bg-purple-500 text-white" onClick={() => setShowSidebar(true)} >
            <GoSidebarExpand className='text-2xl' />
          </Button>}
      </div>

    </header >
  );
};