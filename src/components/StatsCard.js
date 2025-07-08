import React from 'react';

const StatsCard = ({ title, value, icon: Icon, iconColor }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`p-3 rounded-full ${iconColor}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
};

export default StatsCard;