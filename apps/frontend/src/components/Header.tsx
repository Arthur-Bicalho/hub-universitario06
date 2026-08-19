import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/activities" className="brand" aria-label="Hub Universitário - início">
          Hub Universitário
        </NavLink>
        <nav aria-label="Navegação principal">
          <NavLink to="/activities">Atividades</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </div>
    </header>
  )
}
