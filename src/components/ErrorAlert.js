// components/ErrorAlert.js
import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ error }) => {
    if (!error) return null;

    return (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="text-orange-800 text-sm">Failed to fetch markets: HTTP 400</span>
            </div>
        </div>
    );
};

export default ErrorAlert;