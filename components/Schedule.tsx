
import React from 'react';
import type { Match } from '../types';
import { HomeIcon, AwayIcon, ChartBarIcon } from './icons';

interface ScheduleProps {
  schedule: Match[];
  onViewStats: (matchId: string) => void;
}

const BJORKLOVEN_ID = 'bjorkloven';

const ScheduleItem: React.FC<{ match: Match, onViewStats: (matchId: string) => void; }> = ({ match, onViewStats }) => {
    const isHomeGame = match.homeTeam.id === BJORKLOVEN_ID;
    const opponent = isHomeGame ? match.awayTeam : match.homeTeam;
    const isPlayed = match.status === 'played';
    
    const isWin = isPlayed && (
      (isHomeGame && match.homeScore! > match.awayScore!) ||
      (!isHomeGame && match.awayScore! > match.homeScore!)
    );

    const hasStats = isPlayed && !!match.playerStats;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('sv-SE', {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('sv-SE', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <li className="flex items-center justify-between p-4 bg-brand-surface/50 rounded-md">
            <div className="flex items-center gap-3 w-1/3">
                <img src={opponent.logoUrl} alt={opponent.name} className="w-8 h-8 object-contain" />
                <span className="font-semibold text-gray-200">{opponent.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
                {isHomeGame ? <HomeIcon className="w-4 h-4 text-green-400" /> : <AwayIcon className="w-4 h-4 text-red-400" />}
                <span>{isHomeGame ? 'Hemma' : 'Borta'}</span>
            </div>
             <div className="flex flex-col items-end text-right">
                {isPlayed ? (
                    <div className="flex items-center gap-2">
                        <div className={`px-2 py-1 rounded text-sm font-bold ${isWin ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                           {isWin ? 'V' : 'F'} {match.homeScore}-{match.awayScore}
                        </div>
                        {hasStats && (
                            <button 
                                onClick={() => onViewStats(match.id)}
                                className="p-1.5 rounded-md bg-brand-border/50 hover:bg-brand-border text-gray-300 transition-colors"
                                aria-label="Visa matchstatistik"
                            >
                                <ChartBarIcon className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="text-sm font-medium text-gray-300">{formatTime(match.date)}</div>
                )}
                <div className="text-xs text-gray-500 mt-1">{formatDate(match.date)}</div>
            </div>
        </li>
    );
};


const Schedule: React.FC<ScheduleProps> = ({ schedule, onViewStats }) => {
  const upcomingMatches = schedule.filter((m) => m.status === 'upcoming');
  const playedMatches = schedule.filter((m) => m.status === 'played').reverse();

  return (
    <div className="space-y-8">
        <div>
            <h2 className="text-lg font-bold mb-4 px-1">Kommande Matcher</h2>
            {upcomingMatches.length > 0 ? (
                <ul className="space-y-2">
                    {upcomingMatches.map(match => <ScheduleItem key={match.id} match={match} onViewStats={onViewStats} />)}
                </ul>
            ) : (
                <p className="text-gray-500 text-center py-4">Inga kommande matcher i schemat.</p>
            )}
        </div>
         <div>
            <h2 className="text-lg font-bold mb-4 px-1">Spelade Matcher</h2>
            {playedMatches.length > 0 ? (
                <ul className="space-y-2">
                    {playedMatches.map(match => <ScheduleItem key={match.id} match={match} onViewStats={onViewStats} />)}
                </ul>
            ) : (
                <p className="text-gray-500 text-center py-4">Inga spelade matcher än.</p>
            )}
        </div>
    </div>
  );
};

export default Schedule;