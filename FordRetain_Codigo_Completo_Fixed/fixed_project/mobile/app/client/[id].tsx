import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { PageHeader } from '@/components/PageHeader';
import { RiskBadge } from '@/components/RiskBadge';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionCard } from '@/components/SectionCard';
import { getClientDetail } from '@/services/api';
import { ClientDetail } from '@/types';
import { colors } from '@/theme/colors';

export default function ClientDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const [client, setClient] = useState<ClientDetail | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    getClientDetail(params.id)
      .then(setClient)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  if (!client) {
    return (
      <ScreenContainer>
        <Text style={styles.empty}>Cliente não encontrado.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <PageHeader title={client.name} subtitle={`${client.carModel} • ${client.region} • contato preferencial: ${client.channel}`} />

      <SectionCard title="Resumo do cliente">
        <RiskBadge value={client.riskLevel} />
        <Text style={styles.text}>Perfil previsto: {client.profile}</Text>
        <Text style={styles.text}>Probabilidade: {(client.probability * 100).toFixed(0)}%</Text>
        <Text style={styles.text}>Idade: {client.age} anos</Text>
        <Text style={styles.text}>Forma de pagamento: {client.paymentType}</Text>
        <Text style={styles.text}>Canal de compra: {client.purchaseChannel}</Text>
        <Text style={styles.text}>Histórico com a marca: {client.brandHistory}</Text>
      </SectionCard>

      <SectionCard title="Ação recomendada">
        <Text style={styles.action}>{client.recommendedAction}</Text>
        <Text style={styles.text}>Último serviço realizado há {client.lastServiceMonthsAgo} meses.</Text>
        <Text style={styles.text}>Telefone: {client.phone}</Text>
      </SectionCard>

      <SectionCard title="Observações do histórico">
        {client.notes.map((note) => (
          <View key={note} style={styles.noteBox}>
            <Text style={styles.noteText}>{note}</Text>
          </View>
        ))}
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },
  action: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.primary,
    fontWeight: '800',
  },
  noteBox: {
    backgroundColor: colors.primarySoft,
    borderRadius: 14,
    padding: 12,
  },
  noteText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  empty: {
    fontSize: 15,
    color: colors.subtext,
  },
});
