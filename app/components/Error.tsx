import React from 'react';

interface ErrorModalProps {
  showError: boolean;
  onClose: () => void;
  errorMessage: string;
}

export function ErrorModal({ showError, onClose, errorMessage }: ErrorModalProps) {
  if (!showError) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-8 z-50">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="mb-4">{errorMessage}</p>
        <button
          className="bg-red-500 text-white rounded-lg px-4 py-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
