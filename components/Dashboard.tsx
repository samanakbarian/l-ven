
import React from 'react';
import type { LeagueData, View } from '../types';
import MatchCard from './MatchCard';

interface DashboardProps {
  data: LeagueData;
  onViewChange: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onViewChange }) => {
  const { lastMatch, nextMatch, bjorklovenTableEntry } = data;

  return (
    <div className="space-y-6">
      {lastMatch && <MatchCard match={lastMatch} type="last" />}
      {nextMatch && <MatchCard match={nextMatch} type="next" />}
      
      {bjorklovenTableEntry && (
        <div className="bg-brand-surface rounded-lg p-4">
          <h2 className="text-sm font-semibold text-gray-400 mb-3 text-center">Tabellplacering</h2>
          <div className="grid grid-cols-3 text-center divide-x divide-brand-border">
            <div>
              <p className="text-2xl font-bold">{bjorklovenTableEntry.rank}</p>
              <p className="text-xs text-gray-400">Plats</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{bjorklovenTableEntry.gamesPlayed}</p>
              <p className="text-xs text-gray-400">Matcher</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{bjorklovenTableEntry.points}</p>
              <p className="text-xs text-gray-400">Poäng</p>
            </div>
          </div>
          <button 
            onClick={() => onViewChange('TABLE' as View)}
            className="mt-4 w-full text-center py-2 px-4 bg-loven-green/20 text-loven-green font-semibold rounded-md hover:bg-loven-green/30 transition-colors duration-200"
          >
            Visa hela tabellen
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
