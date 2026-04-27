import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Lead } from '@/types';
import { colors } from '@/theme/colors';
import { RiskBadge } from './RiskBadge';

interface Props {
  lead: Lead;
}

export function LeadCard({ lead }: Props) {
  return (
    <Pressable style={styles.card} onPress={() => router.push(`/client/${lead.id}`)}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{lead.name}</Text>
          <Text style={styles.model}>{lead.carModel} • {lead.region}</Text>
        </View>
        <RiskBadge value={lead.riskLevel} />
      </View>

      <View style={styles.body}>
        <Text style={styles.profile}>{lead.profile}</Text>
        <Text style={styles.text}>Probabilidade: {(lead.probability * 100).toFixed(0)}%</Text>
        <Text style={styles.text}>Último serviço: há {lead.lastServiceMonthsAgo} meses</Text>
        <Text style={styles.action}>{lead.recommendedAction}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  body: {
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  model: {
    fontSize: 13,
    color: colors.subtext,
    marginTop: 2,
  },
  profile: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  text: {
    fontSize: 13,
    color: colors.subtext,
  },
  action: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
});
