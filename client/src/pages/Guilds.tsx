import { useQuery } from "@tanstack/react-query";

interface Guild {
  id: string;
  name: string;
  memberCount: number;
  channelCount: number;
  roleCount: number;
  ownerId: string;
  icon: string | null;
  joinedAt?: string;
}

export function Guilds() {
  const { data, isLoading, error } = useQuery<{ data: Guild[] }>({
    queryKey: ["guilds"],
    queryFn: () => fetch("/api/guilds").then((res) => res.json()),
    refetchInterval: 60000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Error Loading Servers
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Failed to load server information. The bot might be offline.
        </p>
      </div>
    );
  }

  const guilds = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Discord Servers
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Servers where your bot is currently active
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Active Servers
          </h2>
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-sm font-medium px-3 py-1 rounded-full">
            {guilds.length} server{guilds.length !== 1 ? "s" : ""}
          </span>
        </div>

        {guilds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guilds.map((guild) => (
              <div
                key={guild.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-4">
                  {guild.icon ? (
                    <img
                      src={guild.icon}
                      alt={`${guild.name} icon`}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {guild.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {guild.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {guild.id}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {guild.memberCount}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {guild.channelCount}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Channels</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {guild.roleCount}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Roles</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Owner ID:</span>
                    <span className="text-gray-900 dark:text-white font-mono">
                      {guild.ownerId}
                    </span>
                  </div>
                  {guild.joinedAt && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Joined:</span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(guild.joinedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                    onClick={() => {
                      // TODO: Add navigation to server-specific dashboard
                      alert(`Navigate to ${guild.name} dashboard (feature coming soon)`);
                    }}
                  >
                    View Server Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏰</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Servers Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Your bot isn't in any Discord servers yet.
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              onClick={() => {
                // Generate invite link - this would need the bot's client ID
                alert("Bot invite link functionality needs to be implemented");
              }}
            >
              Invite Bot to Server
            </button>
          </div>
        )}
      </div>

      {/* Server Statistics */}
      {guilds.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Server Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Total Members
              </p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                {guilds.reduce((acc, guild) => acc + guild.memberCount, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                Total Channels
              </p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-300">
                {guilds.reduce((acc, guild) => acc + guild.channelCount, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                Average Members
              </p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                {Math.round(
                  guilds.reduce((acc, guild) => acc + guild.memberCount, 0) / guilds.length
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}