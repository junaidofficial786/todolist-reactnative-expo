import React from 'react';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/context/ThemeContext';

export function ThemeToggleButton() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: theme.colors.chipBackground,
          borderRadius: theme.radii.md,
          width: 44,
          height: 44,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Ionicons name={isDark ? 'sunny' : 'moon'} size={22} color={theme.colors.textPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
