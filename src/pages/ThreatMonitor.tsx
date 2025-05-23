import React from 'react';
import ThreatMap from '../components/Dashboard/ThreatMap';
import RecentAlerts from '../components/Dashboard/RecentAlerts';
import AttackTypeChart from '../components/Dashboard/AttackTypeChart';

const ThreatMonitor: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Threat Monitor</h1>
        <p className="text-gray-400">Real-time threat detection and analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ThreatMap />
        </div>
        <div>
          <AttackTypeChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAlerts />
        <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Threat Intelligence Feed</h3>
          <div className="space-y-4">
            {/* Add threat intelligence content here */}
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <div className="text-sm text-gray-300 mb-1">2 minutes ago</div>
              <p className="font-medium">New phishing campaign detected targeting financial institutions</p>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <div className="text-sm text-gray-300 mb-1">15 minutes ago</div>
              <p className="font-medium">Updated IoT vulnerability database with 3 new CVEs</p>
            </div>
            <div className="p-3 bg-gray-700/50 rounded-lg">
              <div className="text-sm text-gray-300 mb-1">1 hour ago</div>
              <p className="font-medium">Botnet activity detected in Asia-Pacific region</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMonitor;