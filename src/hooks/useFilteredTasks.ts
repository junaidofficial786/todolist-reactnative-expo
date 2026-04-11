import { useMemo } from 'react';

import type { Task, TaskFilter } from '@/context/types';

export function useFilteredTasks(tasks: Task[], filter: TaskFilter): Task[] {
  return useMemo(() => {
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    if (filter === 'pending') return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);
}
