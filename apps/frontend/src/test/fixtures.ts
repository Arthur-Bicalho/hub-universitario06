import type { Activity } from '../types/activity'

export function activity(overrides: Partial<Activity> = {}): Activity {
  return {
    id: 1,
    title: 'Workshop de Spring Boot',
    description: 'Uma atividade universitária para aprender APIs.',
    category: 'WORKSHOP',
    status: 'OPEN',
    capacity: 30,
    registeredCount: 25,
    remainingSpots: 5,
    organizer: 'Prof. João',
    location: 'Laboratório 4',
    date: '2026-08-20T14:00:00',
    createdAt: '2026-08-01T10:00:00',
    updatedAt: '2026-08-01T10:00:00',
    ...overrides,
  }
}
