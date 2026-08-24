import type { Activity, ActivityCategory, ActivityStatus } from '../types/activity'
import type { CategoryFilter } from '../components/ActivityFilters'

export const categoryLabels: Record<ActivityCategory, string> = {
  WORKSHOP: 'Workshop',
  LECTURE: 'Palestra',
  COURSE: 'Curso',
  EXTENSION_PROJECT: 'Projeto de extensão',
  EVENT: 'Evento',
}

export const statusLabels: Record<ActivityStatus, string> = {
  OPEN: 'Aberta',
  FULL: 'Lotada',
  CLOSED: 'Encerrada',
}

export const categoryColors: Record<ActivityCategory, string> = {
  WORKSHOP: '#3B82F6',
  LECTURE: '#8B5CF6',
  COURSE: '#10B981',
  EXTENSION_PROJECT: '#F59E0B',
  EVENT: '#EC4899',
}

export function formatActivityDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

export function filterActivities(activities: Activity[], category: CategoryFilter) {
  if (category === 'ALL') return activities
  return activities.filter(
    (activity) => activity.category === category,
  )
}

export function getOpenActivitiesSortedByDate(activities: Activity[]): Activity[] {
  return activities
    .filter((activity) => activity.status === 'OPEN')
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getAllActivitiesSortedByDate(activities: Activity[]): Activity[] {
  return activities
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getTotalAvailableSpots(activities: Activity[]): number {
  return activities
    .filter((activity) => activity.status === 'OPEN')
    .reduce((total, activity) => total + activity.remainingSpots, 0)
}
