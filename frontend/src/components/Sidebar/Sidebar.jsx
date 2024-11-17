import ReactDOM from "react-dom";

import { Navbar, AuthActionButtons } from '@components';

const BackDrop = (props) => {
  return (<div
    onClick={props.onClose}
    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50" />
  );
}

const SidebarOverlay = () => {
  return (
    <div className="fixed top-0 right-0 w-1/2 h-full bg-purple-100 flex flex-col items-center justify-center z-50 shadow-lg">
      <div className="h-1/2 w-4/5 flex flex-col items-center justify-start gap-4">
        <Navbar className="w-1/2 flex flex-col gap-4 " />
        <AuthActionButtons className='w-1/2 flex flex-col gap-4' />
      </div>
    </div>
  )
}

export const Sidebar = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onClose={props.closeSidebar} />, document.getElementById('overlays'))}
      {ReactDOM.createPortal(<SidebarOverlay />, document.getElementById('overlays'))}
    </>
  )
}
