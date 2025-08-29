
import React from 'react';
import type { HistoricalSeason } from '../types';

interface HistoryProps {
  historicalData: HistoricalSeason[];
}

const History: React.FC<HistoryProps> = ({ historicalData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold px-1">Historik</h2>
      {historicalData.map(season => (
        <div key={season.id} className="bg-brand-surface rounded-lg p-4">
          <h3 className="text-md font-bold text-white">Säsong {season.season}</h3>
          <div className="mt-3 grid grid-cols-2 gap-4 text-center">
            <div>
                <p className="text-2xl font-bold">{season.finalRank}</p>
                <p className="text-xs text-gray-400">Plats i grundserien</p>
            </div>
            <div className="flex items-center justify-center">
                <p className="text-base font-semibold text-gray-300">{season.playoffResult}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
