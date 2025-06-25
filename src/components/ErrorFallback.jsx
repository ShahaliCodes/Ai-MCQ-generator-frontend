import React from 'react';

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-4 max-w-3xl mx-auto text-center">
      <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
      <pre className="text-sm text-gray-600 mb-4">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
