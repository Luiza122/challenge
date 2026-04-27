import { Platform } from 'react-native';
import { clientDetails, dashboardData, leads, simulatePrediction } from '@/data/mockData';
import { ClientDetail, DashboardResponse, Lead, PredictionRequest, PredictionResponse } from '@/types';
import { getAppSettings } from '@/services/storage';

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const DEFAULT_API_URL = Platform.select({
  android: 'http://10.0.2.2:3001',
  ios: 'http://localhost:3001',
  web: 'http://localhost:3001',
  default: 'http://localhost:3001',
});
const API_URL = EXPO_PUBLIC_API_URL || DEFAULT_API_URL;

function wait<T>(value: T, delay = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

async function shouldUseRealApi(): Promise<boolean> {
  const settings = await getAppSettings();
  return settings.useRealApi;
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init);
  if (!response.ok) {
    throw new Error(`Falha na API: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function getDashboard(): Promise<DashboardResponse> {
  if (await shouldUseRealApi()) {
    try {
      return await fetchJson<DashboardResponse>('/dashboard');
    } catch {
      return wait(dashboardData);
    }
  }
  return wait(dashboardData);
}

export async function getLeads(): Promise<Lead[]> {
  if (await shouldUseRealApi()) {
    try {
      return await fetchJson<Lead[]>('/leads');
    } catch {
      return wait(leads);
    }
  }
  return wait(leads);
}

export async function getClientDetail(id: string): Promise<ClientDetail | undefined> {
  if (await shouldUseRealApi()) {
    try {
      return await fetchJson<ClientDetail>(`/client/${id}`);
    } catch {
      return wait(clientDetails.find((item) => item.id === id));
    }
  }
  return wait(clientDetails.find((item) => item.id === id));
}

export async function predictProfile(payload: PredictionRequest): Promise<PredictionResponse> {
  if (await shouldUseRealApi()) {
    try {
      return await fetchJson<PredictionResponse>('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      return wait(simulatePrediction(payload), 600);
    }
  }
  return wait(simulatePrediction(payload), 600);
}
