import { ClientDetail, DashboardResponse, Lead, PredictionResponse, PredictionRequest } from '@/types';

export const dashboardData: DashboardResponse = {
  metrics: [
    { label: 'VIN Share Geral', value: '64%', helper: '+4 pts no último trimestre' },
    { label: 'Clientes em Risco', value: '128', helper: '37 em prioridade alta' },
    { label: 'Leads Ativos', value: '92', helper: '18 contatos feitos hoje' },
    { label: 'Agendamentos Gerados', value: '41', helper: 'Conversão de 32%' },
  ],
  regionMetrics: [
    { region: 'Sudeste', vinShare: 69 },
    { region: 'Sul', vinShare: 66 },
    { region: 'Centro-Oeste', vinShare: 61 },
    { region: 'Nordeste', vinShare: 58 },
    { region: 'Norte', vinShare: 54 },
  ],
  modelMetrics: [
    { model: 'Ranger', vinShare: 72 },
    { model: 'Territory', vinShare: 67 },
    { model: 'Bronco', vinShare: 64 },
    { model: 'Transit', vinShare: 59 },
    { model: 'Maverick', vinShare: 62 },
  ],
  riskDistribution: [
    { profile: 'Cliente Fiel', clients: 84 },
    { profile: 'Cliente Econômico', clients: 53 },
    { profile: 'Cliente Esquecido', clients: 47 },
    { profile: 'Cliente de Abandono', clients: 28 },
  ],
};

export const leads: Lead[] = [
  {
    id: '1',
    name: 'Carlos Henrique',
    region: 'Sudeste',
    carModel: 'Ranger',
    profile: 'Cliente Econômico',
    riskLevel: 'alto',
    probability: 0.84,
    recommendedAction: 'Enviar cupom de revisão com validade de 7 dias.',
    lastServiceMonthsAgo: 9,
    phone: '(11) 98888-1111',
    channel: 'WhatsApp',
  },
  {
    id: '2',
    name: 'Juliana Costa',
    region: 'Sul',
    carModel: 'Territory',
    profile: 'Cliente Esquecido',
    riskLevel: 'alto',
    probability: 0.79,
    recommendedAction: 'Lembrete com link direto para agendamento.',
    lastServiceMonthsAgo: 8,
    phone: '(41) 97777-2222',
    channel: 'Push',
  },
  {
    id: '3',
    name: 'Marcos Silva',
    region: 'Nordeste',
    carModel: 'Transit',
    profile: 'Cliente de Abandono',
    riskLevel: 'alto',
    probability: 0.88,
    recommendedAction: 'Oferta de pacote de revisões com benefício exclusivo.',
    lastServiceMonthsAgo: 12,
    phone: '(81) 96666-3333',
    channel: 'Ligação',
  },
  {
    id: '4',
    name: 'Fernanda Rocha',
    region: 'Centro-Oeste',
    carModel: 'Bronco',
    profile: 'Cliente Fiel',
    riskLevel: 'baixo',
    probability: 0.77,
    recommendedAction: 'Programa de fidelidade e oferta de check-up gratuito.',
    lastServiceMonthsAgo: 4,
    phone: '(62) 95555-4444',
    channel: 'E-mail',
  },
  {
    id: '5',
    name: 'Ricardo Almeida',
    region: 'Sudeste',
    carModel: 'Maverick',
    profile: 'Cliente Esquecido',
    riskLevel: 'medio',
    probability: 0.68,
    recommendedAction: 'Enviar lembrete antes da próxima revisão.',
    lastServiceMonthsAgo: 6,
    phone: '(19) 94444-5555',
    channel: 'WhatsApp',
  },
];

export const clientDetails: ClientDetail[] = leads.map((lead, index) => ({
  ...lead,
  age: [34, 41, 52, 29, 38][index],
  purchaseChannel: ['Concessionária', 'Site Ford', 'Concessionária', 'Marketplace', 'Concessionária'][index],
  paymentType: ['Financiamento', 'À vista', 'Assinatura', 'Financiamento', 'Consórcio'][index],
  brandHistory: ['Já teve outro Ford', 'Primeiro veículo Ford', 'Cliente frotista', 'Já teve outro Ford', 'Primeiro veículo Ford'][index],
  notes: [
    'Último serviço foi troca de óleo e alinhamento.',
    'Cliente demonstrou interesse em agendamento digital.',
    'Possui histórico de atraso em revisões programadas.',
  ],
}));

export function simulatePrediction(payload: PredictionRequest): PredictionResponse {
  const region = payload.region.toLowerCase();
  const channel = payload.purchaseChannel.toLowerCase();
  const payment = payload.paymentType.toLowerCase();
  const age = Number(payload.age || 0);

  let predictedProfile: PredictionResponse['predictedProfile'] = 'Cliente Econômico';
  let riskLevel: PredictionResponse['riskLevel'] = 'medio';
  let probability = 0.71;
  let recommendedAction = 'Oferecer campanha de revisão com valor promocional.';

  if (channel.includes('concession') && age >= 30 && payment.includes('fin')) {
    predictedProfile = 'Cliente Fiel';
    riskLevel = 'baixo';
    probability = 0.76;
    recommendedAction = 'Inserir cliente em programa de relacionamento e manutenção preventiva.';
  }

  if (region.includes('nord') || region.includes('norte')) {
    predictedProfile = 'Cliente Esquecido';
    riskLevel = 'alto';
    probability = 0.81;
    recommendedAction = 'Enviar lembrete com agendamento facilitado e contato humanizado.';
  }

  if (payment.includes('vista') && channel.includes('site')) {
    predictedProfile = 'Cliente de Abandono';
    riskLevel = 'alto';
    probability = 0.85;
    recommendedAction = 'Criar oferta de retorno com pacote de serviços e contato ativo.';
  }

  return {
    predictedProfile,
    riskLevel,
    probability,
    recommendedAction,
    probabilities: [
      { profile: 'Cliente Fiel', value: predictedProfile === 'Cliente Fiel' ? probability : 0.24 },
      { profile: 'Cliente Econômico', value: predictedProfile === 'Cliente Econômico' ? probability : 0.33 },
      { profile: 'Cliente Esquecido', value: predictedProfile === 'Cliente Esquecido' ? probability : 0.27 },
      { profile: 'Cliente de Abandono', value: predictedProfile === 'Cliente de Abandono' ? probability : 0.19 },
    ],
  };
}
