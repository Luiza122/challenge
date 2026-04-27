import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

interface Props {
  label: string;
  value: number;
  suffix?: string;
}

export function SimpleBar({ label, value, suffix = '%' }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}{suffix}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.min(Math.max(value, 0), 100)}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  value: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '800',
  },
  track: {
    height: 10,
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
});
