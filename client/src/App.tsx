import { Router, Route, Switch } from "wouter";
import { Dashboard } from "./pages/Dashboard";
import { Commands } from "./pages/Commands";
import { Guilds } from "./pages/Guilds";
import { Navigation } from "./components/Navigation";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Router>
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/commands" component={Commands} />
            <Route path="/guilds" component={Guilds} />
            <Route>
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  404 - Page Not Found
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  The page you're looking for doesn't exist.
                </p>
              </div>
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;