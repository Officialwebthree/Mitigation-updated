import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  bgColor = 'bg-gray-800' 
}) => {
  return (
    <div className={`${bgColor} rounded-xl p-5 shadow-lg transition-transform hover:scale-[1.02]`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 font-medium text-sm mb-1">{title}</h3>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-gray-700/50">
          {icon}
        </div>
      </div>
      
      {change && (
        <div className="mt-4 flex items-center">
          {change.isPositive ? (
            <>
              <ArrowUp size={16} className="text-green-400 mr-1" />
              <span className="text-sm text-green-400">{change.value}% increase</span>
            </>
          ) : (
            <>
              <ArrowDown size={16} className="text-red-400 mr-1" />
              <span className="text-sm text-red-400">{change.value}% decrease</span>
            </>
          )}
          <span className="text-xs text-gray-400 ml-1">since yesterday</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;