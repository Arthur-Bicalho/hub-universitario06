import {
  filterActivities,
  getAllActivitiesSortedByDate,
  getOpenActivitiesSortedByDate,
  getTotalAvailableSpots,
} from './activity'
import { activity } from '../test/fixtures'

describe('filterActivities', () => {
  it('returns only activities from the selected category', () => {
    const activities = [
      activity({ id: 1, category: 'WORKSHOP' }),
      activity({ id: 2, title: 'Feira de Estágios', category: 'EVENT' }),
      activity({ id: 3, title: 'Curso de React', category: 'COURSE' }),
    ]

    expect(filterActivities(activities, 'WORKSHOP')).toEqual([activities[0]])
  })
})

describe('getOpenActivitiesSortedByDate', () => {
  it('excludes activities that are not OPEN', () => {
    const activities = [
      activity({ id: 1, status: 'OPEN' }),
      activity({ id: 2, status: 'FULL' }),
      activity({ id: 3, status: 'CLOSED' }),
    ]

    const result = getOpenActivitiesSortedByDate(activities)

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })

  it('sorts open activities by date, soonest first', () => {
    const activities = [
      activity({ id: 1, status: 'OPEN', date: '2026-09-10T10:00:00' }),
      activity({ id: 2, status: 'OPEN', date: '2026-09-01T10:00:00' }),
      activity({ id: 3, status: 'OPEN', date: '2026-09-05T10:00:00' }),
    ]

    const result = getOpenActivitiesSortedByDate(activities)

    expect(result.map((a) => a.id)).toEqual([2, 3, 1])
  })
})

describe('getAllActivitiesSortedByDate', () => {
  it('includes activities of every status, sorted by date', () => {
    const activities = [
      activity({ id: 1, status: 'OPEN', date: '2026-09-10T10:00:00' }),
      activity({ id: 2, status: 'FULL', date: '2026-09-01T10:00:00' }),
      activity({ id: 3, status: 'CLOSED', date: '2026-09-05T10:00:00' }),
    ]

    const result = getAllActivitiesSortedByDate(activities)

    expect(result.map((a) => a.id)).toEqual([2, 3, 1])
  })
})

describe('getTotalAvailableSpots', () => {
  it('sums remainingSpots only for OPEN activities', () => {
    const activities = [
      activity({ id: 1, status: 'OPEN', remainingSpots: 5 }),
      activity({ id: 2, status: 'FULL', remainingSpots: 0 }),
      activity({ id: 3, status: 'CLOSED', remainingSpots: 3 }),
      activity({ id: 4, status: 'OPEN', remainingSpots: 2 }),
    ]

    expect(getTotalAvailableSpots(activities)).toBe(7)
  })

  it('returns 0 when there are no open activities', () => {
    const activities = [activity({ id: 1, status: 'FULL', remainingSpots: 0 })]

    expect(getTotalAvailableSpots(activities)).toBe(0)
  })
})