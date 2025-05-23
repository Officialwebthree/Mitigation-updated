import React from 'react';

interface AttackPoint {
  type: 'phishing' | 'credential_theft' | 'data_theft' | 'command_control';
  position: { top: string; left: string };
  color: string;
}

const ThreatMap: React.FC = () => {
  const attackTypes = {
    phishing: { color: 'rgb(239, 68, 68)', label: 'Phishing Attacks' },
    credential_theft: { color: 'rgb(234, 179, 8)', label: 'Credential Theft' },
    data_theft: { color: 'rgb(59, 130, 246)', label: 'Data Theft' },
    command_control: { color: 'rgb(168, 85, 247)', label: 'Command & Control' },
  };

  const attackPoints: AttackPoint[] = [
    { type: 'phishing', position: { top: '30%', left: '20%' }, color: attackTypes.phishing.color },
    { type: 'credential_theft', position: { top: '40%', left: '70%' }, color: attackTypes.credential_theft.color },
    { type: 'data_theft', position: { top: '60%', left: '50%' }, color: attackTypes.data_theft.color },
    { type: 'command_control', position: { top: '25%', left: '80%' }, color: attackTypes.command_control.color },
    { type: 'phishing', position: { top: '70%', left: '30%' }, color: attackTypes.phishing.color },
  ];

  return (
    <div className="h-[400px] bg-gray-800 rounded-xl p-4 relative overflow-hidden">
      <h3 className="text-lg font-semibold mb-4">Global Threat Map</h3>
      
      {/* World map background */}
      <div className="absolute inset-0 opacity-20 flex items-center justify-center">
        <div className="w-[90%] h-[70%] border-2 border-gray-600 rounded-full"></div>
      </div>
      
      {/* Attack points */}
      {attackPoints.map((point, index) => (
        <div
          key={index}
          className="absolute h-2 w-2 rounded-full animate-ping"
          style={{
            top: point.position.top,
            left: point.position.left,
            backgroundColor: point.color,
          }}
        ></div>
      ))}
      
      {/* Attack lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {attackPoints.map((point, index) => (
          <line
            key={index}
            x1={point.position.left}
            y1={point.position.top}
            x2="50%"
            y2="50%"
            stroke={point.color}
            strokeOpacity="0.5"
            strokeWidth="1"
          >
            <animate
              attributeName="stroke-opacity"
              values="0;0.5;0"
              dur={`${2 + index}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </svg>
      
      {/* Target point */}
      <div className="absolute h-4 w-4 bg-blue-500 rounded-full" style={{ top: 'calc(50% - 8px)', left: 'calc(50% - 8px)' }}></div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-gray-900/80 p-2 rounded-md text-xs space-y-1">
        {Object.entries(attackTypes).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <div
              className="h-2 w-2 rounded-full mr-2"
              style={{ backgroundColor: value.color }}
            ></div>
            <span>{value.label}</span>
          </div>
        ))}
        <div className="flex items-center">
          <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
          <span>Your Infrastructure</span>
        </div>
      </div>
      
      {/* Stats */}
      <div className="absolute top-4 right-4 bg-gray-900/80 p-2 rounded-md text-xs">
        <div className="mb-1">Active Attacks: <span className="text-red-400 font-bold">17</span></div>
        <div className="mb-1">Countries: <span className="text-white font-bold">9</span></div>
        <div>Blocked: <span className="text-green-400 font-bold">93%</span></div>
      </div>
    </div>
  );
};

export default ThreatMap;