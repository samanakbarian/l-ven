
import React from 'react';
import type { Match, GamePlayerStat } from '../types';
import { BackIcon } from './icons';

interface GameStatsProps {
  match: Match;
  onBack: () => void;
}

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="bg-brand-surface/50 rounded-lg p-3 text-center">
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
    </div>
);

const GoalScorersChart: React.FC<{ data: { name: string, value: number }[] }> = ({ data }) => {
    if (data.length === 0) {
        return <p className="text-center text-gray-500 py-8">Inga mål gjorda.</p>;
    }
    
    const maxGoals = Math.max(...data.map(d => d.value), 1);

    return (
        <div className="p-4 space-y-4">
            {data.map((scorer) => {
                 const percentage = (scorer.value / maxGoals) * 100;
                 return (
                    <div key={scorer.name}>
                        <div className="flex justify-between items-center text-sm mb-1">
                            <span className="font-semibold text-gray-200">{scorer.name}</span>
                            <span className="font-bold text-white">{scorer.value} Mål</span>
                        </div>
                        <div className="w-full bg-brand-border rounded-full h-2.5">
                            <div 
                                className="bg-loven-green h-2.5 rounded-full" 
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const PlayerImpactChart: React.FC<{ players: GamePlayerStat[] }> = ({ players }) => {
    const impactPlayers = players.filter(p => p.plusMinus !== 0).sort((a,b) => b.plusMinus - a.plusMinus);
    if (impactPlayers.length === 0) {
        return <p className="text-center text-gray-500 py-8">Ingen +/- att visa.</p>;
    }
    const maxImpact = Math.max(...impactPlayers.map(p => Math.abs(p.plusMinus)), 1);
    
    return (
        <div className="p-4 space-y-3">
            {impactPlayers.map(player => (
                <div key={player.name} className="flex items-center gap-2 text-sm">
                    <span className="w-1/3 truncate text-right">{player.name}</span>
                    <div className="w-2/3 flex items-center">
                        <div className="w-1/2 bg-red-500/10 rounded-l-full">
                            {player.plusMinus < 0 && (
                                <div className="bg-red-500 h-4 rounded-l-full" style={{ width: `${(Math.abs(player.plusMinus) / maxImpact) * 100}%`, marginLeft: 'auto' }}></div>
                            )}
                        </div>
                        <div className="w-1/2 bg-green-500/10 rounded-r-full">
                             {player.plusMinus > 0 && (
                                <div className="bg-green-500 h-4 rounded-r-full" style={{ width: `${(player.plusMinus / maxImpact) * 100}%` }}></div>
                            )}
                        </div>
                    </div>
                    <span className={`w-8 text-center font-bold ${player.plusMinus > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {player.plusMinus > 0 ? `+${player.plusMinus}`: player.plusMinus}
                    </span>
                </div>
            ))}
        </div>
    );
};

const PhysicalPlayChart: React.FC<{ players: GamePlayerStat[] }> = ({ players }) => {
    const topHitters = players.filter(p => p.hits > 0).sort((a,b) => b.hits - a.hits).slice(0, 5);
    if (topHitters.length === 0) {
        return <p className="text-center text-gray-500 py-8">Inga tacklingar registrerade.</p>;
    }
    const maxHits = topHitters[0].hits;

    return <GoalScorersChart data={topHitters.map(p => ({name: p.name, value: p.hits}))} />;
}

const FaceoffSpecialistsChart: React.FC<{ players: GamePlayerStat[] }> = ({ players }) => {
    const faceoffTakers = players.filter(p => (p.faceoffsWon + p.faceoffsLost) > 0).sort((a,b) => b.faceoffPercentage - a.faceoffPercentage);
     if (faceoffTakers.length === 0) {
        return <p className="text-center text-gray-500 py-8">Inga tekningar registrerade.</p>;
    }

    return (
        <div className="p-4 space-y-4">
            {faceoffTakers.map(player => {
                const totalFaceoffs = player.faceoffsWon + player.faceoffsLost;
                const winPercent = (player.faceoffsWon / totalFaceoffs) * 100;
                return (
                    <div key={player.name}>
                         <div className="flex justify-between items-center text-sm mb-1">
                            <span className="font-semibold text-gray-200">{player.name}</span>
                            <span className="font-bold text-white">{player.faceoffPercentage}% <span className="text-xs font-normal text-gray-400">({player.faceoffsWon} av {totalFaceoffs})</span></span>
                        </div>
                        <div className="flex w-full h-2.5 bg-red-500/50 rounded-full overflow-hidden">
                            <div className="bg-green-500" style={{ width: `${winPercent}%` }}></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

const GameStats: React.FC<GameStatsProps> = ({ match, onBack }) => {
  const goalieStats = match.goalieStats || [];
  const playerStats = match.playerStats || [];

  const teamTotals = playerStats.reduce((acc, player) => {
      acc.goals += player.goals;
      acc.shotsOnGoal += player.shotsOnGoal;
      acc.hits += player.hits;
      acc.faceoffsWon += player.faceoffsWon;
      acc.faceoffsLost += player.faceoffsLost;
      return acc;
  }, {
      goals: 0,
      shotsOnGoal: 0,
      hits: 0,
      faceoffsWon: 0,
      faceoffsLost: 0,
  });

  const totalFaceoffs = teamTotals.faceoffsWon + teamTotals.faceoffsLost;
  const teamFaceoffPercentage = totalFaceoffs > 0 
      ? Math.round((teamTotals.faceoffsWon / totalFaceoffs) * 100)
      : 0;

  const goalScorers = playerStats.filter(p => p.goals > 0).map(p => ({ name: p.name, value: p.goals })).sort((a,b) => b.value - a.value);
  
  const maxPoints = playerStats.reduce((max, player) => {
      const points = player.goals + player.assists;
      return points > max ? points : max;
  }, 0);

  return (
    <div className="space-y-8">
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-loven-green font-semibold hover:text-green-300 transition-colors mb-4"
        >
          <BackIcon />
          Tillbaka till spelschema
        </button>
        <h2 className="text-xl font-bold text-center">
          Matchstatistik <br />
          <span className="text-base font-medium text-gray-300">{match.homeTeam.name} vs {match.awayTeam.name}</span>
        </h2>
      </div>

      {/* Team Totals */}
      <div className="bg-brand-surface rounded-lg p-4">
          <h3 className="text-lg font-bold text-center mb-4">Lagtotaler (Björklöven)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Mål" value={teamTotals.goals} />
              <StatCard label="Skott på mål" value={teamTotals.shotsOnGoal} />
              <StatCard label="Teknings %" value={`${teamFaceoffPercentage}%`} />
              <StatCard label="Tacklingar" value={teamTotals.hits} />
          </div>
      </div>
      
      {/* Visualizations */}
      <div className="bg-brand-surface rounded-lg">
          <h3 className="p-4 text-lg font-bold text-center border-b border-brand-border">Målskyttar</h3>
          <GoalScorersChart data={goalScorers} />
      </div>

      <div className="bg-brand-surface rounded-lg">
          <h3 className="p-4 text-lg font-bold text-center border-b border-brand-border">Spelarimpact (+/-)</h3>
          <PlayerImpactChart players={playerStats} />
      </div>
      
      <div className="bg-brand-surface rounded-lg">
          <h3 className="p-4 text-lg font-bold text-center border-b border-brand-border">Fysiskt Spel (Topp 5 Tacklare)</h3>
          <PhysicalPlayChart players={playerStats} />
      </div>

      <div className="bg-brand-surface rounded-lg">
          <h3 className="p-4 text-lg font-bold text-center border-b border-brand-border">Tekningsspecialister</h3>
          <FaceoffSpecialistsChart players={playerStats} />
      </div>


      {/* Goalie Stats Table */}
      <div className="bg-brand-surface rounded-lg overflow-hidden">
        <h3 className="p-4 text-lg font-bold">Målvakter</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-brand-surface/50 text-xs text-gray-400 uppercase whitespace-nowrap">
              <tr>
                <th scope="col" className="px-4 py-3">Spelare</th>
                <th scope="col" className="px-2 py-3 text-center">GA</th>
                <th scope="col" className="px-2 py-3 text-center">SVS</th>
                <th scope="col" className="px-2 py-3 text-center">SVS%</th>
              </tr>
            </thead>
            <tbody>
              {goalieStats.map((goalie) => (
                <tr key={goalie.name} className="border-b border-brand-border">
                  <td className="px-4 py-3 font-semibold">{goalie.name}</td>
                  <td className="px-2 py-3 text-center">{goalie.goalsAgainst}</td>
                  <td className="px-2 py-3 text-center">{goalie.saves}</td>
                  <td className="px-2 py-3 text-center font-bold">{goalie.savePercentage > 0 ? goalie.savePercentage.toLocaleString('sv-SE') : '0'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Full Player Stats Table */}
      <div className="bg-brand-surface rounded-lg overflow-hidden">
        <h3 className="p-4 text-lg font-bold">Fullständig Statistik</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
             <thead className="bg-brand-surface/50 text-xs text-gray-400 uppercase whitespace-nowrap">
                <tr>
                    <th scope="col" className="sticky left-0 bg-brand-surface/50 px-4 py-3 z-10">Spelare</th>
                    <th scope="col" className="px-2 py-3 text-center">G</th>
                    <th scope="col" className="px-2 py-3 text-center">A</th>
                    <th scope="col" className="px-2 py-3 text-center">P</th>
                    <th scope="col" className="px-2 py-3 text-center">PIM</th>
                    <th scope="col" className="px-2 py-3 text-center">SOG</th>
                    <th scope="col" className="px-2 py-3 text-center">+/-</th>
                    <th scope="col" className="px-2 py-3 text-center">TOI</th>
                    <th scope="col" className="px-2 py-3 text-center">HITS</th>
                    <th scope="col" className="px-2 py-3 text-center">FO%</th>
                </tr>
            </thead>
            <tbody className="whitespace-nowrap">
                {playerStats.map((player) => {
                    const playerPoints = player.goals + player.assists;
                    const isTopScorer = maxPoints > 0 && playerPoints === maxPoints;
                    return (
                        <tr 
                            key={player.name} 
                            className={`border-b border-brand-border transition-colors duration-300 ${isTopScorer ? 'bg-loven-green/20' : ''}`}
                        >
                            <td className={`sticky left-0 px-4 py-3 font-semibold transition-colors duration-300 ${isTopScorer ? 'bg-loven-green/20' : 'bg-brand-surface'}`}>{player.name}</td>
                            <td className="px-2 py-3 text-center">{player.goals}</td>
                            <td className="px-2 py-3 text-center">{player.assists}</td>
                            <td className="px-2 py-3 text-center font-bold">{playerPoints}</td>
                            <td className="px-2 py-3 text-center">{player.penaltyMinutes}</td>
                            <td className="px-2 py-3 text-center">{player.shotsOnGoal}</td>
                            <td className={`px-2 py-3 text-center font-bold ${player.plusMinus > 0 ? 'text-green-400' : player.plusMinus < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                {player.plusMinus > 0 ? `+${player.plusMinus}` : player.plusMinus}
                            </td>
                            <td className="px-2 py-3 text-center">{player.timeOnIce}</td>
                            <td className="px-2 py-3 text-center">{player.hits}</td>
                            <td className="px-2 py-3 text-center">{player.faceoffPercentage > 0 ? `${player.faceoffPercentage}` : '-'}</td>
                        </tr>
                    );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
