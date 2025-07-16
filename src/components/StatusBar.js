// components/StatusBar.js
import React from 'react';
import { RefreshCw } from 'lucide-react';

const StatusBar = ({ error, loading, onRefresh }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                        {error ? 'API Issues - Using Fallback Data' : 'API Connected'}
                    </span>
                    <span className="text-xs text-gray-500">
                        Last updated: {new Date().toLocaleTimeString()}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Chain: Base</span>
                    <button
                        onClick={onRefresh}
                        disabled={loading}
                        className="p-1 text-gray-500 hover:text-gray-700"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusBar;