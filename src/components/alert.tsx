import React, { useEffect, useState } from 'react';

type AlertProps = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // Duration in milliseconds
};

export default function Alert({ message, type = 'info', duration = 5000 }: AlertProps) {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => prev - (100 / (duration / 100)));
    }, 100);

    const hideAlert = setTimeout(() => {
      clearInterval(timer);
      setIsVisible(false);
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(hideAlert);
    };
  }, [duration]);

  if (!isVisible) return null;

  const baseStyle = 'fixed top-0 left-0 right-0 p-4 rounded-lg text-sm font-medium shadow-md z-50 mx-auto max-w-xl';

  // Updated color palette to match the landing page
  const typeStyles = {
    success: 'bg-gray-800 text-green-300 border border-green-700',  // Subtle green on a dark gray background
    error: 'bg-gray-800 text-red-300 border border-red-700',        // Subtle red on a dark gray background
    info: 'bg-gray-800 text-blue-300 border border-blue-700',       // Subtle blue on a dark gray background
    warning: 'bg-gray-800 text-yellow-300 border border-yellow-700', // Subtle yellow on a dark gray background
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type]}`}>
      <div className="flex items-center">
        <svg
          className="w-6 h-6 mr-3 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {type === 'success' && (
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.29l-4.29-4.29 1.41-1.41L11 13.17l5.88-5.88 1.41 1.41L11 16.29z" />
          )}
          {type === 'error' && (
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 13H11v-2h2v2zm0-4H11V7h2v4z" />
          )}
          {type === 'info' && (
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v-2h-2v2zm0-4h2V7h-2v4z" />
          )}
          {type === 'warning' && (
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 13H11v-2h2v2zm0-4H11V7h2v4z" />
          )}
        </svg>
        <span>{message}</span>
      </div>
      <div className="w-full bg-gray-700 rounded mt-2">
        <div
          className="h-1 bg-neutral-400 rounded"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        ></div>
      </div>
    </div>
  );
}
