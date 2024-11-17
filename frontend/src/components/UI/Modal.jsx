import React from 'react';
import ReactDOM from 'react-dom';

const BackDrop = (props) => {
  return (
    <div
      className='fixed top-0 left-0 w-full h-screen bg-indigo-700 bg-opacity-50 z-40'
      onClick={props.onClose}
    />
  )
}

const ModalOverlays = (props) => {
  return (
    <div className='fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto bg-white p-4 rounded-lg shadow-lg z-50 transition-all ease-in-out duration-300'>
      <div className=''>{props.children}</div>
    </div>
  )
}

export const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onClose={props.closeModal} />, document.getElementById('overlays'))}
      {ReactDOM.createPortal(<ModalOverlays>{props.children}</ModalOverlays>, document.getElementById('overlays'))}
    </>
  )
}
