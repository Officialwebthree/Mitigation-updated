import React from 'react';

const SecurityMetricsChart: React.FC = () => {
  // Mock data - in a real app this would come from an API
  const monthlyData = [
    { month: 'Jan', attacks: 45, blocked: 43 },
    { month: 'Feb', attacks: 52, blocked: 48 },
    { month: 'Mar', attacks: 38, blocked: 35 },
    { month: 'Apr', attacks: 65, blocked: 62 },
    { month: 'May', attacks: 48, blocked: 45 },
    { month: 'Jun', attacks: 55, blocked: 53 },
  ];

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.attacks, d.blocked)));
  const chartHeight = 200;

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <h3 className="text-lg font-semibold mb-6">Security Metrics Over Time</h3>
      
      <div className="relative h-[200px]">
        {/* Y-axis labels */}
        <div className="absolute left-0 h-full flex flex-col justify-between text-xs text-gray-400">
          {[...Array(6)].map((_, i) => (
            <span key={i}>{Math.round((maxValue * (5 - i)) / 5)}</span>
          ))}
        </div>
        
        {/* Chart grid */}
        <div className="absolute left-8 right-0 h-full flex flex-col justify-between">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-t border-gray-700 w-full h-0"></div>
          ))}
        </div>
        
        {/* Bars */}
        <div className="absolute left-8 right-0 h-full flex justify-between items-end px-4">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex flex-col items-center gap-1 w-8">
              <div className="relative w-full">
                {/* Attacks bar */}
                <div 
                  className="w-full bg-red-500/50 rounded-sm"
                  style={{ 
                    height: `${(data.attacks / maxValue) * chartHeight}px`,
                  }}
                >
                  <div className="w-full h-full opacity-30 bg-gradient-to-t from-white/0 to-white/20 rounded-sm"></div>
                </div>
                {/* Blocked bar */}
                <div 
                  className="absolute bottom-0 w-full bg-green-500/50 rounded-sm"
                  style={{ 
                    height: `${(data.blocked / maxValue) * chartHeight}px`,
                  }}
                >
                  <div className="w-full h-full opacity-30 bg-gradient-to-t from-white/0 to-white/20 rounded-sm"></div>
                </div>
              </div>
              <span className="text-xs text-gray-400">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500/50 rounded-sm"></div>
          <span className="text-sm">Total Attacks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500/50 rounded-sm"></div>
          <span className="text-sm">Blocked</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityMetricsChart;