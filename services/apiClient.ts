import type { LeagueData, Match, PlayerStat } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || '';

const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
};

export const getLeagueData = async (): Promise<LeagueData> => {
  const res = await fetch(`${API_BASE_URL}/league`);
  return handleResponse<LeagueData>(res);
};

export const getSchedule = async (): Promise<Match[]> => {
  const res = await fetch(`${API_BASE_URL}/schedule`);
  return handleResponse<Match[]>(res);
};

export const getPlayerStats = async (): Promise<PlayerStat[]> => {
  const res = await fetch(`${API_BASE_URL}/player-stats`);
  return handleResponse<PlayerStat[]>(res);
};

