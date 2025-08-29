
import React from 'react';
import type { PlayerStat, View } from '../types';
import { View as ViewEnum } from '../types';
import { ChartBarIcon } from './icons';

interface PlayerStatsProps {
  playerStats: PlayerStat[];
  onViewChange: (view: View) => void;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ playerStats, onViewChange }) => {
  return (
    <div className="bg-brand-surface rounded-lg overflow-hidden">
      <div className="p-4 border-b border-brand-border">
        <h2 className="text-lg font-bold text-center">Spelarstatistik</h2>
        <button 
          onClick={() => onViewChange(ViewEnum.VisualStats)}
          className="mt-4 w-full flex items-center justify-center gap-2 text-center py-2 px-4 bg-loven-green/20 text-loven-green font-semibold rounded-md hover:bg-loven-green/30 transition-colors duration-200"
        >
          <ChartBarIcon />
          Visa Visuell Statistik
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-brand-surface/50 text-xs text-gray-400 uppercase">
            <tr>
              <th scope="col" className="px-2 py-3 text-center">#</th>
              <th scope="col" className="px-4 py-3">Namn</th>
              <th scope="col" className="px-2 py-3 text-center">Pos</th>
              <th scope="col" className="px-2 py-3 text-center">GP</th>
              <th scope="col" className="px-2 py-3 text-center">G</th>
              <th scope="col" className="px-2 py-3 text-center">A</th>
              <th scope="col" className="px-2 py-3 text-center font-bold">P</th>
            </tr>
          </thead>
          <tbody>
            {playerStats.map((player) => (
              <tr key={player.id} className="border-b border-brand-border">
                <td className="px-2 py-3 font-medium text-center text-gray-400">{player.number}</td>
                <td className="px-4 py-3 font-semibold text-gray-200">{player.name}</td>
                <td className="px-2 py-3 text-center text-gray-300">{player.position}</td>
                <td className="px-2 py-3 text-center">{player.gamesPlayed}</td>
                <td className="px-2 py-3 text-center">{player.goals}</td>
                <td className="px-2 py-3 text-center">{player.assists}</td>
                <td className="px-2 py-3 font-bold text-center text-white">{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerStats;