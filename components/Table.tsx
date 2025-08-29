
import React from 'react';
import type { TableEntry } from '../types';

interface TableProps {
  tableData: TableEntry[];
}

const BJORKLOVEN_ID = 'bjorkloven';

const Table: React.FC<TableProps> = ({ tableData }) => {
  return (
    <div className="bg-brand-surface rounded-lg overflow-hidden">
        <h2 className="p-4 text-lg font-bold text-center">HockeyAllsvenskan Tabell</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-brand-surface/50 text-xs text-gray-400 uppercase">
                <tr>
                    <th scope="col" className="px-2 py-3 text-center">#</th>
                    <th scope="col" className="px-4 py-3">Lag</th>
                    <th scope="col" className="px-2 py-3 text-center">GP</th>
                    <th scope="col" className="px-2 py-3 text-center">P</th>
                    <th scope="col" className="px-2 py-3 text-center">+/-</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((entry) => {
                    const isBjorkloven = entry.team.id === BJORKLOVEN_ID;
                    return (
                    <tr
                        key={entry.rank}
                        className={`border-b border-brand-border ${isBjorkloven ? 'bg-loven-green/20' : ''}`}
                    >
                        <td className="px-2 py-3 font-medium text-center">{entry.rank}</td>
                        <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                            <img src={entry.team.logoUrl} alt={`${entry.team.name} logo`} className="w-6 h-6 object-contain" />
                            <span className={`font-semibold ${isBjorkloven ? 'text-white' : 'text-gray-300'}`}>{entry.team.name}</span>
                        </div>
                        </td>
                        <td className="px-2 py-3 text-center">{entry.gamesPlayed}</td>
                        <td className="px-2 py-3 font-bold text-center">{entry.points}</td>
                        <td className={`px-2 py-3 font-medium text-center ${entry.goalDifference > 0 ? 'text-green-400' : entry.goalDifference < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                            {entry.goalDifference > 0 ? `+${entry.goalDifference}` : entry.goalDifference}
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Table;
