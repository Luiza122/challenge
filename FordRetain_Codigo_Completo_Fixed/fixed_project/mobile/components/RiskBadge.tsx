import { StyleSheet, Text, View } from 'react-native';
import { RiskLevel } from '@/types';
import { colors } from '@/theme/colors';

interface Props {
  value: RiskLevel;
}

export function RiskBadge({ value }: Props) {
  const appearance = {
    baixo: { bg: '#E8F7EF', color: colors.success, label: 'Baixo' },
    medio: { bg: '#FFF4E5', color: colors.warning, label: 'Médio' },
    alto: { bg: '#FDECEC', color: colors.danger, label: 'Alto' },
  }[value];

  return (
    <View style={[styles.badge, { backgroundColor: appearance.bg }]}>
      <Text style={[styles.text, { color: appearance.color }]}>{appearance.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '800',
  },
});
