import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

interface Props {
  label: string;
  value: string;
  helper: string;
}

export function StatCard({ label, value, helper }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.helper}>{helper}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
    width: '48%',
  },
  label: {
    fontSize: 13,
    color: colors.subtext,
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  helper: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
});
