import React from "react";

const Modal = ({ isVisible, onClose, errormsg }) => {
   // If the modal is not visible, return null (do not render anything)
 if (!isVisible) {
    return null;
  }
   // Handle the closing of the modal
  const handleClose = (e) => {
     // Close the modal only if the click is on the background (not on the content)
    if (e.target.id === "closeit") onClose();
  };

  return (
    
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm z-50"
      id="closeit"
      onClick={handleClose}
    >
       {/* Modal content */}
      <div className="flex flex-col items-center justify-center gap-4 w-[350px] h-[150px] bg-white rounded-md p-2 space-y-2 border-[2px] border-black z-50">
      {/* Display the error message */}
 <div className="text-xl font-semibold underline decoration-red-600 underline-offset-4">
          {errormsg}
        </div>
        <button
          className="bg-red-500 hover:bg-white border-2 border-black hover:ring-2 hover:border-none ring-red-600 px-4 hover:text-red-600 font-medium rounded-[5px]"
          onClick={onClose}// Close the modal when the button is clicked
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
