import React from 'react';

interface LoadingModalProps {
  isLoading: boolean;
}

export function LoadingModal({ isLoading }: LoadingModalProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 rounded-2xl">
      <div className="fixed inset-0 bg-black opacity-75"></div>
      <div className="bg-white rounded-lg shadow-lg p-8 z-50 flex flex-col items-center">
        <img src="/Spinner.svg" alt="Loading" className="mb-4 w-16 h-16" />
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    </div>
  );
}
