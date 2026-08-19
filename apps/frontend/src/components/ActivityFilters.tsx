import type { ActivityCategory } from '../types/activity'
import { categoryLabels } from '../utils/activity'

export type CategoryFilter = ActivityCategory | 'ALL'

interface ActivityFiltersProps {
  selected: CategoryFilter
  onChange: (category: CategoryFilter) => void
}

const categories: CategoryFilter[] = [
  'ALL',
  'WORKSHOP',
  'LECTURE',
  'COURSE',
  'EXTENSION_PROJECT',
  'EVENT',
]

export function ActivityFilters({ selected, onChange }: ActivityFiltersProps) {
  return (
    <div className="filter-group" role="group" aria-label="Filtrar por categoria">
      {categories.map((category) => (
        <button
          className={selected === category ? 'filter-active' : ''}
          key={category}
          type="button"
          onClick={() => onChange(category)}
        >
          {category === 'ALL' ? 'Todas' : categoryLabels[category]}
        </button>
      ))}
    </div>
  )
}
