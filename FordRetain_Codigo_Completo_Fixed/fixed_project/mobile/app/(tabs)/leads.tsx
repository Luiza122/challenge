import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LeadCard } from '@/components/LeadCard';
import { PageHeader } from '@/components/PageHeader';
import { ScreenContainer } from '@/components/ScreenContainer';
import { getLeads } from '@/services/api';
import { Lead } from '@/types';
import { colors } from '@/theme/colors';

const filters = ['Todos', 'Alto', 'Médio', 'Baixo'] as const;

export default function LeadsScreen() {
  const [items, setItems] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<(typeof filters)[number]>('Todos');
  const [error, setError] = useState('');

  const loadItems = useCallback(async () => {
    setError('');
    try {
      const response = await getLeads();
      setItems(response);
    } catch {
      setError('Não foi possível carregar os leads.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const filtered = useMemo(() => {
    if (selectedFilter === 'Todos') return items;
    if (selectedFilter === 'Alto') return items.filter((item) => item.riskLevel === 'alto');
    if (selectedFilter === 'Médio') return items.filter((item) => item.riskLevel === 'medio');
    return items.filter((item) => item.riskLevel === 'baixo');
  }, [items, selectedFilter]);

  return (
    <ScreenContainer>
      <PageHeader
        title="Leads em risco"
        subtitle="Veja os clientes priorizados por chance de evasão e abra o detalhe para consultar a ação recomendada."
      />

      <View style={styles.filterRow}>
        {filters.map((filter) => {
          const active = filter === selectedFilter;
          return (
            <Pressable key={filter} onPress={() => setSelectedFilter(filter)} style={[styles.chip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{filter}</Text>
            </Pressable>
          );
        })}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadItems(); }} />}
          contentContainerStyle={{ gap: 12, paddingBottom: 12 }}
          showsVerticalScrollIndicator={false}
        >
          {filtered.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
          {filtered.length === 0 && <Text style={styles.empty}>Nenhum lead encontrado nesse filtro.</Text>}
        </ScrollView>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  empty: {
    color: colors.subtext,
    fontSize: 14,
  },
  error: {
    color: '#B91C1C',
    fontSize: 14,
    marginBottom: 8,
  },
});
