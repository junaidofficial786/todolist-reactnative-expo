import React, { useMemo } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenContainer } from '@/components/ScreenContainer';
import { TaskForm } from '@/components/TaskForm';
import { useTasks } from '@/context/TaskContext';
import type { TaskDraft } from '@/context/types';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTask'>;

const emptyDraft = (): TaskDraft => ({
  title: '',
  description: '',
  category: 'personal',
  dueDate: null,
});

export function AddTaskScreen({ navigation }: Props) {
  const { addTask } = useTasks();
  const initial = useMemo(() => emptyDraft(), []);

  const handleSubmit = (draft: TaskDraft) => {
    addTask(draft);
    navigation.goBack();
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']}>
      <TaskForm initial={initial} submitLabel="Create task" onSubmit={handleSubmit} />
    </ScreenContainer>
  );
}
