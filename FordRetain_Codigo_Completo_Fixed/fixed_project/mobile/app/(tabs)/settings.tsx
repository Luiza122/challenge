import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { PageHeader } from '@/components/PageHeader';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionCard } from '@/components/SectionCard';
import { sendTestNotification } from '@/services/notifications';
import { defaultSettings, getAppSettings, resetAppSettings, saveAppSettings } from '@/services/storage';
import { AppSettings } from '@/types';
import { colors } from '@/theme/colors';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    getAppSettings().then(setSettings);
  }, []);

  async function updateSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    const next = { ...settings, [key]: value };
    setSettings(next);
    await saveAppSettings(next);
    setFeedback('Configurações salvas com sucesso.');
  }

  async function handleTestNotification() {
    const result = await sendTestNotification();
    setFeedback(result ? 'Notificação enviada para o dispositivo.' : 'Permissão de notificação não concedida.');
  }

  async function handleReset() {
    const next = await resetAppSettings();
    setSettings(next);
    setFeedback('Configurações restauradas para o padrão.');
  }

  return (
    <ScreenContainer>
      <PageHeader
        title="Configurações"
        subtitle="Agora esta tela salva preferências reais do app e permite testar notificações locais."
      />

      <SectionCard title="Preferências do aplicativo">
        <View style={styles.row}>
          <View style={styles.copyBlock}>
            <Text style={styles.itemTitle}>Usar API real</Text>
            <Text style={styles.itemText}>Quando ativa, o app tenta consumir o backend Node.js. Se a API estiver offline, ele usa mock local como fallback.</Text>
          </View>
          <Switch value={settings.useRealApi} onValueChange={(value) => updateSetting('useRealApi', value)} trackColor={{ false: '#CBD5E1', true: '#BBD0FF' }} thumbColor={settings.useRealApi ? colors.primary : '#FFFFFF'} />
        </View>

        <View style={styles.row}>
          <View style={styles.copyBlock}>
            <Text style={styles.itemTitle}>Notificações locais</Text>
            <Text style={styles.itemText}>Ativa alertas locais para leads prioritários e testes pelo próprio aplicativo.</Text>
          </View>
          <Switch value={settings.notificationsEnabled} onValueChange={(value) => updateSetting('notificationsEnabled', value)} trackColor={{ false: '#CBD5E1', true: '#BBD0FF' }} thumbColor={settings.notificationsEnabled ? colors.primary : '#FFFFFF'} />
        </View>
      </SectionCard>

      <SectionCard title="Perfis de acesso">
        <Text style={styles.itemTitle}>Gerente</Text>
        <Text style={styles.itemText}>Visualiza todos os dashboards, leads e detalhes completos dos clientes.</Text>
        <Text style={styles.itemTitle}>Atendente</Text>
        <Text style={styles.itemText}>Visualiza somente sua carteira e ações atribuídas.</Text>
      </SectionCard>

      <SectionCard title="Diferenciais implementados no projeto">
        <Text style={styles.itemText}>• AsyncStorage implementado de verdade para salvar preferências.</Text>
        <Text style={styles.itemText}>• Integração com API real ativa por padrão, com fallback automático para mock.</Text>
        <Text style={styles.itemText}>• Notificações locais com teste direto pelo aplicativo.</Text>
        <Text style={styles.itemText}>• Estrutura separada entre telas, componentes, serviços e backend.</Text>
      </SectionCard>

      <Pressable style={styles.primaryButton} onPress={handleTestNotification}>
        <Text style={styles.primaryButtonText}>Testar notificação</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={handleReset}>
        <Text style={styles.secondaryButtonText}>Restaurar padrão</Text>
      </Pressable>

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  copyBlock: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.subtext,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
  feedback: {
    marginTop: 10,
    color: colors.subtext,
    fontSize: 13,
  },
});
