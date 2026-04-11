import React, { useEffect, useMemo } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenContainer } from '@/components/ScreenContainer';
import { TaskForm } from '@/components/TaskForm';
import { useTasks } from '@/context/TaskContext';
import type { TaskDraft } from '@/context/types';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditTask'>;

function taskToDraft(task: { title: string; description: string; category: TaskDraft['category']; dueDate: string | null }): TaskDraft {
  return {
    title: task.title,
    description: task.description,
    category: task.category,
    dueDate: task.dueDate ? new Date(task.dueDate) : null,
  };
}

export function EditTaskScreen({ navigation, route }: Props) {
  const { taskId } = route.params;
  const { getTaskById, updateTask } = useTasks();
  const task = useMemo(() => getTaskById(taskId), [getTaskById, taskId]);
  const initial = useMemo(() => (task ? taskToDraft(task) : null), [task]);

  useEffect(() => {
    if (!task) {
      navigation.goBack();
    }
  }, [navigation, task]);

  if (!task || !initial) {
    return null;
  }

  const handleSubmit = (draft: TaskDraft) => {
    updateTask(task.id, draft);
    navigation.goBack();
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']}>
      <TaskForm initial={initial} submitLabel="Save changes" onSubmit={handleSubmit} />
    </ScreenContainer>
  );
}
