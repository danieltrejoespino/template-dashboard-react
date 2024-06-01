import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
        <p className="mb-4">This is a modal example using Tailwind CSS and Tailwind UI.</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;