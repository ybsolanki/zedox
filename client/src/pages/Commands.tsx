import { useQuery } from "@tanstack/react-query";

interface BotCommand {
  name: string;
  description: string;
  category: "basic" | "moderation" | "utility";
  usage?: string;
  aliases?: string[];
  permissions?: string[];
}

export function Commands() {
  const { data, isLoading } = useQuery<{ data: BotCommand[] }>({
    queryKey: ["commands"],
    queryFn: () => fetch("/api/commands").then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const commands = data?.data || [];
  const commandsByCategory = {
    basic: commands.filter((cmd) => cmd.category === "basic"),
    moderation: commands.filter((cmd) => cmd.category === "moderation"),
    utility: commands.filter((cmd) => cmd.category === "utility"),
  };

  const categoryIcons = {
    basic: "📋",
    moderation: "🔨",
    utility: "🛠️",
  };

  const categoryNames = {
    basic: "Basic Commands",
    moderation: "Moderation Commands", 
    utility: "Utility Commands",
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Bot Commands
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          All available commands for your Discord bot
        </p>
      </div>

      {Object.entries(commandsByCategory).map(([category, categoryCommands]) => (
        <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl">{categoryIcons[category as keyof typeof categoryIcons]}</span>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {categoryNames[category as keyof typeof categoryNames]}
            </h2>
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {categoryCommands.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryCommands.map((command) => (
              <div
                key={command.name}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    !{command.name}
                  </h3>
                  {command.permissions && command.permissions.length > 0 && (
                    <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs font-medium px-2 py-1 rounded">
                      Permissions Required
                    </span>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {command.description}
                </p>

                <div className="space-y-2">
                  {command.usage && (
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Usage
                      </span>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-mono bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                        {command.usage}
                      </p>
                    </div>
                  )}

                  {command.aliases && command.aliases.length > 0 && (
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Aliases
                      </span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {command.aliases.join(", ")}
                      </p>
                    </div>
                  )}

                  {command.permissions && command.permissions.length > 0 && (
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Required Permissions
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {command.permissions.map((permission) => (
                          <span
                            key={permission}
                            className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-xs font-medium px-2 py-1 rounded"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {categoryCommands.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No commands available in this category
              </p>
            </div>
          )}
        </div>
      ))}

      {commands.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Commands Available
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            The bot doesn't have any commands configured yet.
          </p>
        </div>
      )}
    </div>
  );
}