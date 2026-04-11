import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import type { TaskFilter } from '@/context/types';

type Props = {
  value: TaskFilter;
  onChange: (f: TaskFilter) => void;
};

const OPTIONS: { key: TaskFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
];

export function FilterChips({ value, onChange }: Props) {
  const { theme } = useTheme();

  return (
    <View style={[styles.row, { paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.sm }]}>
      {OPTIONS.map((opt) => {
        const active = value === opt.key;
        return (
          <Pressable
            key={opt.key}
            onPress={() => onChange(opt.key)}
            style={[
              styles.chip,
              {
                paddingVertical: theme.spacing.xs,
                paddingHorizontal: theme.spacing.md,
                borderRadius: theme.radii.full,
                marginRight: theme.spacing.xs,
                backgroundColor: active ? theme.colors.textPrimary : theme.colors.chipBackground,
              },
            ]}
          >
            <Text
              style={{
                color: active ? theme.colors.fabIcon : theme.colors.textSecondary,
                fontSize: theme.typography.sizes.sm,
                fontWeight: theme.typography.weights.semibold,
              }}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {},
});
