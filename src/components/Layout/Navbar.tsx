import React from 'react';
import { Bell, Menu, Shield, User } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-900 text-white h-16 px-4 flex items-center justify-between border-b border-gray-800">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-800 transition-colors mr-4"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <Shield className="text-blue-400" size={24} />
          <h1 className="text-xl font-bold">SecureIoT Shield</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors relative" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs">
            3
          </span>
        </button>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 cursor-pointer hover:bg-gray-700 transition-colors">
          <User size={18} />
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;