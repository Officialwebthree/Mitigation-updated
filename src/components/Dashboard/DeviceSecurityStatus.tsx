import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'secure' | 'vulnerable' | 'compromised';
  lastUpdated: string;
}

const DeviceSecurityStatus: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'Smart Camera #1', type: 'Camera', status: 'secure', lastUpdated: '2 mins ago' },
    { id: '2', name: 'Office Thermostat', type: 'Climate Control', status: 'vulnerable', lastUpdated: '15 mins ago' },
    { id: '3', name: 'Gateway Router', type: 'Network', status: 'secure', lastUpdated: '5 mins ago' },
    { id: '4', name: 'Smart Lock Front', type: 'Security', status: 'secure', lastUpdated: '7 mins ago' },
    { id: '5', name: 'Meeting Room Tablet', type: 'Tablet', status: 'compromised', lastUpdated: '1 min ago' },
  ]);

  useEffect(() => {
    const simulateDeviceChanges = () => {
      setDevices(prevDevices => 
        prevDevices.map(device => {
          // Randomly change device status
          if (Math.random() < 0.3) {
            const statuses: ('secure' | 'vulnerable' | 'compromised')[] = ['secure', 'vulnerable', 'compromised'];
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
            return {
              ...device,
              status: newStatus,
              lastUpdated: 'Just now'
            };
          }
          return device;
        })
      );
    };

    const interval = setInterval(simulateDeviceChanges, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'secure':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'vulnerable':
        return <AlertTriangle size={18} className="text-yellow-500" />;
      case 'compromised':
        return <XCircle size={18} className="text-red-500" />;
      default:
        return <AlertTriangle size={18} className="text-gray-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'secure':
        return 'text-green-500 bg-green-500/10';
      case 'vulnerable':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'compromised':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">IoT Device Security</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          View All
        </button>
      </div>
      
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pb-3 text-left text-xs font-medium text-gray-400 uppercase">Device</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-400 uppercase">Type</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="pb-3 text-left text-xs font-medium text-gray-400 uppercase">Updated</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="py-3 text-sm">{device.name}</td>
                <td className="py-3 text-sm text-gray-300">{device.type}</td>
                <td className="py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(device.status)}`}>
                    {getStatusIcon(device.status)}
                    <span className="ml-1 capitalize">{device.status}</span>
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-400">{device.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceSecurityStatus;