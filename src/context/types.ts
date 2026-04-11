export type CategoryId = 'work' | 'personal' | 'gym';

export type TaskFilter = 'all' | 'completed' | 'pending';

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: CategoryId;
  dueDate: string | null;
  createdAt: string;
};

export type TaskDraft = {
  title: string;
  description: string;
  category: CategoryId;
  dueDate: Date | null;
};
