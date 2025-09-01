import type { LeagueData, Match, PlayerStat } from '../types';
import { mockLeagueData } from './mocks/leagueData';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || '';

const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
};

export const getLeagueData = async (): Promise<LeagueData> => {
  // For local development, use mock data
  if (!API_BASE_URL) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLeagueData;
  }

  // For production, use real API
  const res = await fetch(`${API_BASE_URL}/league`);
  return handleResponse<LeagueData>(res);
};

export const getSchedule = async (): Promise<Match[]> => {
  // For local development, use mock data
  if (!API_BASE_URL) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLeagueData.schedule;
  }

  // For production, use real API
  const res = await fetch(`${API_BASE_URL}/schedule`);
  return handleResponse<Match[]>(res);
};

export const getPlayerStats = async (): Promise<PlayerStat[]> => {
  // For local development, use mock data
  if (!API_BASE_URL) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLeagueData.playerStats;
  }

  // For production, use real API
  const res = await fetch(`${API_BASE_URL}/player-stats`);
  return handleResponse<PlayerStat[]>(res);
};

