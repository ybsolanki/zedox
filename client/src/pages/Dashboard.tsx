import { useQuery } from "@tanstack/react-query";

interface BotStats {
  guildCount: number;
  userCount: number;
  commandsUsed: number;
  uptime: number;
  memoryUsage: number;
}

interface BotStatus {
  online: boolean;
  uptime: number;
  memoryUsage: number;
  guilds: number;
  users: number;
}

function formatUptime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export function Dashboard() {
  const { data: status, isLoading: statusLoading } = useQuery<{ data: BotStatus }>({
    queryKey: ["bot-status"],
    queryFn: () => fetch("/api/status").then((res) => res.json()),
    refetchInterval: 30000,
  });

  const { data: stats, isLoading: statsLoading } = useQuery<{ data: BotStats }>({
    queryKey: ["bot-stats"],
    queryFn: () => fetch("/api/stats").then((res) => res.json()),
    refetchInterval: 30000,
  });

  const { data: usage } = useQuery<{ data: any[] }>({
    queryKey: ["command-usage"],
    queryFn: () => fetch("/api/usage?limit=10").then((res) => res.json()),
    refetchInterval: 60000,
  });

  if (statusLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const botStats = stats?.data;
  const botStatus = status?.data;
  const recentUsage = usage?.data || [];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Discord Bot Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Monitor and manage your Discord bot
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Status</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {botStatus?.online ? "Online" : "Offline"}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full ${botStatus?.online ? "bg-green-500" : "bg-red-500"}`}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Servers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {botStats?.guildCount || 0}
              </p>
            </div>
            <span className="text-2xl">🏰</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {botStats?.userCount || 0}
              </p>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Commands Used</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {botStats?.commandsUsed || 0}
              </p>
            </div>
            <span className="text-2xl">⚡</span>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Uptime:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {formatUptime(botStats?.uptime || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Memory Usage:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {Math.round(botStats?.memoryUsage || 0)}MB
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Node.js Version:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {process?.version || "Unknown"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Command Usage
          </h3>
          <div className="space-y-2">
            {recentUsage.length > 0 ? (
              recentUsage.slice(0, 5).map((cmd: any, index: number) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    {cmd.command}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {new Date(cmd.usedAt).toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No recent command usage
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}