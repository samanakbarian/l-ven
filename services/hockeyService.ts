
import type { Team, Match, TableEntry, LeagueData, PlayerStat, NewsArticle, HistoricalSeason, TeamStats } from '../types';

const BJORKLOVEN_ID = 'bjorkloven';

const teams: Team[] = [
  { id: 'bjorkloven', name: 'IF Björklöven', logoUrl: 'https://www.bjorkloven.com/images/bjorkloven/logo-bjorkloven-350x350.svg' },
  { id: 'aik', name: 'AIK', logoUrl: 'https://www.aikhockey.se/images/aik-hockey/logo-aik-hockey-350x350.svg' },
  { id: 'brynas', name: 'Brynäs IF', logoUrl: 'https://www.brynas.se/images/brynas/logo-brynas-if-350x350.svg' },
  { id: 'djurgarden', name: 'Djurgårdens IF', logoUrl: 'https://www.difhockey.se/images/djurgardens-if/logo-djurgardens-if-hockey-350x350.svg' },
  { id: 'sodertalje', name: 'Södertälje SK', logoUrl: 'https://www.sodertaljesk.se/images/sodertalje-sk/logo-sodertalje-sk-350x350.svg' },
  { id: 'karlskoga', name: 'BIK Karlskoga', logoUrl: 'https://www.bikkarlskoga.se/images/bik-karlskoga/logo-bik-karlskoga-350x350.svg' },
  { id: 'vasteras', name: 'Västerås IK', logoUrl: 'https://www.vik.se/images/vasteras-ik/logo-vasteras-ik-350x350.svg' },
  { id: 'mora', name: 'Mora IK', logoUrl: 'https://www.moraik.se/images/mora-ik/logo-mora-ik-350x350.svg' },
];

const getTeamById = (id: string): Team => teams.find(t => t.id === id)!;

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
  // FIX: Explicitly typing the array as PlayerStat[] ensures the `position`
  // property is correctly typed as 'G' | 'D' | 'F' instead of the wider `string` type.
  const stats: PlayerStat[] = [
    { id: 'p5', name: 'Fredric Weigel', number: 8, position: 'F', gamesPlayed: 3, goals: 1, assists: 4, points: 5 },
    { id: 'p4', name: 'Scott Pooley', number: 10, position: 'F', gamesPlayed: 3, goals: 3, assists: 1, points: 4 },
    { id: 'p6', name: 'Nick Schilkey', number: 22, position: 'F', gamesPlayed: 3, goals: 2, assists: 2, points: 4 },
    { id: 'p2', name: 'Alexander Deilert', number: 4, position: 'D', gamesPlayed: 3, goals: 1, assists: 2, points: 3 },
    { id: 'p7', name: 'Gerry Fitzgerald', number: 19, position: 'F', gamesPlayed: 2, goals: 1, assists: 1, points: 2 },
    { id: 'p1', name: 'Joona Voutilainen', number: 35, position: 'G', gamesPlayed: 3, goals: 0, assists: 1, points: 1 },
    { id: 'p3', name: 'Daniel Rahimi', number: 44, position: 'D', gamesPlayed: 3, goals: 0, assists: 1, points: 1 },
    { id: 'p9', name: 'Jacob Olofsson', number: 9, position: 'F', gamesPlayed: 3, goals: 1, assists: 0, points: 1 },
    { id: 'p8', name: 'Kim Karlsson', number: 28, position: 'D', gamesPlayed: 3, goals: 0, assists: 0, points: 0 },
    { id: 'p10', name: 'Alex Hutchings', number: 13, position: 'F', gamesPlayed: 1, goals: 0, assists: 0, points: 0 },
  ];
  return stats.sort((a, b) => b.points - a.points || b.goals - a.goals);
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
      
      const lastMatch = playedMatches.length > 0 ? playedMatches[playedMatches.length - 1] : null;
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