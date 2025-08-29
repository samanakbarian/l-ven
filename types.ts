
export interface Team {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  status: 'played' | 'upcoming';
}

export interface TableEntry {
  rank: number;
  team: Team;
  gamesPlayed: number;
  points: number;
  goalDifference: number;
}

export interface PlayerStat {
  id: string;
  name: string;
  number: number;
  position: 'G' | 'LD' | 'RD' | 'C' | 'LW' | 'RW';
  line: number | null;
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  penaltyMinutes: number;
  powerPlayGoals: number;
  shotsOnGoal: number;
  timeOnIce: string; // "MM:SS"
  hits: number;
  faceoffsWon: number;
  faceoffsLost: number;
  faceoffPercentage: number;
}


export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedDate: string;
}

export interface HistoricalSeason {
  id: string;
  season: string; // e.g., "2022/2023"
  finalRank: number;
  playoffResult: string;
}

export interface TeamStats {
  wins: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface LeagueData {
  lastMatch: Match | null;
  nextMatch: Match | null;
  schedule: Match[];
  table: TableEntry[];
  bjorklovenTableEntry: TableEntry | null;
  playerStats: PlayerStat[];
  newsFeed: NewsArticle[];
  historicalData: HistoricalSeason[];
  teamStats: TeamStats;
}

export enum View {
  Dashboard = 'DASHBOARD',
  Table = 'TABLE',
  Schedule = 'SCHEDULE',
  PlayerStats = 'PLAYER_STATS',
  News = 'NEWS',
  History = 'HISTORY',
  VisualStats = 'VISUAL_STATS',
}