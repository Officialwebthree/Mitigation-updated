import React from 'react';

interface AttackData {
  type: string;
  count: number;
  color: string;
}

const AttackTypeChart: React.FC = () => {
  // Mock data - in a real app this would come from an API
  const attackData: AttackData[] = [
    { type: 'Phishing', count: 45, color: 'bg-red-500' },
    { type: 'Credential Theft', count: 30, color: 'bg-orange-500' },
    { type: 'Data Exfiltration', count: 15, color: 'bg-yellow-500' },
    { type: 'Command & Control', count: 8, color: 'bg-blue-500' },
    { type: 'Other', count: 2, color: 'bg-gray-500' },
  ];
  
  const total = attackData.reduce((sum, item) => sum + item.count, 0);
  
  // Calculate percentages and widths for the bars
  const chartData = attackData.map((item) => ({
    ...item,
    percentage: Math.round((item.count / total) * 100),
  }));

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Attack Types</h3>
      
      <div className="space-y-4">
        {chartData.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{item.type}</span>
              <span className="text-sm text-gray-400">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${item.color}`} 
                style={{ width: `${item.percentage}%` }}
              >
                <div className="w-full h-full opacity-30 bg-gradient-to-r from-white/0 to-white/40 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Attacks</span>
          <span className="font-semibold">{total}</span>
        </div>
      </div>
    </div>
  );
};

export default AttackTypeChart;