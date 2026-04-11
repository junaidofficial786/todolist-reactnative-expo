import React from 'react';
import { ActivityIndicator, StyleSheet, Text, ViewStyle } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';

import { useTheme } from '@/context/ThemeContext';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  style,
  icon,
}: Props) {
  const { theme } = useTheme();

  const bg =
    variant === 'primary'
      ? theme.colors.textPrimary
      : variant === 'secondary'
        ? theme.colors.chipBackground
        : variant === 'destructive'
          ? theme.colors.destructiveBackground
          : 'transparent';

  const fg =
    variant === 'primary'
      ? theme.colors.fabIcon
      : variant === 'destructive'
        ? theme.colors.destructive
        : theme.colors.textPrimary;

  const borderWidth = variant === 'ghost' ? StyleSheet.hairlineWidth : 0;
  const borderColor = variant === 'ghost' ? theme.colors.border : 'transparent';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: bg,
          borderRadius: theme.radii.md,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.lg,
          opacity: pressed ? 0.92 : disabled ? 0.45 : 1,
          borderWidth,
          borderColor,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.label,
              {
                color: fg,
                fontSize: theme.typography.sizes.md,
                fontWeight: theme.typography.weights.semibold,
                marginLeft: icon ? theme.spacing.xs : 0,
              },
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {},
});
