export type RiskLevel = 'baixo' | 'medio' | 'alto';
export type CustomerProfile = 'Cliente Fiel' | 'Cliente de Abandono' | 'Cliente Esquecido' | 'Cliente Econômico';

export interface DashboardMetric {
  label: string;
  value: string;
  helper: string;
}

export interface RegionMetric {
  region: string;
  vinShare: number;
}

export interface VehicleModelMetric {
  model: string;
  vinShare: number;
}

export interface Lead {
  id: string;
  name: string;
  region: string;
  carModel: string;
  profile: CustomerProfile;
  riskLevel: RiskLevel;
  probability: number;
  recommendedAction: string;
  lastServiceMonthsAgo: number;
  phone: string;
  channel: string;
}

export interface ClientDetail extends Lead {
  age: number;
  purchaseChannel: string;
  paymentType: string;
  brandHistory: string;
  notes: string[];
}

export interface PredictionRequest {
  age: string;
  region: string;
  carModel: string;
  paymentType: string;
  purchaseChannel: string;
  brandHistory: string;
}

export interface PredictionResponse {
  predictedProfile: CustomerProfile;
  riskLevel: RiskLevel;
  probability: number;
  recommendedAction: string;
  probabilities: {
    profile: CustomerProfile;
    value: number;
  }[];
}

export interface DashboardResponse {
  metrics: DashboardMetric[];
  regionMetrics: RegionMetric[];
  modelMetrics: VehicleModelMetric[];
  riskDistribution: {
    profile: CustomerProfile;
    clients: number;
  }[];
}

export interface AppSettings {
  useRealApi: boolean;
  notificationsEnabled: boolean;
}
