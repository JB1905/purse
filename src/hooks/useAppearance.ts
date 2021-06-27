import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { useColorScheme, Appearance } from 'react-native';

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
  const colorScheme = useColorScheme();

  // TODO update - duplicated colorScheme === 'dark' - create util for it
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) =>
      setIsDark(colorScheme === 'dark')
    );
  }, []);

  // TODO add missing values to dependecy array
  const activeMode = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return { activeMode, isDark };
};
