import React, { useEffect, useState } from 'react';

const ServerLoading = ({ isLoading }) => {
  const [showWakeUp, setShowWakeUp] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // After 3 seconds, show "waking up" message (indicates cold start)
      const timer = setTimeout(() => {
        setShowWakeUp(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowWakeUp(false);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-950 bg-opacity-90 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Loading bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 rounded-full animate-loading-bar"></div>
        </div>

        {/* Loading text */}
        <p className="text-white text-lg">
          {showWakeUp ? (
            <>
              <span className="text-cyan-400">Server is waking up...</span>
              <br />
              <span className="text-sm text-gray-400">This may take up to 30 seconds</span>
            </>
          ) : (
            'Loading...'
          )}
        </p>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ServerLoading;
