
import React, { useState } from 'react';
import type { LeagueData, View, PlayerStat } from '../types';
import { View as ViewEnum } from '../types';
import { BackIcon } from './icons';

interface VisualStatsProps {
  data: LeagueData;
  onViewChange: (view: View) => void;
}

const StatBar: React.FC<{ value: number; total: number; colorClass: string; label: string }> = ({ value, total, colorClass, label }) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-bold text-white">{value}</span>
      </div>
      <div className="w-full bg-brand-border rounded-full h-2.5">
        <div className={`${colorClass} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

const VisualStats: React.FC<VisualStatsProps> = ({ data, onViewChange }) => {
  const { teamStats, playerStats } = data;
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(playerStats[0]?.id || '');

  const selectedPlayer = playerStats.find(p => p.id === selectedPlayerId);

  // Calculate max values for scaling the bars
  const maxPoints = Math.max(...playerStats.map(p => p.points), 1);
  const maxGoals = Math.max(...playerStats.map(p => p.goals), 1);
  const maxAssists = Math.max(...playerStats.map(p => p.assists), 1);
  const maxShots = Math.max(...playerStats.map(p => p.shotsOnGoal), 1);
  const maxPim = Math.max(...playerStats.map(p => p.penaltyMinutes), 1);
  const maxHits = Math.max(...playerStats.map(p => p.hits), 1);

  const totalMatches = teamStats.wins + teamStats.losses;
  const winPercentage = totalMatches > 0 ? (teamStats.wins / totalMatches) * 100 : 0;
  
  const totalGoals = teamStats.goalsFor + teamStats.goalsAgainst;
  const goalsForPercentage = totalGoals > 0 ? (teamStats.goalsFor / totalGoals) * 100 : 0;


  return (
    <div className="space-y-8">
      <div>
        <button
          onClick={() => onViewChange(ViewEnum.PlayerStats)}
          className="flex items-center gap-2 text-sm text-loven-green font-semibold hover:text-green-300 transition-colors mb-4"
        >
          <BackIcon />
          Tillbaka till listan
        </button>
        <h2 className="text-xl font-bold text-center">Visuell Statistik</h2>
      </div>

      {/* Team Statistics */}
      <div className="bg-brand-surface rounded-lg p-4">
        <h3 className="text-lg font-bold mb-4 text-center">Lagstatistik</h3>
        <div className="space-y-4">
            <div>
                <div className="flex justify-between text-sm font-medium text-gray-400 mb-1">
                    <span>Vinster ({teamStats.wins})</span>
                    <span>Förluster ({teamStats.losses})</span>
                </div>
                <div className="flex w-full h-4 bg-red-500/50 rounded-full overflow-hidden">
                    <div className="bg-green-500/80" style={{ width: `${winPercentage}%` }}></div>
                </div>
            </div>
             <div>
                <div className="flex justify-between text-sm font-medium text-gray-400 mb-1">
                    <span>Gjorda Mål ({teamStats.goalsFor})</span>
                    <span>Insläppta Mål ({teamStats.goalsAgainst})</span>
                </div>
                <div className="flex w-full h-4 bg-red-400/30 rounded-full overflow-hidden">
                    <div className="bg-loven-green/80" style={{ width: `${goalsForPercentage}%` }}></div>
                </div>
            </div>
        </div>
      </div>

      {/* Individual Player Statistics */}
      <div className="bg-brand-surface rounded-lg p-4">
        <h3 className="text-lg font-bold mb-4 text-center">Individuell Statistik</h3>
        
        {/* Player Selector */}
        <div className="mb-6">
            <label htmlFor="player-select" className="block mb-2 text-sm font-medium text-gray-400">Välj spelare</label>
            <select 
                id="player-select"
                value={selectedPlayerId}
                onChange={(e) => setSelectedPlayerId(e.target.value)}
                className="bg-brand-border border border-brand-border/50 text-white text-sm rounded-lg focus:ring-loven-green focus:border-loven-green block w-full p-2.5"
            >
                {playerStats.map(player => (
                    <option key={player.id} value={player.id}>{player.name}</option>
                ))}
            </select>
        </div>

        {/* Player Stats Bars */}
        {selectedPlayer && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <StatBar value={selectedPlayer.goals} total={maxGoals} colorClass="bg-green-500" label="Mål" />
                <StatBar value={selectedPlayer.assists} total={maxAssists} colorClass="bg-blue-500" label="Assists" />
                <StatBar value={selectedPlayer.points} total={maxPoints} colorClass="bg-yellow-500" label="Poäng" />
                <StatBar value={selectedPlayer.shotsOnGoal} total={maxShots} colorClass="bg-purple-500" label="Skott på mål (SOG)" />
                <StatBar value={selectedPlayer.penaltyMinutes} total={maxPim} colorClass="bg-red-500" label="Utvisningsminuter (PIM)" />
                <StatBar value={selectedPlayer.hits} total={maxHits} colorClass="bg-orange-500" label="Tacklingar" />
            </div>
        )}
      </div>
    </div>
  );
};

export default VisualStats;