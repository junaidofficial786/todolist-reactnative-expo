import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/context/ThemeContext';

type Props = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: Props) {
  const { theme } = useTheme();

  return (
    <View style={[styles.center, { paddingHorizontal: theme.spacing.xl, paddingVertical: theme.spacing.xxxl }]}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: theme.colors.chipBackground,
            width: 88,
            height: 88,
            borderRadius: theme.radii.full,
            marginBottom: theme.spacing.lg,
          },
        ]}
      >
        <Ionicons name="sparkles-outline" size={40} color={theme.colors.textMuted} />
      </View>
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.sizes.xl,
            fontWeight: theme.typography.weights.semibold,
            marginBottom: theme.spacing.xs,
            textAlign: 'center',
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.message,
          {
            color: theme.colors.textSecondary,
            fontSize: theme.typography.sizes.md,
            lineHeight: theme.typography.lineHeights.md,
            textAlign: 'center',
          },
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {},
  message: {},
});
