import { useMemo } from 'react';

import type { Task } from '@/context/types';

export function useTaskProgress(tasks: Task[]) {
  return useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const ratio = total === 0 ? 0 : completed / total;
    return { total, completed, ratio };
  }, [tasks]);
}
