import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-lg text-gray-600">Loading Pendle Markets...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;