import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings } from '@/types';

const SETTINGS_KEY = 'fordretain_settings';

export const defaultSettings: AppSettings = {
  useRealApi: true,
  notificationsEnabled: true,
};

export async function getAppSettings(): Promise<AppSettings> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSettings;

    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    return {
      useRealApi: parsed.useRealApi ?? defaultSettings.useRealApi,
      notificationsEnabled: parsed.notificationsEnabled ?? defaultSettings.notificationsEnabled,
    };
  } catch {
    return defaultSettings;
  }
}

export async function saveAppSettings(settings: AppSettings): Promise<void> {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function resetAppSettings(): Promise<AppSettings> {
  await AsyncStorage.removeItem(SETTINGS_KEY);
  return defaultSettings;
}
