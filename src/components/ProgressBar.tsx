import React from 'react';
import { DimensionValue, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

type Props = {
  ratio: number;
  completed: number;
  total: number;
};

export function ProgressBar({ ratio, completed, total }: Props) {
  const { theme } = useTheme();
  const width = `${Math.round(Math.min(1, Math.max(0, ratio)) * 100)}%` as DimensionValue;

  return (
    <View style={[styles.wrap, { marginHorizontal: theme.spacing.lg, marginBottom: theme.spacing.md }]}>
      <View style={[styles.labels, { marginBottom: theme.spacing.xs }]}>
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.sizes.sm,
            fontWeight: theme.typography.weights.medium,
          }}
        >
          Progress
        </Text>
        <Text
          style={{
            color: theme.colors.textMuted,
            fontSize: theme.typography.sizes.xs,
          }}
        >
          {completed} of {total} done
        </Text>
      </View>
      <View
        style={[
          styles.track,
          {
            backgroundColor: theme.colors.progressTrack,
            borderRadius: theme.radii.full,
            height: 8,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width,
              backgroundColor: theme.colors.progressFill,
              borderRadius: theme.radii.full,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {},
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  track: {
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
