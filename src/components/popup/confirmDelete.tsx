import React from 'react';

interface ConfirmDeleteProps {
  onClose: () => void;
  onDelete: () => void;
  entityName: string; 
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ onClose, onDelete, entityName }) => {
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 shadow-md"
      onClick={handleBackgroundClick}
    >
      <div className="bg-[#222222] w-[30%] rounded-lg p-5 border border-slate-400">
        <div className="md:flex items-center gap-5">
          <div className="rounded-full border border-gray-300 flex items-center justify-center w-14 h-14">
            <i className="bx bx-error text-2xl text-yellow-500">&#9888;</i>
          </div>
          <div className="text-center md:text-left">
            <p className="font-bold text-[1.2rem]">Warning!</p>
            <p className="text-sm text-gray-100 mt-1">
              Are you sure you want to delete the selected {entityName}(s)?
            </p>
          </div>
        </div>
        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
          <button
            id="confirm-delete-btn"
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 text-black rounded-lg font-semibold text-sm md:ml-2 md:order-2 hover:bg-darkPink"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            id="confirm-cancel-btn"
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
