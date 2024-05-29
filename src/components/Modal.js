import React from "react";

const Modal = ({ show, handleClose, handleSelect }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Refresh Required</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>
        <p className="mb-4">Do you want to enforce protection?</p>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">
            Refreshing might cause some websites to remove active sessions.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={() => handleSelect("current")}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Refresh Active Tab
          </button>
          <span className="text-gray-500">Or</span>
          <button
            onClick={() => handleSelect("all")}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Refresh All Tabs
          </button>
          <button
            onClick={() => handleSelect("skip")}
            className="text-red-500 py-2 px-4 rounded hover:underline w-full"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
