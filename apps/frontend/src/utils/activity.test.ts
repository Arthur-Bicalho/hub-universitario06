import { filterActivities } from './activity'
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
