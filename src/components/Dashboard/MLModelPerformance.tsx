import React from 'react';

const MLModelPerformance: React.FC = () => {
  // Mock data - in a real app this would come from an API
  const models = [
    { 
      name: 'Phishing URL Detector', 
      accuracy: 97.8, 
      lastTraining: '2 days ago',
      trainingProgress: 100,
      status: 'active' 
    },
    { 
      name: 'Email Content Analyzer', 
      accuracy: 94.2, 
      lastTraining: '1 day ago',
      trainingProgress: 100,
      status: 'active' 
    },
    { 
      name: 'Network Anomaly Detector', 
      accuracy: 89.5, 
      lastTraining: '5 days ago',
      trainingProgress: 100,
      status: 'active' 
    },
    { 
      name: 'Behavior Analysis Engine', 
      accuracy: 0, 
      lastTraining: 'Never',
      trainingProgress: 65,
      status: 'training' 
    },
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">ML Model Performance</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          Configure Models
        </button>
      </div>
      
      <div className="space-y-4">
        {models.map((model, index) => (
          <div key={index} className="p-3 bg-gray-700/50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{model.name}</h4>
              {model.status === 'active' ? (
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                  Active
                </span>
              ) : (
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full flex items-center">
                  <span className="mr-1">Training</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                </span>
              )}
            </div>
            
            {model.status === 'active' ? (
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Accuracy</div>
                  <div className="text-lg font-semibold">{model.accuracy}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Last Training</div>
                  <div className="text-sm">{model.lastTraining}</div>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Training Progress</span>
                  <span>{model.trainingProgress}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${model.trainingProgress}%` }}
                  >
                    <div className="w-full h-full opacity-30 bg-gradient-to-r from-white/0 to-white/40 rounded-full"></div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-2">Estimated completion: 35 minutes</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MLModelPerformance;