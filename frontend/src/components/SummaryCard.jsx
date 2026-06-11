import React from 'react';

const SummaryCard = ({ icon, title, value, color }) => {
  return (

      <div className="bg-white flex items-center shadow-sm rounded w-full h-20 overflow-hidden">
        {/* Icon Section */}
        <div
          className={`w-20 h-full flex items-center justify-center ${color}`}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="px-4">
          <h3 className="text-[18px] font-medium text-gray-800">{title}</h3>
          <p className="text-[18px] font-bold">{value}</p>
        </div>
      </div>

  );
};

export default SummaryCard;