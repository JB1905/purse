import { useContext } from 'react';
import { ThemeContext } from 'react-native-elements';

export const useElementsTheme = () => useContext(ThemeContext);
