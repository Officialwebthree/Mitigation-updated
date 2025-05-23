import React from 'react';
import { AlertCircle, ArrowRight, MailWarning, Shield, Wifi } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Alert {
  id: string;
  type: 'email' | 'network' | 'device' | 'authentication';
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
}

const RecentAlerts: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data - in a real app this would come from an API
  const alerts: Alert[] = [
    { 
      id: '1', 
      type: 'email', 
      severity: 'critical', 
      message: 'Phishing campaign detected targeting finance department', 
      timestamp: '5 minutes ago' 
    },
    { 
      id: '2', 
      type: 'network', 
      severity: 'high', 
      message: 'Suspicious outbound connection from IoT device', 
      timestamp: '15 minutes ago' 
    },
    { 
      id: '3', 
      type: 'device', 
      severity: 'medium', 
      message: 'Meeting Room Tablet running outdated firmware', 
      timestamp: '1 hour ago' 
    },
    { 
      id: '4', 
      type: 'authentication', 
      severity: 'high', 
      message: 'Multiple failed login attempts detected', 
      timestamp: '2 hours ago' 
    },
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

  const handleViewAll = () => {
    navigate('/alerts');
  };

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Recent Alerts</h3>
        <button 
          onClick={handleViewAll}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={handleViewAll}
          >
            <div className="flex">
              <div className="mr-3">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityClass(alert.severity)} capitalize`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs text-gray-400">{alert.timestamp}</span>
                </div>
                <p className="mt-1">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={handleViewAll}
        className="w-full mt-4 py-2 flex items-center justify-center border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors text-sm"
      >
        <span>View All Alerts</span>
        <ArrowRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

export default RecentAlerts;