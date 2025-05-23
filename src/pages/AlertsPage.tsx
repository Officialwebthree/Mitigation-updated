import React, { useState } from 'react';
import { AlertCircle, MailWarning, Shield, Wifi, Filter, Search } from 'lucide-react';

interface Alert {
  id: string;
  type: 'email' | 'network' | 'device' | 'authentication';
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  details: string;
  status: 'new' | 'investigating' | 'resolved';
}

const AlertsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Mock data - in a real app this would come from an API
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'email',
      severity: 'critical',
      message: 'Phishing campaign detected targeting finance department',
      timestamp: '5 minutes ago',
      details: 'Multiple suspicious emails detected with similar patterns attempting to collect login credentials.',
      status: 'investigating'
    },
    {
      id: '2',
      type: 'network',
      severity: 'high',
      message: 'Suspicious outbound connection from IoT device',
      timestamp: '15 minutes ago',
      details: 'Device attempting to connect to known malicious IP address.',
      status: 'new'
    },
    {
      id: '3',
      type: 'device',
      severity: 'medium',
      message: 'Meeting Room Tablet running outdated firmware',
      timestamp: '1 hour ago',
      details: 'Current version: 1.2.3, Latest version: 1.4.0',
      status: 'new'
    },
    {
      id: '4',
      type: 'authentication',
      severity: 'high',
      message: 'Multiple failed login attempts detected',
      timestamp: '2 hours ago',
      details: '10 failed attempts from IP: 192.168.1.100',
      status: 'resolved'
    },
    // Add more alerts here...
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <MailWarning size={20} className="text-red-400" />;
      case 'network':
        return <Wifi size={20} className="text-yellow-400" />;
      case 'device':
        return <Shield size={20} className="text-blue-400" />;
      case 'authentication':
        return <AlertCircle size={20} className="text-purple-400" />;
      default:
        return <AlertCircle size={20} className="text-gray-400" />;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 text-red-400';
      case 'high':
        return 'bg-orange-500/20 text-orange-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'low':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-red-500/20 text-red-400';
      case 'investigating':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'resolved':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesType = selectedType === 'all' || alert.type === selectedType;
    return matchesSearch && matchesSeverity && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Security Alerts</h1>
        <p className="text-gray-400">Comprehensive view of all security alerts and incidents</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search alerts..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="email">Email</option>
              <option value="network">Network</option>
              <option value="device">Device</option>
              <option value="authentication">Authentication</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gray-800">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getSeverityClass(alert.severity)} capitalize`}>
                      {alert.severity}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(alert.status)} capitalize`}>
                      {alert.status}
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">{alert.timestamp}</span>
                  </div>
                  <h3 className="font-medium mb-1">{alert.message}</h3>
                  <p className="text-sm text-gray-400">{alert.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;