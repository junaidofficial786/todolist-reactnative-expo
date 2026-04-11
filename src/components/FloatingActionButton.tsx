import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/context/ThemeContext';

type Props = {
  onPress: () => void;
  style?: ViewStyle;
};

export function FloatingActionButton({ onPress, style }: Props) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.fab,
        {
          backgroundColor: theme.colors.fab,
          width: 56,
          height: 56,
          borderRadius: theme.radii.lg,
          bottom: theme.spacing.xl,
          right: theme.spacing.lg,
          shadowColor: theme.colors.shadow,
          opacity: pressed ? 0.9 : 1,
        },
        theme.mode === 'light'
          ? {
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.2,
              shadowRadius: 16,
              elevation: 8,
            }
          : {
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 12,
              elevation: 10,
            },
        style,
      ]}
    >
      <Ionicons name="add" size={28} color={theme.colors.fabIcon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
