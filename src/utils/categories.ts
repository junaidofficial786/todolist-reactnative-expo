import type { CategoryId } from '@/context/types';

export const CATEGORY_ORDER: CategoryId[] = ['work', 'personal', 'gym'];

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  work: 'Work',
  personal: 'Personal',
  gym: 'Gym',
};
