import { Link, useParams } from 'react-router-dom'
import { RegistrationForm } from '../components/RegistrationForm'
import { useActivity, useRegistrations } from '../hooks/useActivities'
import { categoryLabels, formatActivityDate, statusLabels } from '../utils/activity'

export function ActivityDetailsPage() {
  const { id } = useParams()
  const activityId = Number(id)
  const activityQuery = useActivity(activityId)
  const registrationsQuery = useRegistrations(activityId)

  if (activityQuery.isLoading) {
    return <main className="page-shell detail-page"><div className="state-card">Carregando atividade...</div></main>
  }

  if (activityQuery.isError || !activityQuery.data) {
    return (
      <main className="page-shell detail-page">
        <div className="state-card error-state">
          <h1>Atividade não encontrada</h1>
          <p>Não foi possível carregar os detalhes solicitados.</p>
          <Link to="/activities">Voltar para atividades</Link>
        </div>
      </main>
    )
  }

  const activity = activityQuery.data
  const occupancy = Math.min((activity.registeredCount / activity.capacity) * 100, 100)

  return (
    <main className="page-shell detail-page">
      <Link className="back-link" to="/activities">← Voltar para atividades</Link>
      <article className="detail-card">
        <div className="detail-main">
          <div className="card-topline">
            <span className={`badge category category-${activity.category.toLowerCase()}`}>
              {categoryLabels[activity.category]}
            </span>
            <span className={`badge status status-${activity.status.toLowerCase()}`}>
              {statusLabels[activity.status]}
            </span>
          </div>
          <h1>{activity.title}</h1>
          <p className="detail-description">{activity.description}</p>
          <dl className="detail-meta">
            <div><dt>Data e horário</dt><dd>{formatActivityDate(activity.date)}</dd></div>
            <div><dt>Local</dt><dd>{activity.location}</dd></div>
            <div><dt>Responsável</dt><dd>{activity.organizer}</dd></div>
            <div><dt>Inscrições carregadas</dt><dd>{registrationsQuery.data?.length ?? '...'}</dd></div>
          </dl>
        </div>
        <aside className="detail-capacity">
          <span>Disponibilidade</span>
          <strong>{activity.remainingSpots}</strong>
          <p>vagas restantes</p>
          <div className="progress" aria-label={`${occupancy}% das vagas ocupadas`}>
            <span style={{ width: `${occupancy}%` }} />
          </div>
          <small>{activity.registeredCount} de {activity.capacity} inscritos</small>
        </aside>
      </article>
      <RegistrationForm activityId={activity.id} disabled={activity.status !== 'OPEN'} />
    </main>
  )
}
