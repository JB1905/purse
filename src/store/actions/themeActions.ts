import { Theme } from '../../enums/Theme'

export const SET_THEME = 'SET_THEME';

export const setTheme = (payload: Theme) => ({
  type: SET_THEME,
  payload,
});
