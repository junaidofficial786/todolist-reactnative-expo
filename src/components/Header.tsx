import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

type Props = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

export function Header({ title, subtitle, right }: Props) {
  const { theme } = useTheme();

  return (
    <View style={[styles.row, { paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.sm }]}>
      <View style={styles.textBlock}>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.sizes.xxl,
              lineHeight: theme.typography.lineHeights.xxl,
              fontWeight: theme.typography.weights.semibold,
            },
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.textSecondary,
                fontSize: theme.typography.sizes.sm,
                marginTop: theme.spacing.xxs,
              },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textBlock: {
    flex: 1,
    paddingRight: 8,
  },
  title: {},
  subtitle: {},
  right: {
    paddingTop: 2,
  },
});
