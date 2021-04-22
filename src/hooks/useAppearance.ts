import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

const primary = '#24b467';

const lightTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary,
  },
};

const darkTheme: Theme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary,
  },
};

export const useAppearance = () => {
  const scheme = useColorScheme();

  const isDark = useMemo(() => scheme === 'dark', []);

  const activeMode = useMemo(() => (isDark ? darkTheme : lightTheme), []);

  return { activeMode, isDark };
};
