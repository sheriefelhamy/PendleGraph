import React from 'react';

const Footer = () => {
    return (
        <div className="mt-8 text-center text-sm text-gray-500">
            <p>Data refreshes every 15 minutes • Last updated: {new Date().toLocaleString()}</p>
        </div>
    );
};

export default Footer;