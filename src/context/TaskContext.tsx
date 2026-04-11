import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LayoutAnimation } from 'react-native';

import type { CategoryId, Task, TaskDraft } from '@/context/types';
import { buildSampleTasks } from '@/utils/initialTasks';
import { generateId } from '@/utils/id';
import { STORAGE_KEYS } from '@/utils/storageKeys';

type TaskContextValue = {
  tasks: Task[];
  ready: boolean;
  addTask: (draft: TaskDraft) => void;
  updateTask: (id: string, draft: TaskDraft) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
};

const TaskContext = createContext<TaskContextValue | null>(null);

function persistTasks(list: Task[]) {
  return AsyncStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(list));
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.tasks);
        if (cancelled) return;
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as Task[];
            if (Array.isArray(parsed)) {
              setTasks(parsed);
            } else {
              throw new Error('invalid shape');
            }
          } catch {
            const sample = buildSampleTasks();
            setTasks(sample);
            await persistTasks(sample);
          }
        } else {
          const sample = buildSampleTasks();
          setTasks(sample);
          await persistTasks(sample);
        }
      } catch {
        const sample = buildSampleTasks();
        if (!cancelled) {
          setTasks(sample);
          await persistTasks(sample);
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const addTask = useCallback((draft: TaskDraft) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const now = new Date().toISOString();
    const task: Task = {
      id: generateId(),
      title: draft.title.trim(),
      description: draft.description.trim(),
      completed: false,
      category: draft.category,
      dueDate: draft.dueDate ? draft.dueDate.toISOString() : null,
      createdAt: now,
    };
    setTasks((prev) => {
      const next = [task, ...prev];
      persistTasks(next).catch(() => undefined);
      return next;
    });
  }, []);

  const updateTask = useCallback((id: string, draft: TaskDraft) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((prev) => {
      const next = prev.map((t) =>
        t.id === id
          ? {
              ...t,
              title: draft.title.trim(),
              description: draft.description.trim(),
              category: draft.category,
              dueDate: draft.dueDate ? draft.dueDate.toISOString() : null,
            }
          : t,
      );
      persistTasks(next).catch(() => undefined);
      return next;
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((prev) => {
      const next = prev.filter((t) => t.id !== id);
      persistTasks(next).catch(() => undefined);
      return next;
    });
  }, []);

  const toggleComplete = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      persistTasks(next).catch(() => undefined);
      return next;
    });
  }, []);

  const getTaskById = useCallback(
    (id: string) => tasks.find((t) => t.id === id),
    [tasks],
  );

  const value = useMemo(
    () => ({
      tasks,
      ready,
      addTask,
      updateTask,
      deleteTask,
      toggleComplete,
      getTaskById,
    }),
    [tasks, ready, addTask, updateTask, deleteTask, toggleComplete, getTaskById],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return ctx;
}

export type { Task, TaskDraft, CategoryId };
