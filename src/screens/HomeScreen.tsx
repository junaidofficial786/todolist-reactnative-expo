import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { EmptyState } from '@/components/EmptyState';
import { FilterChips } from '@/components/FilterChips';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { ScreenContainer } from '@/components/ScreenContainer';
import { TaskItem } from '@/components/TaskItem';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { useTheme } from '@/context/ThemeContext';
import { useTasks } from '@/context/TaskContext';
import type { Task, TaskFilter } from '@/context/types';
import { useFilteredTasks } from '@/hooks/useFilteredTasks';
import { useTaskProgress } from '@/hooks/useTaskProgress';
import type { RootStackParamList } from '@/navigation/types';

export function HomeScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tasks, ready, toggleComplete, deleteTask } = useTasks();
  const [filter, setFilter] = useState<TaskFilter>('all');
  const filtered = useFilteredTasks(tasks, filter);
  const { completed, total, ratio } = useTaskProgress(tasks);

  const renderItem: ListRenderItem<Task> = useCallback(
    ({ item }) => (
      <TaskItem
        task={item}
        onToggle={toggleComplete}
        onPress={(id) => navigation.navigate('EditTask', { taskId: id })}
        onDelete={deleteTask}
      />
    ),
    [deleteTask, navigation, toggleComplete],
  );

  const keyExtractor = useCallback((item: Task) => item.id, []);

  const listHeader = (
    <>
      <Header
        title="Tasks"
        subtitle="Stay focused, ship calmly."
        right={<ThemeToggleButton />}
      />
      <ProgressBar ratio={ratio} completed={completed} total={total} />
      <FilterChips value={filter} onChange={setFilter} />
    </>
  );

  if (!ready) {
    return (
      <ScreenContainer edges={['top', 'left', 'right', 'bottom']} style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.textMuted} />
      </ScreenContainer>
    );
  }

  const emptyCopy =
    filter === 'all'
      ? { title: 'Nothing here yet', message: 'Tap + to capture your first task. Swipe left on a card to delete.' }
      : filter === 'pending'
        ? {
            title: 'All caught up',
            message: 'No pending tasks for this filter. Switch to All or Completed.',
          }
        : {
            title: 'No completed tasks',
            message: 'Complete a task to see it here.',
          };

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      <View style={styles.flex}>
        <FlatList
          data={filtered}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={
            <EmptyState title={emptyCopy.title} message={emptyCopy.message} />
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          extraData={{ filter, tasks }}
        />
        <FloatingActionButton onPress={() => navigation.navigate('AddTask')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 120,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
