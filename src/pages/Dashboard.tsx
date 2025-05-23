import React from 'react';
import { 
  ShieldAlert, 
  UserCheck, 
  Zap, 
  Server
} from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import ThreatMap from '../components/Dashboard/ThreatMap';
import AttackTypeChart from '../components/Dashboard/AttackTypeChart';
import DeviceSecurityStatus from '../components/Dashboard/DeviceSecurityStatus';
import MLModelPerformance from '../components/Dashboard/MLModelPerformance';
import RecentAlerts from '../components/Dashboard/RecentAlerts';
import SecurityMetricsChart from '../components/Dashboard/SecurityMetricsChart';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Security Overview</h1>
        <p className="text-gray-400">Real-time monitoring of your IoT security landscape</p>
      </div>
      
      {/* Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Threats Detected" 
          value="124" 
          icon={<ShieldAlert size={24} className="text-red-400" />}
          change={{ value: 12, isPositive: false }}
          bgColor="bg-gray-800 border-l-4 border-red-500"
        />
        <StatCard 
          title="Protected Devices" 
          value="47" 
          icon={<Server size={24} className="text-green-400" />}
          change={{ value: 5, isPositive: true }}
          bgColor="bg-gray-800 border-l-4 border-green-500"
        />
        <StatCard 
          title="ML Detection Rate" 
          value="94.2%" 
          icon={<Zap size={24} className="text-yellow-400" />}
          change={{ value: 3, isPositive: true }}
          bgColor="bg-gray-800 border-l-4 border-yellow-500"
        />
        <StatCard 
          title="Active Users" 
          value="18" 
          icon={<UserCheck size={24} className="text-blue-400" />}
          bgColor="bg-gray-800 border-l-4 border-blue-500"
        />
      </div>
      
      {/* Security Metrics Chart */}
      <SecurityMetricsChart />
      
      {/* Threat Map Row */}
      <div>
        <ThreatMap />
      </div>
      
      {/* Three Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <AttackTypeChart />
        <div className="lg:col-span-2">
          <DeviceSecurityStatus />
        </div>
      </div>
      
      {/* Two Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MLModelPerformance />
        <RecentAlerts />
      </div>
    </div>
  );
};

export default Dashboard;