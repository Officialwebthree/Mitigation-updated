import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from '../../pages/Dashboard';
import ThreatMonitor from '../../pages/ThreatMonitor';
import DevicesPage from '../../pages/DevicesPage';
import MLModels from '../../pages/MLModels';
import AlertsPage from '../../pages/AlertsPage';
import ComingSoon from '../../pages/ComingSoon';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden lg:pl-64">
          <Navbar toggleSidebar={toggleSidebar} />
          
          <main className="flex-1 overflow-y-auto bg-gray-950 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/threats" element={<ThreatMonitor />} />
              <Route path="/devices" element={<DevicesPage />} />
              <Route path="/ml-models" element={<MLModels />} />
              <Route path="*" element={<ComingSoon pageName={activeTab} />} />
            </Routes>
          </main>
        </div>
        
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
      </div>
    </Router>
  );
};

export default Layout;