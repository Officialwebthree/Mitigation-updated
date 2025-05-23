import React from 'react';
import { 
  BarChart3, 
  Cpu, 
  Database, 
  Fingerprint, 
  Globe, 
  KeyRound, 
  Lock, 
  Settings, 
  Share2, 
  ShieldAlert, 
  Users 
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center gap-3 w-full px-4 py-3 rounded-md transition-colors ${
          active 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </button>
    </li>
  );
};

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={20} /> },
    { id: 'threats', label: 'Threat Monitor', icon: <ShieldAlert size={20} /> },
    { id: 'devices', label: 'IoT Devices', icon: <Cpu size={20} /> },
    { id: 'ml-models', label: 'ML Models', icon: <Database size={20} /> },
    { id: 'collaboration', label: 'Collaboration', icon: <Share2 size={20} /> },
    { id: 'intelligence', label: 'Threat Intel', icon: <Globe size={20} /> },
    { id: 'authentication', label: 'Authentication', icon: <KeyRound size={20} /> },
    { id: 'users', label: 'User Management', icon: <Users size={20} /> },
    { id: 'compliance', label: 'Compliance', icon: <Lock size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 transform transition-transform duration-300 ease-in-out z-20 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="p-5 border-b border-gray-800 flex items-center gap-3">
        <Fingerprint className="text-blue-400" size={28} />
        <h2 className="text-xl font-bold">SecureIoT</h2>
      </div>
      
      <nav className="mt-5">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        <div className="bg-gray-800 p-3 rounded-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">System Status: Active</span>
          </div>
          <div className="text-xs text-gray-400">
            Last updated: 2 mins ago
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;