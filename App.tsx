
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Table from './components/Table';
import Schedule from './components/Schedule';
import PlayerStats from './components/PlayerStats';
import News from './components/News';
import History from './components/History';
import Loader from './components/Loader';
import { fetchLeagueData } from './services/hockeyService';
import type { LeagueData, View } from './types';
import { View as ViewEnum } from './types';


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(ViewEnum.Dashboard);
  const [leagueData, setLeagueData] = useState<LeagueData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchLeagueData();
        setLeagueData(data);
      } catch (err) {
        setError('Kunde inte ladda data. Försök igen senare.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <div className="text-center text-red-400 mt-10">{error}</div>;
    }
    if (!leagueData) {
      return <div className="text-center text-gray-500 mt-10">Ingen data tillgänglig.</div>;
    }

    switch (currentView) {
      case ViewEnum.Dashboard:
        return <Dashboard data={leagueData} onViewChange={setCurrentView} />;
      case ViewEnum.Table:
        return <Table tableData={leagueData.table} />;
      case ViewEnum.Schedule:
        return <Schedule schedule={leagueData.schedule} />;
      case ViewEnum.PlayerStats:
        return <PlayerStats playerStats={leagueData.playerStats} />;
      case ViewEnum.News:
        return <News newsFeed={leagueData.newsFeed} />;
      case ViewEnum.History:
        return <History historicalData={leagueData.historicalData} />;
      default:
        return <Dashboard data={leagueData} onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="max-w-2xl mx-auto">
            {renderContent()}
        </div>
      </main>
      <footer className="text-center py-4 text-xs text-gray-600 border-t border-brand-border mt-8">
        <p>Löven-kollen | Data är simulerad för demonstrationsändamål.</p>
      </footer>
    </div>
  );
};

export default App;
