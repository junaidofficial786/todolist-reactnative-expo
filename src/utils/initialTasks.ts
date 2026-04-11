import type { Task } from '@/context/types';
import { generateId } from '@/utils/id';

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(12, 0, 0, 0);
  return d.toISOString();
}

export function buildSampleTasks(): Task[] {
  const now = new Date().toISOString();
  return [
    {
      id: generateId(),
      title: 'Review quarterly goals',
      description: 'Align priorities with the team roadmap.',
      completed: false,
      category: 'work',
      dueDate: daysFromNow(2),
      createdAt: now,
    },
    {
      id: generateId(),
      title: 'Book dentist checkup',
      description: '',
      completed: false,
      category: 'personal',
      dueDate: daysFromNow(10),
      createdAt: now,
    },
    {
      id: generateId(),
      title: 'Leg day — squats & mobility',
      description: 'Warm up 10 min, focus on depth.',
      completed: true,
      category: 'gym',
      dueDate: daysFromNow(-1),
      createdAt: now,
    },
    {
      id: generateId(),
      title: 'Ship Smart To-Do MVP',
      description: 'Polish UI, persistence, and gestures.',
      completed: false,
      category: 'work',
      dueDate: daysFromNow(0),
      createdAt: now,
    },
  ];
}
