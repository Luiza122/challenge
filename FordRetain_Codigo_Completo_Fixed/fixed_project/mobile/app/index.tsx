import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors } from '@/theme/colors';

export default function WelcomeScreen() {
  return (
    <ScreenContainer scroll={false}>
      <View style={styles.wrapper}>
        <View style={styles.hero}>
          <Text style={styles.brand}>FordRetain</Text>
          <Text style={styles.title}>Plataforma de retenção preditiva para o pós-venda Ford</Text>
          <Text style={styles.subtitle}>
            App mobile com dashboard, leads em risco, simulação de perfil e ações recomendadas para aumentar o VIN Share.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>O que o app entrega</Text>
          <Text style={styles.cardText}>• Dashboard com VIN Share por região e modelo</Text>
          <Text style={styles.cardText}>• Leads priorizados por risco</Text>
          <Text style={styles.cardText}>• Tela de detalhe com ação sugerida</Text>
          <Text style={styles.cardText}>• Simulação de previsão com IA</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/dashboard')}>
          <Text style={styles.buttonText}>Entrar no aplicativo</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    padding: 24,
    gap: 12,
  },
  brand: {
    color: '#DCE7FF',
    fontSize: 15,
    fontWeight: '700',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '800',
  },
  subtitle: {
    color: '#E5EFFF',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  cardText: {
    fontSize: 14,
    color: colors.subtext,
    lineHeight: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
