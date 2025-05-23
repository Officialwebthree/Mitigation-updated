import React from 'react';
import { Construction } from 'lucide-react';

interface ComingSoonProps {
  pageName: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ pageName }) => {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <Construction size={64} className="text-blue-500 mb-6" />
      <h2 className="text-3xl font-bold mb-4 capitalize">{pageName}</h2>
      <p className="text-gray-400 text-lg text-center max-w-md">
        This section is currently under development. Check back soon for updates!
      </p>
    </div>
  );
}

export default ComingSoon;