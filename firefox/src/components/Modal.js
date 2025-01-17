import React from "react";

const Modal = ({ show, handleClose, handleSelect, gpcEnabled }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 relative">
        <div className="flex bg-[#F8FAFB] rounded-t-lg px-5 py-6 justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Browser Refresh Required</h2>
          <button onClick={handleClose} className="text-gray-400 text-2xl">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L18 18"
                stroke="#93A2A9"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 6L6.00004 18"
                stroke="#93A2A9"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="px-6 pb-2.5">
          <p className="text-base font-semibold text-[#1B1D1E] mb-4">
            To update your protection status, your browser must be refreshed
          </p>
          <div className="flex items-start gap-2 bg-[#FEF4DC] rounded text-[#CC7A00] p-4 mb-4">
            <svg
              width="27"
              height="27"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="10"
                cy="10"
                r="7.25"
                stroke="#CC7A00"
                stroke-width="1.5"
              />
              <path
                d="M10 8.5V14"
                stroke="#CC7A00"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M10.75 5.75C10.75 6.16421 10.4142 6.5 10 6.5C9.58579 6.5 9.25 6.16421 9.25 5.75C9.25 5.33579 9.58579 5 10 5C10.4142 5 10.75 5.33579 10.75 5.75Z"
                fill="#CC7A00"
              />
            </svg>

            <p className="text-sm font-semibold">
              Make sure to save your changes in any open tabs before refreshing.
            </p>
          </div>
          <div className="bg-[#F8FAFB] shadow-[0_0px_-4px_4px_rgba(0,0,0,0.7)] px-4 py-5 flex flex-col items-center space-y-4">
            <button
              onClick={() => handleSelect("current")}
              className="bg-blue-500 text-white text-[13px] font-semibold py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Refresh Active Tab Only
            </button>
            <div class="inline-flex items-center justify-center w-full">
              <hr class="w-64 h-px bg-gray-200 border-0" />
              <span class="absolute px-3 font-semibold text-[#93A2A9] text-sm -translate-x-1/2 bg-white left-1/2">
                Or
              </span>
            </div>
            <button
              onClick={() => handleSelect("all")}
              className="bg-blue-500 text-white text-[13px] font-semibold py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Refresh All Tabs
            </button>
            <button
              onClick={() => handleSelect("skip")}
              className="text-[#F36879] text-sm font-semibold px-4 rounded hover:underline w-full"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
