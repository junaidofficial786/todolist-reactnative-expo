import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import type { CategoryId } from '@/context/types';
import { CATEGORY_LABELS } from '@/utils/categories';

type Props = {
  category: CategoryId;
};

export function CategoryBadge({ category }: Props) {
  const { theme } = useTheme();

  const palette =
    category === 'work'
      ? { bg: theme.colors.categoryWorkMuted, fg: theme.colors.categoryWork }
      : category === 'personal'
        ? { bg: theme.colors.categoryPersonalMuted, fg: theme.colors.categoryPersonal }
        : { bg: theme.colors.categoryGymMuted, fg: theme.colors.categoryGym };

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: palette.bg,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xxs,
          borderRadius: theme.radii.sm,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: palette.fg,
            fontSize: theme.typography.sizes.xs,
            fontWeight: theme.typography.weights.semibold,
          },
        ]}
      >
        {CATEGORY_LABELS[category]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
  },
  text: {},
});
