
import React from 'react';
import type { Match } from '../types';
import { HomeIcon, AwayIcon } from './icons';

interface MatchCardProps {
  match: Match;
  type: 'last' | 'next';
}

const BJORKLOVEN_ID = 'bjorkloven';

const MatchCard: React.FC<MatchCardProps> = ({ match, type }) => {
  const isHomeGame = match.homeTeam.id === BJORKLOVEN_ID;
  const opponent = isHomeGame ? match.awayTeam : match.homeTeam;
  const bjorkloven = isHomeGame ? match.homeTeam : match.awayTeam;

  const isWin = type === 'last' && (
    (isHomeGame && match.homeScore! > match.awayScore!) ||
    (!isHomeGame && match.awayScore! > match.homeScore!)
  );

  const cardBorderColor = type === 'last' 
    ? (isWin ? 'border-green-500' : 'border-red-500') 
    : 'border-brand-border';

  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-brand-surface rounded-lg overflow-hidden border-t-4 ${cardBorderColor}`}>
      <div className="p-4">
        <p className="text-center text-sm font-semibold text-gray-400 mb-3">
          {type === 'last' ? 'Senaste Match' : 'Nästa Match'}
        </p>
        <div className="flex items-center justify-around">
          <TeamDisplay team={bjorkloven} />

          {type === 'last' ? (
            <div className="text-center">
              <p className="text-4xl font-bold tracking-tight">
                {isHomeGame ? match.homeScore : match.awayScore} - {isHomeGame ? match.awayScore : match.homeScore}
              </p>
              <p className={`font-semibold ${isWin ? 'text-green-400' : 'text-red-400'}`}>
                {isWin ? 'VINST' : 'FÖRLUST'}
              </p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-gray-500">VS</p>
          )}

          <TeamDisplay team={opponent} />
        </div>
      </div>
      <div className="bg-brand-surface/50 px-4 py-2 text-xs text-center text-gray-300">
        <div className="flex items-center justify-center gap-2">
            {isHomeGame ? <HomeIcon className="w-4 h-4 text-green-400" /> : <AwayIcon className="w-4 h-4 text-red-400" />}
            <span>{isHomeGame ? 'Hemma' : 'Borta'}</span>
            <span className="text-gray-500">|</span>
            <span>{formatMatchDate(match.date)}</span>
        </div>
      </div>
    </div>
  );
};

const TeamDisplay: React.FC<{ team: Match['homeTeam'] }> = ({ team }) => (
  <div className="flex flex-col items-center text-center w-24">
    <img src={team.logoUrl} alt={`${team.name} logo`} className="h-12 w-12 md:h-16 md:w-16 mb-2 object-contain" />
    <p className="text-sm font-semibold leading-tight">{team.name}</p>
  </div>
);

export default MatchCard;
