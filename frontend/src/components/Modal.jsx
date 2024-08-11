import React from "react";

const Modal = ({ isVisible, onClose, errormsg }) => {
  if (!isVisible) {
    return null;
  }

  const handleClose = (e) => {
    if (e.target.id === "closeit") onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm z-50"
      id="closeit"
      onClick={handleClose}
    >
      <div className="flex flex-col items-center justify-center gap-4 w-[350px] h-[150px] bg-white rounded-md p-2 space-y-2 border-[2px] border-black z-50">
        <div className="text-xl font-semibold underline decoration-red-600 underline-offset-4">
          {errormsg}
        </div>
        <button
          className="bg-red-500 hover:bg-white border-2 border-black hover:ring-2 hover:border-none ring-red-600 px-4 hover:text-red-600 font-medium rounded-[5px]"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
