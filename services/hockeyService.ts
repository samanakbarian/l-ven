import type { Team, Match, TableEntry, LeagueData, PlayerStat, NewsArticle, HistoricalSeason, TeamStats, GameGoalieStat, GamePlayerStat } from '../types';

const BJORKLOVEN_ID = 'bjorkloven';

const teams: Team[] = [
  { id: 'bjorkloven', name: 'IF Björklöven', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/9/91/IF_Bj%C3%B6rkl%C3%B6ven_logo.svg' },
  { id: 'aik', name: 'AIK', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/1/12/AIK_Hockey_logo.svg' },
  { id: 'brynas', name: 'Brynäs IF', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/41/Bryn%C3%A4s_IF_logo.svg' },
  { id: 'djurgarden', name: 'Djurgårdens IF', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/8/87/Djurg%C3%A5rdens_IF_Hockey_logo.svg' },
  { id: 'sodertalje', name: 'Södertälje SK', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e5/S%C3%B6dert%C3%A4lje_SK_logo.svg' },
  { id: 'karlskoga', name: 'BIK Karlskoga', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d4/BIK_Karlskoga_logo.svg' },
  { id: 'vasteras', name: 'Västerås IK', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9f/V%C3%A4ster%C3%A5s_IK_logo.svg' },
  { id: 'mora', name: 'Mora IK', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Mora_IK_logo.svg' },
];

const getTeamById = (id: string): Team => teams.find(t => t.id === id)!;

// Example per-game stats from user
const gameGoalieStats: GameGoalieStat[] = [
  { name: 'Joona Voutilainen', number: 30, goalsAgainst: 0, shotsOnGoalAgainst: 0, shotsOnPowerPlayAgainst: 0, saves: 0, savePercentage: 0 },
  { name: 'Melker Thelin', number: 35, goalsAgainst: 4, shotsOnGoalAgainst: 31, shotsOnPowerPlayAgainst: 15, saves: 27, savePercentage: 87.1 },
];

const gamePlayerStats: GamePlayerStat[] = [
  { name: 'Jesper Lindgren', number: 5, position: 'LD', line: 1, goals: 0, assists: 2, powerPlayGoals: 0, shotsWide: 1, penaltyMinutes: 0, shotsOnGoal: 2, powerPlayShotsOnGoal: 0, plusMinus: 2, timeOnIce: '18:48', hits: 0, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 0 },
  { name: 'Marcus Nilsson', number: 10, position: 'RW', line: 1, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 1, penaltyMinutes: 0, shotsOnGoal: 2, powerPlayShotsOnGoal: 1, plusMinus: -1, timeOnIce: '17:05', hits: 1, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 0 },
  { name: 'Mathew Maione', number: 28, position: 'RD', line: 1, goals: 0, assists: 1, powerPlayGoals: 0, shotsWide: 1, penaltyMinutes: 0, shotsOnGoal: 2, powerPlayShotsOnGoal: 0, plusMinus: 0, timeOnIce: '26:53', hits: 1, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 0 },
  { name: 'Jacob Olofsson', number: 32, position: 'CE', line: 1, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 1, penaltyMinutes: 0, shotsOnGoal: 1, powerPlayShotsOnGoal: 0, plusMinus: -2, timeOnIce: '18:45', hits: 2, faceoffsWon: 9, faceoffsLost: 14, faceoffPercentage: 39 },
  { name: 'Fredrik Forsberg', number: 56, position: 'LW', line: 1, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 1, penaltyMinutes: 0, shotsOnGoal: 5, powerPlayShotsOnGoal: 0, plusMinus: -1, timeOnIce: '18:22', hits: 0, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 0 },
  { name: 'Axel Ottosson', number: 18, position: 'CE', line: 2, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 1, penaltyMinutes: 0, shotsOnGoal: 0, powerPlayShotsOnGoal: 0, plusMinus: 1, timeOnIce: '17:22', hits: 1, faceoffsWon: 8, faceoffsLost: 6, faceoffPercentage: 57 },
  { name: 'Linus Cronholm', number: 24, position: 'RD', line: 2, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 0, penaltyMinutes: 0, shotsOnGoal: 0, powerPlayShotsOnGoal: 0, plusMinus: 0, timeOnIce: '23:51', hits: 2, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 0 },
  { name: 'Tim Theocharidis', number: 59, position: 'LD', line: 2, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 4, penaltyMinutes: 4, shotsOnGoal: 1, powerPlayShotsOnGoal: 0, plusMinus: 0, timeOnIce: '20:32', hits: 0, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 0 },
  { name: 'Gustav Possler', number: 71, position: 'RW', line: 2, goals: 1, assists: 0, powerPlayGoals: 0, shotsWide: 0, penaltyMinutes: 0, shotsOnGoal: 2, powerPlayShotsOnGoal: 0, plusMinus: 0, timeOnIce: '25:20', hits: 0, faceoffsWon: 1, faceoffsLost: 0, faceoffPercentage: 0 },
  { name: 'Daniel Viksten', number: 86, position: 'LW', line: 2, goals: 0, assists: 1, powerPlayGoals: 0, shotsWide: 0, penaltyMinutes: 2, shotsOnGoal: 2, powerPlayShotsOnGoal: 0, plusMinus: 1, timeOnIce: '18:35', hits: 1, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 100 },
  { name: 'Mattias Nörstebö', number: 15, position: 'RD', line: 3, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 0, penaltyMinutes: 0, shotsOnGoal: 2, powerPlayShotsOnGoal: 0, plusMinus: -1, timeOnIce: '27:17', hits: 1, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 0 },
  { name: 'Felix Girard', number: 26, position: 'CE', line: 3, goals: 1, assists: 0, powerPlayGoals: 0, shotsWide: 0, penaltyMinutes: 0, shotsOnGoal: 1, powerPlayShotsOnGoal: 0, plusMinus: 0, timeOnIce: '13:48', hits: 1, faceoffsWon: 13, faceoffsLost: 7, faceoffPercentage: 65 },
  { name: 'Joel Mustonen', number: 39, position: 'RW', line: 3, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 1, penaltyMinutes: 0, shotsOnGoal: 1, powerPlayShotsOnGoal: 0, plusMinus: 0, timeOnIce: '18:52', hits: 0, faceoffsWon: 1, faceoffsLost: 5, faceoffPercentage: 16 },
  { name: 'Maxime Fortier', number: 41, position: 'LW', line: 3, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 2, penaltyMinutes: 0, shotsOnGoal: 3, powerPlayShotsOnGoal: 0, plusMinus: 0, timeOnIce: '17:51', hits: 0, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 0 },
  { name: 'Matthew Cairns', number: 57, position: 'LD', line: 3, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 1, penaltyMinutes: 2, shotsOnGoal: 1, powerPlayShotsOnGoal: 0, plusMinus: 0, timeOnIce: '20:22', hits: 0, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 0 },
  { name: 'Lucas Lagerberg', number: 8, position: 'LD', line: 4, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 0, penaltyMinutes: 0, shotsOnGoal: 0, powerPlayShotsOnGoal: 0, plusMinus: 0, timeOnIce: '00:00', hits: 0, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 0 },
  { name: 'Bruno Osmanis', number: 21, position: 'LW', line: 4, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 0, penaltyMinutes: 0, shotsOnGoal: 0, powerPlayShotsOnGoal: 0, plusMinus: 0, timeOnIce: '03:50', hits: 0, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 0 },
  { name: 'Erik Andersson', number: 38, position: 'CE', line: 4, goals: 1, assists: 0, powerPlayGoals: 0, shotsWide: 0, penaltyMinutes: 2, shotsOnGoal: 2, powerPlayShotsOnGoal: 0, plusMinus: 1, timeOnIce: '14:07', hits: 1, faceoffsWon: 2, faceoffsLost: 3, faceoffPercentage: 40 },
  { name: 'Martin Fransson', number: 44, position: 'RD', line: 4, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 0, penaltyMinutes: 2, shotsOnGoal: 0, powerPlayShotsOnGoal: 0, plusMinus: 0, timeOnIce: '00:00', hits: 0, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 0 },
  { name: 'Oscar Tellström', number: 91, position: 'RW', line: 4, goals: 0, assists: 0, powerPlayGoals: 0, shotsWide: 0, penaltyMinutes: 2, shotsOnGoal: 1, powerPlayShotsOnGoal: 0, plusMinus: 0, timeOnIce: '15:02', hits: 2, faceoffsWon: 0, faceoffsLost: 0, faceoffPercentage: 0 },
];

const generateSchedule = (): Match[] => {
  const bjorkloven = getTeamById(BJORKLOVEN_ID);
  const otherTeams = teams.filter(t => t.id !== BJORKLOVEN_ID);
  const schedule: Match[] = [];

  const today = new Date();

  // 3 played matches
  for (let i = 0; i < 3; i++) {
    const opponent = otherTeams[i];
    const matchDate = new Date(today);
    matchDate.setDate(today.getDate() - (7 * (i + 1)));
    const isHomeGame = i % 2 === 0;
    const homeScore = Math.floor(Math.random() * 5) + 1;
    const awayScore = Math.floor(Math.random() * 5);
    
    schedule.push({
      id: `match-${i}`,
      homeTeam: isHomeGame ? bjorkloven : opponent,
      awayTeam: isHomeGame ? opponent : bjorkloven,
      homeScore: isHomeGame ? homeScore : awayScore,
      awayScore: isHomeGame ? awayScore : homeScore,
      date: matchDate.toISOString(),
      status: 'played'
    });
  }

  // Attach detailed stats to the most recent played game
  const playedMatches = schedule.filter(m => m.status === 'played').sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  if (playedMatches.length > 0) {
      const lastPlayedMatchId = playedMatches[0].id;
      const matchIndexInSchedule = schedule.findIndex(m => m.id === lastPlayedMatchId);
      if (matchIndexInSchedule !== -1) {
          schedule[matchIndexInSchedule].playerStats = gamePlayerStats;
          schedule[matchIndexInSchedule].goalieStats = gameGoalieStats;
      }
  }


  // 3 upcoming matches
  for (let i = 0; i < 4; i++) {
    const opponent = otherTeams[i+3];
    const matchDate = new Date(today);
    matchDate.setDate(today.getDate() + (7 * (i + 1)));
    const isHomeGame = i % 2 !== 0;

    schedule.push({
      id: `match-${i+3}`,
      homeTeam: isHomeGame ? bjorkloven : opponent,
      awayTeam: isHomeGame ? opponent : bjorkloven,
      homeScore: null,
      awayScore: null,
      date: matchDate.toISOString(),
      status: 'upcoming'
    });
  }

  return schedule.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const generateTable = (schedule: Match[]): TableEntry[] => {
    const tableMap = new Map<string, Omit<TableEntry, 'rank' | 'team'>>();
    
    teams.forEach(team => {
        tableMap.set(team.id, { gamesPlayed: 0, points: 0, goalDifference: 0 });
    });

    schedule.filter(m => m.status === 'played').forEach(match => {
        const homeStats = tableMap.get(match.homeTeam.id)!;
        const awayStats = tableMap.get(match.awayTeam.id)!;

        homeStats.gamesPlayed += 1;
        awayStats.gamesPlayed += 1;
        
        const homeScore = match.homeScore!;
        const awayScore = match.awayScore!;

        homeStats.goalDifference += homeScore - awayScore;
        awayStats.goalDifference += awayScore - homeScore;

        if (homeScore > awayScore) {
            homeStats.points += 3;
        } else {
            awayStats.points += 3; // Simplified: no overtime/shootouts
        }

        tableMap.set(match.homeTeam.id, homeStats);
        tableMap.set(match.awayTeam.id, awayStats);
    });

    const table: Omit<TableEntry, 'rank'>[] = Array.from(tableMap.entries()).map(([teamId, stats]) => ({
        team: getTeamById(teamId),
        ...stats,
    }));

    // Add some random data for teams that didn't play against Björklöven in our small sample
    table.forEach(entry => {
        if(entry.gamesPlayed === 0) {
            entry.gamesPlayed = 3;
            entry.points = Math.floor(Math.random() * 6) + 1;
            entry.goalDifference = Math.floor(Math.random() * 10) - 5;
        }
    });


    return table
        .sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference)
        .map((entry, index) => ({
            ...entry,
            rank: index + 1,
        }));
};

const generatePlayerStats = (): PlayerStat[] => {
  const stats: Omit<PlayerStat, 'points' | 'faceoffPercentage'>[] = [
    { id: 'p1', name: 'Jesper Lindgren', number: 5, position: 'LD', line: 1, gamesPlayed: 3, goals: 0, assists: 2, plusMinus: 2, penaltyMinutes: 0, powerPlayGoals: 0, shotsOnGoal: 2, timeOnIce: '18:48', hits: 0, faceoffsWon: 0, faceoffsLost: 0 },
    { id: 'p2', name: 'Fredric Weigel', number: 8, position: 'C', line: 1, gamesPlayed: 3, goals: 1, assists: 4, plusMinus: 3, penaltyMinutes: 4, powerPlayGoals: 0, shotsOnGoal: 8, timeOnIce: '17:30', hits: 2, faceoffsWon: 25, faceoffsLost: 20 },
    { id: 'p3', name: 'Scott Pooley', number: 10, position: 'RW', line: 1, gamesPlayed: 3, goals: 3, assists: 1, plusMinus: 2, penaltyMinutes: 0, powerPlayGoals: 1, shotsOnGoal: 12, timeOnIce: '16:50', hits: 4, faceoffsWon: 2, faceoffsLost: 3 },
    { id: 'p4', name: 'Nick Schilkey', number: 22, position: 'LW', line: 1, gamesPlayed: 3, goals: 2, assists: 2, plusMinus: 2, penaltyMinutes: 2, powerPlayGoals: 1, shotsOnGoal: 9, timeOnIce: '17:10', hits: 3, faceoffsWon: 5, faceoffsLost: 4 },
    { id: 'p5', name: 'Alexander Deilert', number: 4, position: 'RD', line: 1, gamesPlayed: 3, goals: 1, assists: 2, plusMinus: 1, penaltyMinutes: 6, powerPlayGoals: 0, shotsOnGoal: 5, timeOnIce: '19:02', hits: 5, faceoffsWon: 0, faceoffsLost: 0 },
    { id: 'p6', name: 'Gerry Fitzgerald', number: 19, position: 'C', line: 2, gamesPlayed: 2, goals: 1, assists: 1, plusMinus: 0, penaltyMinutes: 0, powerPlayGoals: 0, shotsOnGoal: 4, timeOnIce: '15:15', hits: 1, faceoffsWon: 15, faceoffsLost: 12 },
    { id: 'p7', name: 'Daniel Rahimi', number: 44, position: 'LD', line: 2, gamesPlayed: 3, goals: 0, assists: 1, plusMinus: -1, penaltyMinutes: 12, powerPlayGoals: 0, shotsOnGoal: 3, timeOnIce: '20:10', hits: 10, faceoffsWon: 0, faceoffsLost: 0 },
    { id: 'p8', name: 'Jacob Olofsson', number: 9, position: 'C', line: 3, gamesPlayed: 3, goals: 1, assists: 0, plusMinus: 1, penaltyMinutes: 2, powerPlayGoals: 0, shotsOnGoal: 6, timeOnIce: '14:00', hits: 2, faceoffsWon: 18, faceoffsLost: 15 },
    { id: 'p9', name: 'Kim Karlsson', number: 28, position: 'RD', line: 2, gamesPlayed: 3, goals: 0, assists: 0, plusMinus: -2, penaltyMinutes: 4, powerPlayGoals: 0, shotsOnGoal: 1, timeOnIce: '18:30', hits: 8, faceoffsWon: 0, faceoffsLost: 0 },
    { id: 'p10', name: 'Alex Hutchings', number: 13, position: 'LW', line: 2, gamesPlayed: 1, goals: 0, assists: 0, plusMinus: 0, penaltyMinutes: 0, powerPlayGoals: 0, shotsOnGoal: 2, timeOnIce: '12:30', hits: 1, faceoffsWon: 1, faceoffsLost: 2 },
    { id: 'p11', name: 'Joona Voutilainen', number: 35, position: 'G', line: null, gamesPlayed: 3, goals: 0, assists: 1, plusMinus: 0, penaltyMinutes: 0, powerPlayGoals: 0, shotsOnGoal: 0, timeOnIce: '60:00', hits: 0, faceoffsWon: 0, faceoffsLost: 0 },
  ];

  const fullStats: PlayerStat[] = stats.map(p => {
    const totalFaceoffs = p.faceoffsWon + p.faceoffsLost;
    return {
      ...p,
      points: p.goals + p.assists,
      faceoffPercentage: totalFaceoffs > 0 ? parseFloat(((p.faceoffsWon / totalFaceoffs) * 100).toFixed(1)) : 0,
    };
  });

  return fullStats.sort((a, b) => b.points - a.points || b.goals - a.goals);
};

const generateNewsFeed = (): NewsArticle[] => {
  const today = new Date();
  const articles = [
    { 
      id: 'n1', 
      title: 'Seger i toppmötet mot Brynäs', 
      summary: 'Björklöven stod för en stark insats och besegrade rivalen Brynäs med 4-2 på hemmaplan efter en tät och spännande match.',
      source: 'Västerbottens-Kuriren',
      publishedDate: new Date(new Date().setDate(today.getDate() - 1)).toISOString()
    },
    { 
      id: 'n2', 
      title: 'Scott Pooley förlänger kontraktet', 
      summary: 'Den amerikanske skarpskytten Scott Pooley har skrivit på för ytterligare två säsonger med Björklöven. "Jag trivs otroligt bra i Umeå och i klubben", säger Pooley.',
      source: 'Bjorkloven.com',
      publishedDate: new Date(new Date().setDate(today.getDate() - 3)).toISOString()
    },
    { 
      id: 'n3', 
      title: 'Inför matchen: Björklöven - AIK', 
      summary: 'Ikväll väntar en ny utmaning då AIK gästar Winpos Arena. Coachen Viktor Stråhle förväntar sig en tuff match mot ett defensivt starkt AIK.',
      source: 'HockeyAllsvenskan.se',
      publishedDate: new Date(new Date().setDate(today.getDate() - 5)).toISOString()
    },
  ];
  return articles;
};

const generateHistoricalData = (): HistoricalSeason[] => {
  return [
    { id: 'h1', season: '2023/2024', finalRank: 3, playoffResult: 'Utslagna i semifinal' },
    { id: 'h2', season: '2022/2023', finalRank: 2, playoffResult: 'Utslagna i kvartsfinal' },
    { id: 'h3', season: '2021/2022', finalRank: 1, playoffResult: 'Förlust i final' },
  ];
};

const calculateTeamStats = (schedule: Match[]): TeamStats => {
  const stats: TeamStats = { wins: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 };
  const playedMatches = schedule.filter(m => m.status === 'played');

  playedMatches.forEach(match => {
    const isHomeGame = match.homeTeam.id === BJORKLOVEN_ID;
    const homeScore = match.homeScore!;
    const awayScore = match.awayScore!;

    if (isHomeGame) {
      stats.goalsFor += homeScore;
      stats.goalsAgainst += awayScore;
      if (homeScore > awayScore) {
        stats.wins++;
      } else {
        stats.losses++;
      }
    } else {
      stats.goalsFor += awayScore;
      stats.goalsAgainst += homeScore;
      if (awayScore > homeScore) {
        stats.wins++;
      } else {
        stats.losses++;
      }
    }
  });

  return stats;
};


export const fetchLeagueData = async (): Promise<LeagueData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const schedule = generateSchedule();
      const playedMatches = schedule.filter(m => m.status === 'played');
      const upcomingMatches = schedule.filter(m => m.status === 'upcoming');
      const table = generateTable(schedule);
      
      const lastMatch = playedMatches.length > 0 ? playedMatches.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] : null;
      const nextMatch = upcomingMatches.length > 0 ? upcomingMatches[0] : null;
      const bjorklovenTableEntry = table.find(entry => entry.team.id === BJORKLOVEN_ID) || null;

      const playerStats = generatePlayerStats();
      const newsFeed = generateNewsFeed();
      const historicalData = generateHistoricalData();
      const teamStats = calculateTeamStats(schedule);

      resolve({
        lastMatch,
        nextMatch,
        schedule,
        table,
        bjorklovenTableEntry,
        playerStats,
        newsFeed,
        historicalData,
        teamStats,
      });
    }, 1500); // Simulate network delay
  });
};