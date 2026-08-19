import { Navigate, Route, Routes } from 'react-router-dom'
import { ActivitiesPage } from '../pages/ActivitiesPage'
import { ActivityDetailsPage } from '../pages/ActivityDetailsPage'
import { DashboardPage } from '../pages/DashboardPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/activities" replace />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/activities/:id" element={<ActivityDetailsPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/activities" replace />} />
    </Routes>
  )
}
