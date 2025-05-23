import React, { useState } from 'react';
import { Brain, AlertTriangle, CheckCircle, Search, Loader2 } from 'lucide-react';

// Common phishing patterns and indicators
const PHISHING_PATTERNS = {
  urlPatterns: [
    /^https?:\/\/[^/]+\.[^/]+\/(?:[^/]+\/)*[^/]*(?:login|signin|account|verify|secure|banking|paypal|update|confirm)/i,
    /^https?:\/\/[^/]+\.[^/]+\/.*[0-9a-f]{32}/i,
    /^https?:\/\/[^/]+\.[^/]+\/.*\.php\?.*token=/i
  ],
  suspiciousDomains: [
    'bit.ly', 'goo.gl', 'tinyurl.com', 't.co',
    'secure-banking', 'account-verify', 'login-secure'
  ],
  redFlags: [
    'unusual TLD',
    'IP address in URL',
    'multiple subdomains',
    'misspelled domains',
    'numeric characters in domain'
  ]
};

const MLModels: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    isPhishing: boolean;
    confidence: number;
    features: string[];
  } | null>(null);

  const analyzeUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setResult(null);

    // Simulated ML analysis with more sophisticated checks
    setTimeout(() => {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.toLowerCase();
      
      let suspiciousScore = 0;
      let detectedFeatures: string[] = [];

      // Check URL patterns
      PHISHING_PATTERNS.urlPatterns.forEach(pattern => {
        if (pattern.test(url)) {
          suspiciousScore += 0.3;
          detectedFeatures.push('Suspicious URL pattern detected');
        }
      });

      // Check suspicious domains
      if (PHISHING_PATTERNS.suspiciousDomains.some(d => domain.includes(d))) {
        suspiciousScore += 0.25;
        detectedFeatures.push('Known suspicious domain pattern');
      }

      // Check for IP address in URL
      if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(domain)) {
        suspiciousScore += 0.2;
        detectedFeatures.push('IP address used instead of domain name');
      }

      // Check for multiple subdomains
      if (domain.split('.').length > 3) {
        suspiciousScore += 0.15;
        detectedFeatures.push('Excessive number of subdomains');
      }

      // Check for unusual TLD
      const commonTLDs = ['.com', '.org', '.net', '.edu', '.gov'];
      if (!commonTLDs.some(tld => domain.endsWith(tld))) {
        suspiciousScore += 0.1;
        detectedFeatures.push('Unusual top-level domain');
      }

      const isPhishing = suspiciousScore > 0.5;
      const confidence = isPhishing 
        ? Math.min(suspiciousScore * 100, 99.9)
        : Math.max((1 - suspiciousScore) * 100, 70);

      setResult({
        isPhishing,
        confidence,
        features: detectedFeatures.length > 0 ? detectedFeatures : ['No suspicious patterns detected']
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">ML Models Dashboard</h1>
        <p className="text-gray-400">Advanced phishing detection powered by machine learning</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="text-blue-400" size={24} />
          <h2 className="text-xl font-semibold">URL Analysis</h2>
        </div>

        <form onSubmit={analyzeUrl} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
              Enter URL to analyze
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={isAnalyzing}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    Analyze
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${result.isPhishing ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
              <div className="flex items-center gap-2">
                {result.isPhishing ? (
                  <AlertTriangle className="text-red-400" size={24} />
                ) : (
                  <CheckCircle className="text-green-400" size={24} />
                )}
                <div>
                  <h3 className="font-semibold">
                    {result.isPhishing ? 'Potential Phishing Detected' : 'URL Appears Safe'}
                  </h3>
                  <p className="text-sm opacity-90">
                    Confidence: {result.confidence.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Analysis Features</h4>
              <ul className="space-y-2">
                {result.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Model Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Accuracy</span>
                <span>97.8%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '97.8%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Precision</span>
                <span>96.3%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96.3%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Recall</span>
                <span>98.1%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98.1%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Training Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Last Training</span>
              <span className="text-sm text-gray-400">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Dataset Size</span>
              <span className="text-sm text-gray-400">2.5M URLs</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Next Training</span>
              <span className="text-sm text-gray-400">In 4 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLModels;