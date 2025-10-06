import { useState, useEffect } from 'react'
import './App.css'

interface BotStats {
  status: string;
  guilds: number;
  users: number;
  uptime: number | null;
}

function App() {
  const [stats, setStats] = useState<BotStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/bot/status');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch bot stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (uptime: number | null) => {
    if (!uptime) return 'N/A';
    const seconds = Math.floor(uptime / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Discord Bot Dashboard</h1>
            </div>
            
            {loading ? (
              <div className="text-center">
                <p className="text-gray-600">Loading bot status...</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Bot Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      stats?.status === 'online' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {stats?.status || 'Unknown'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Servers:</span>
                    <span className="text-gray-900">{stats?.guilds || 0}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Users:</span>
                    <span className="text-gray-900">{stats?.users || 0}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Uptime:</span>
                    <span className="text-gray-900">{formatUptime(stats?.uptime || null)}</span>
                  </div>
                </div>
                
                <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                  <p className="text-gray-900">Bot Commands</p>
                  <div className="mt-4 space-y-2 text-sm font-normal text-gray-600">
                    <p><code className="bg-gray-100 px-2 py-1 rounded">!ping</code> - Test bot responsiveness</p>
                    <p><code className="bg-gray-100 px-2 py-1 rounded">!help</code> - Show available commands</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App