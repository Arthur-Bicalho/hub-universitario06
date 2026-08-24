import { Link } from 'react-router-dom'
import { useActivities } from '../hooks/useActivities'
import {
  categoryColors,
  categoryLabels,
  formatActivityDate,
  getAllActivitiesSortedByDate,
  getTotalAvailableSpots,
  statusLabels,
} from '../utils/activity'

export function DashboardPage() {
  const activitiesQuery = useActivities('')

  if (activitiesQuery.isLoading) {
    return (
      <main className="page-shell dashboard-page">
        <p className="eyebrow">Visão geral</p>
        <h1>Dashboard</h1>
        <div className="state-card">Carregando indicadores...</div>
      </main>
    )
  }

  if (activitiesQuery.isError) {
    return (
      <main className="page-shell dashboard-page">
        <p className="eyebrow">Visão geral</p>
        <h1>Dashboard</h1>
        <div className="state-card error-state">
          <h2>Não foi possível carregar os indicadores</h2>
          <p>Verifique se a API está em execução e tente novamente.</p>
          <button type="button" onClick={() => activitiesQuery.refetch()}>
            Tentar novamente
          </button>
        </div>
      </main>
    )
  }

  const activities = activitiesQuery.data ?? []
  const allActivities = getAllActivitiesSortedByDate(activities)
  const totalAvailableSpots = getTotalAvailableSpots(activities)
  const openCount = activities.filter((activity) => activity.status === 'OPEN').length
  const categoriesPresent = Array.from(new Set(allActivities.map((activity) => activity.category)))

  return (
    <main className="page-shell dashboard-page">
      <p className="eyebrow">Visão geral</p>
      <h1>Dashboard</h1>

      <section className="dashboard-summary">
        <div className="state-card summary-card">
          <p className="eyebrow">Vagas disponíveis agora</p>
          <strong className="summary-number">{totalAvailableSpots}</strong>
          <p>
            distribuídas em {openCount} {openCount === 1 ? 'atividade aberta' : 'atividades abertas'}
          </p>
        </div>
      </section>

      <section className="dashboard-upcoming">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Agenda</p>
            <h2>Calendário completo de atividades</h2>
          </div>
        </div>

        {categoriesPresent.length > 0 && (
          <div className="category-legend">
            {categoriesPresent.map((category) => (
              <span key={category} className="category-legend-item">
                <span
                  className="category-dot"
                  style={{ backgroundColor: categoryColors[category] }}
                  aria-hidden="true"
                />
                {categoryLabels[category]}
              </span>
            ))}
          </div>
        )}

        {allActivities.length === 0 && (
          <div className="state-card">Nenhuma atividade cadastrada no momento.</div>
        )}

        {allActivities.length > 0 && (
          <ul className="dashboard-activity-list">
            {allActivities.map((activity) => (
              <li
                key={activity.id}
                className={`dashboard-activity-item status-${activity.status.toLowerCase()}`}
                style={{ borderLeftColor: categoryColors[activity.category] }}
              >
                <div>
                  <p className="activity-date">{formatActivityDate(activity.date)}</p>
                  <Link to={`/activities/${activity.id}`}>{activity.title}</Link>
                </div>
                <div className="activity-meta">
                  <span className={`status-badge status-badge-${activity.status.toLowerCase()}`}>
                    {statusLabels[activity.status]}
                  </span>
                  <strong>{activity.remainingSpots} vagas</strong>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}