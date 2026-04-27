import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PageHeader } from '@/components/PageHeader';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionCard } from '@/components/SectionCard';
import { SimpleBar } from '@/components/SimpleBar';
import { StatCard } from '@/components/StatCard';
import { getDashboard } from '@/services/api';
import { sendHighRiskNotification } from '@/services/notifications';
import { getAppSettings } from '@/services/storage';
import { DashboardResponse } from '@/types';
import { colors } from '@/theme/colors';

export default function DashboardScreen() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [notificationText, setNotificationText] = useState('');

  const loadData = useCallback(async () => {
    setError('');
    try {
      const response = await getDashboard();
      setData(response);
    } catch {
      setError('Não foi possível carregar o dashboard.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const highRiskCount = useMemo(() => {
    if (!data) return 0;
    const item = data.metrics.find((metric) => metric.label === 'Clientes em Risco');
    if (!item) return 0;
    const match = item.value.match(/\d+/);
    return match ? Number(match[0]) : 0;
  }, [data]);

  const handleHighRiskNotification = useCallback(async () => {
    const settings = await getAppSettings();
    if (!settings.notificationsEnabled) {
      setNotificationText('Ative as notificações na aba de configurações para usar esse recurso.');
      return;
    }

    const sent = await sendHighRiskNotification(highRiskCount);
    setNotificationText(sent ? 'Notificação enviada no dispositivo.' : 'Não foi possível enviar a notificação.');
  }, [highRiskCount]);

  if (loading && !data) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <PageHeader
        title="Dashboard FordRetain"
        subtitle="Acompanhe o VIN Share, o volume de clientes em risco e os perfis com maior chance de evasão."
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.grid}>
        {data?.metrics.map((metric) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} helper={metric.helper} />
        ))}
      </View>

      <Pressable style={styles.notifyButton} onPress={handleHighRiskNotification}>
        <Text style={styles.notifyButtonText}>Notificar leads prioritários</Text>
      </Pressable>
      {notificationText ? <Text style={styles.feedback}>{notificationText}</Text> : null}

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadData(); }} />}
        showsVerticalScrollIndicator={false}
      >
        <SectionCard title="VIN Share por região">
          {data?.regionMetrics.map((item) => (
            <SimpleBar key={item.region} label={item.region} value={item.vinShare} />
          ))}
        </SectionCard>

        <SectionCard title="VIN Share por modelo">
          {data?.modelMetrics.map((item) => (
            <SimpleBar key={item.model} label={item.model} value={item.vinShare} />
          ))}
        </SectionCard>

        <SectionCard title="Distribuição de perfis">
          {data?.riskDistribution.map((item) => (
            <View key={item.profile} style={styles.distributionRow}>
              <Text style={styles.distributionLabel}>{item.profile}</Text>
              <Text style={styles.distributionValue}>{item.clients} clientes</Text>
            </View>
          ))}
        </SectionCard>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  distributionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  distributionLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  distributionValue: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '800',
  },
  notifyButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  notifyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  feedback: {
    color: colors.subtext,
    fontSize: 13,
    marginBottom: 8,
  },
  error: {
    color: '#B91C1C',
    fontSize: 14,
    marginBottom: 8,
  },
});
