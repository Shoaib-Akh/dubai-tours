import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F5F5F5',
    text: '#333333',
    primary: '#00A0E4',
    card: '#FFFFFF',
    tabActive: '#000000',
    tabInactive: '#888888',
  },
};

export const DarkThemes= {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#1E1E1E',
    text: '#FFFFFF',
    primary: '#1E90FF',
    card: '#2D2D2D',
    tabActive: '#FFFFFF',
    tabInactive: '#888888',
  },
};
