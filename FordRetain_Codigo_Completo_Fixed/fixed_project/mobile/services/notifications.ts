import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function configureNotifications(): Promise<void> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('fordretain-alertas', {
      name: 'FordRetain Alertas',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;

  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

export async function sendTestNotification(): Promise<boolean> {
  const granted = await requestNotificationPermission();
  if (!granted) return false;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'FordRetain',
      body: 'Teste de notificação concluído com sucesso.',
    },
    trigger: null,
  });

  return true;
}

export async function sendHighRiskNotification(totalHighRisk: number): Promise<boolean> {
  if (totalHighRisk <= 0) return false;

  const granted = await requestNotificationPermission();
  if (!granted) return false;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Leads prioritários identificados',
      body: `Existem ${totalHighRisk} clientes com risco alto aguardando ação.`,
    },
    trigger: null,
  });

  return true;
}
