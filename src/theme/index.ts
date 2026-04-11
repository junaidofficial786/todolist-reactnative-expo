import { lightColors, darkColors } from './colors.js';
import { spacing, radii } from './spacing.js';
import { typography as typographyBase } from './typography.js';

export type ThemeMode = 'light' | 'dark';

const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const typography = {
  ...typographyBase,
  weights: fontWeights,
};

export type AppTheme = {
  mode: ThemeMode;
  colors: typeof lightColors;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
};

export function createTheme(mode: ThemeMode): AppTheme {
  return {
    mode,
    colors: mode === 'dark' ? darkColors : lightColors,
    spacing,
    radii,
    typography,
  };
}

export { lightColors, darkColors, spacing, radii };
