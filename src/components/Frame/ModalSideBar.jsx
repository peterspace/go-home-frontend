import React from 'react';

export default function ModalSideBar({
  visible,
  children,
}) {
  if (!visible) return null;

  return (
    <div
      id="parent"
      // className="fixed inset-0 backdrop-filter backdrop-blur-md bg-black bg-opacity-60
      //           flex justify-start items-start overflow-auto z-[1]"
      className="fixed inset-0 backdrop-filter backdrop-blur bg-black bg-opacity-20
                flex justify-start items-start overflow-auto z-[1]"
    >
       <div>{children}</div>
    </div>
  );
}
