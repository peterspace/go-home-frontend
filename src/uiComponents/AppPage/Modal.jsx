import React from 'react';

export default function Modal({
  visible,
  children,
}) {
  if (!visible) return null;

  return (
    <div
      id="parent"
      className="fixed inset-0 backdrop-filter backdrop-blur-md bg-black bg-opacity-60
                flex justify-center items-center overflow-auto z-[1]"
    >
       <div>{children}</div>
    </div>
  );
}
