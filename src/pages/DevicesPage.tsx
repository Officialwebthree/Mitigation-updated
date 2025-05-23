import React, { useState } from 'react';
import DeviceSecurityStatus from '../components/Dashboard/DeviceSecurityStatus';
import StatCard from '../components/Dashboard/StatCard';
import { Shield, AlertTriangle, CheckCircle, WifiOff, Plus, Trash2 } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  lastSeen: string;
}

interface DeviceType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const DevicesPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'Smart Camera #1', type: 'Camera', status: 'active', lastSeen: 'Now' },
    { id: '2', name: 'Office Thermostat', type: 'Climate Control', status: 'active', lastSeen: '2 mins ago' },
    { id: '3', name: 'Gateway Router', type: 'Network', status: 'active', lastSeen: 'Now' },
  ]);

  const deviceTypes: DeviceType[] = [
    { id: 'camera', name: 'Security Camera', description: 'IP-based security cameras', icon: '📹' },
    { id: 'thermostat', name: 'Smart Thermostat', description: 'Temperature control systems', icon: '🌡️' },
    { id: 'lock', name: 'Smart Lock', description: 'Electronic door locks', icon: '🔒' },
    { id: 'sensor', name: 'Motion Sensor', description: 'Movement detection devices', icon: '📡' },
    { id: 'router', name: 'Network Router', description: 'Network gateway devices', icon: '🌐' },
  ];

  const addDevice = (type: string) => {
    const newDevice: Device = {
      id: Date.now().toString(),
      name: `New ${type}`,
      type,
      status: 'active',
      lastSeen: 'Just added',
    };
    setDevices([...devices, newDevice]);
    setShowAddModal(false);
  };

  const removeDevice = (id: string) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-1">IoT Devices</h1>
          <p className="text-gray-400">Monitor and manage your connected devices</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-white transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Add Device
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Devices" 
          value={devices.length} 
          icon={<Shield size={24} className="text-blue-400" />}
          bgColor="bg-gray-800 border-l-4 border-blue-500"
        />
        <StatCard 
          title="Vulnerable" 
          value="3" 
          icon={<AlertTriangle size={24} className="text-yellow-400" />}
          bgColor="bg-gray-800 border-l-4 border-yellow-500"
        />
        <StatCard 
          title="Secured" 
          value={devices.filter(d => d.status === 'active').length} 
          icon={<CheckCircle size={24} className="text-green-400" />}
          bgColor="bg-gray-800 border-l-4 border-green-500"
        />
        <StatCard 
          title="Offline" 
          value={devices.filter(d => d.status === 'inactive').length} 
          icon={<WifiOff size={24} className="text-gray-400" />}
          bgColor="bg-gray-800 border-l-4 border-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Active Devices</h3>
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium">{device.name}</div>
                    <div className="text-sm text-gray-400">{device.type}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">{device.lastSeen}</span>
                    <button
                      onClick={() => removeDevice(device.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Device Categories</h3>
          <div className="space-y-4">
            {deviceTypes.map((type) => (
              <div key={type.id} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <div className="font-medium">{type.name}</div>
                    <div className="text-sm text-gray-400">{type.description}</div>
                  </div>
                </div>
                <span className="font-semibold">
                  {devices.filter(d => d.type === type.name).length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Add New Device</h3>
            <div className="grid gap-4">
              {deviceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => addDevice(type.name)}
                  className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl">{type.icon}</span>
                  <div className="text-left">
                    <div className="font-medium">{type.name}</div>
                    <div className="text-sm text-gray-400">{type.description}</div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAddModal(false)}
              className="mt-4 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevicesPage;