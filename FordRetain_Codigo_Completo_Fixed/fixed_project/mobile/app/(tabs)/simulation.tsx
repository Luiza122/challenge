import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { FormField } from '@/components/FormField';
import { PageHeader } from '@/components/PageHeader';
import { RiskBadge } from '@/components/RiskBadge';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionCard } from '@/components/SectionCard';
import { predictProfile } from '@/services/api';
import { PredictionRequest, PredictionResponse } from '@/types';
import { colors } from '@/theme/colors';

const initialState: PredictionRequest = {
  age: '',
  region: '',
  carModel: '',
  paymentType: '',
  purchaseChannel: '',
  brandHistory: '',
};

export default function SimulationScreen() {
  const [form, setForm] = useState<PredictionRequest>(initialState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  async function handlePredict() {
    setLoading(true);
    try {
      const prediction = await predictProfile(form);
      setResult(prediction);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <PageHeader
        title="Simular previsão"
        subtitle="Preencha dados disponíveis no momento da compra para prever o perfil do cliente e a ação sugerida."
      />

      <SectionCard title="Dados de entrada">
        <FormField label="Idade" value={form.age} onChangeText={(text) => setForm((prev) => ({ ...prev, age: text }))} placeholder="Ex.: 34" />
        <FormField label="Região" value={form.region} onChangeText={(text) => setForm((prev) => ({ ...prev, region: text }))} placeholder="Ex.: Sudeste" />
        <FormField label="Modelo do veículo" value={form.carModel} onChangeText={(text) => setForm((prev) => ({ ...prev, carModel: text }))} placeholder="Ex.: Ranger" />
        <FormField label="Forma de pagamento" value={form.paymentType} onChangeText={(text) => setForm((prev) => ({ ...prev, paymentType: text }))} placeholder="Ex.: Financiamento" />
        <FormField label="Canal de compra" value={form.purchaseChannel} onChangeText={(text) => setForm((prev) => ({ ...prev, purchaseChannel: text }))} placeholder="Ex.: Concessionária" />
        <FormField label="Histórico com a marca" value={form.brandHistory} onChangeText={(text) => setForm((prev) => ({ ...prev, brandHistory: text }))} placeholder="Ex.: Já teve outro Ford" />

        <Pressable style={styles.button} onPress={handlePredict}>
          <Text style={styles.buttonText}>Gerar previsão</Text>
        </Pressable>
      </SectionCard>

      {loading && <ActivityIndicator size="large" color={colors.primary} />}

      {result && (
        <SectionCard title="Resultado da predição">
          <Text style={styles.resultTitle}>{result.predictedProfile}</Text>
          <RiskBadge value={result.riskLevel} />
          <Text style={styles.resultText}>Probabilidade principal: {(result.probability * 100).toFixed(0)}%</Text>
          <Text style={styles.resultText}>Ação recomendada: {result.recommendedAction}</Text>

          <View style={{ gap: 10, marginTop: 8 }}>
            {result.probabilities.map((item) => (
              <View key={item.profile} style={styles.probabilityRow}>
                <Text style={styles.probabilityLabel}>{item.profile}</Text>
                <Text style={styles.probabilityValue}>{(item.value * 100).toFixed(0)}%</Text>
              </View>
            ))}
          </View>
        </SectionCard>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  resultText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  probabilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 8,
  },
  probabilityLabel: {
    fontSize: 14,
    color: colors.text,
  },
  probabilityValue: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '800',
  },
});
