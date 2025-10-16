import React, { createContext, useContext, useMemo } from 'react';
import { View } from 'react-native';

type Theme = {
  colors: {
    bg: string; card: string; overlay: string; border: string;
    text: string; textMuted: string; violet: string; emerald: string;
  };
};
const theme: Theme = {
  colors: {
    bg: '#0b0b0c',
    card: 'rgba(24,24,27,0.60)',
    overlay: 'rgba(24,24,27,0.70)',
    border: '#27272a',
    text: '#f4f4f5',
    textMuted: '#a1a1aa',
    violet: '#7c3aed',
    emerald: '#34d399',
  },
};
const Ctx = createContext(theme);
export const useTheme = () => useContext(Ctx);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const value = useMemo(() => theme, []);
  return <Ctx.Provider value={value}>
    <View style={{ flex: 1, backgroundColor: value.colors.bg }}>{children}</View>
  </Ctx.Provider>;
};
