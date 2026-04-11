import React, { useCallback, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pressable, Swipeable } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { useTheme } from '@/context/ThemeContext';
import type { Task } from '@/context/types';
import { formatDueDate, isOverdue } from '@/utils/dateFormat';

import { CategoryBadge } from './CategoryBadge';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onPress: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, onToggle, onPress, onDelete }: Props) {
  const { theme } = useTheme();
  const swipeRef = useRef<Swipeable>(null);

  const close = useCallback(() => {
    swipeRef.current?.close();
  }, []);

  const handleDelete = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => undefined);
    close();
    onDelete(task.id);
  }, [close, onDelete, task.id]);

  const renderRight = useCallback(() => {
    return (
      <Pressable
        onPress={handleDelete}
        style={[
          styles.deleteWrap,
          {
            backgroundColor: theme.colors.destructive,
            borderRadius: theme.radii.lg,
            marginLeft: theme.spacing.xs,
            width: 88,
          },
        ]}
      >
        <Ionicons name="trash-outline" size={24} color={theme.colors.fabIcon} />
        <Text
          style={{
            color: theme.colors.fabIcon,
            fontSize: theme.typography.sizes.xs,
            fontWeight: theme.typography.weights.semibold,
            marginTop: theme.spacing.xxs,
          }}
        >
          Delete
        </Text>
      </Pressable>
    );
  }, [handleDelete, theme]);

  const dueLabel = formatDueDate(task.dueDate);
  const overdue = !task.completed && isOverdue(task.dueDate);

  return (
    <Animated.View
      entering={FadeIn.duration(260)}
      exiting={FadeOut.duration(180)}
      layout={LinearTransition.springify().damping(18).stiffness(220)}
      style={{ marginHorizontal: theme.spacing.lg, marginBottom: theme.spacing.sm }}
    >
      <Swipeable
        ref={swipeRef}
        friction={2}
        overshootRight={false}
        renderRightActions={renderRight}
      >
        <Pressable
          onPress={() => onPress(task.id)}
          style={({ pressed }) => [
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radii.lg,
              padding: theme.spacing.md,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: theme.colors.borderSubtle,
              opacity: pressed ? 0.96 : 1,
              transform: [{ scale: pressed ? 0.995 : 1 }],
            },
            task.completed
              ? {
                  opacity: 0.72,
                }
              : null,
            theme.mode === 'light'
              ? {
                  shadowColor: theme.colors.shadow,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 1,
                  shadowRadius: 12,
                  elevation: 3,
                }
              : {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.35,
                  shadowRadius: 8,
                  elevation: 2,
                },
          ]}
        >
          <View style={styles.topRow}>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
                onToggle(task.id);
              }}
              style={[
                styles.checkbox,
                {
                  borderColor: task.completed ? theme.colors.success : theme.colors.border,
                  backgroundColor: task.completed ? theme.colors.successMuted : 'transparent',
                  borderRadius: theme.radii.sm,
                  width: 26,
                  height: 26,
                },
              ]}
            >
              {task.completed ? (
                <Ionicons name="checkmark" size={18} color={theme.colors.success} />
              ) : null}
            </Pressable>
            <View style={styles.titleBlock}>
              <Text
                numberOfLines={2}
                style={[
                  styles.title,
                  {
                    color: theme.colors.textPrimary,
                    fontSize: theme.typography.sizes.md,
                    fontWeight: theme.typography.weights.semibold,
                    textDecorationLine: task.completed ? 'line-through' : 'none',
                  },
                ]}
              >
                {task.title}
              </Text>
              {task.description ? (
                <Text
                  numberOfLines={2}
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.sizes.sm,
                    marginTop: theme.spacing.xxs,
                    textDecorationLine: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.description}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={[styles.meta, { marginTop: theme.spacing.sm }]}>
            <CategoryBadge category={task.category} />
            {dueLabel ? (
              <View style={styles.dueRow}>
                <Ionicons
                  name="calendar-outline"
                  size={14}
                  color={overdue ? theme.colors.accent : theme.colors.textMuted}
                />
                <Text
                  style={{
                    marginLeft: theme.spacing.xxs,
                    color: overdue ? theme.colors.accent : theme.colors.textMuted,
                    fontSize: theme.typography.sizes.xs,
                    fontWeight: overdue ? theme.typography.weights.semibold : theme.typography.weights.regular,
                  }}
                >
                  {dueLabel}
                </Text>
              </View>
            ) : null}
          </View>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {},
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleBlock: {
    flex: 1,
  },
  title: {},
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  dueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
