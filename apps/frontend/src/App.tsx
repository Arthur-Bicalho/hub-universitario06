import { Header } from './components/Header'
import { AppRoutes } from './routes/AppRoutes'

export default function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <footer className="site-footer">
        <div className="page-shell">Hub Universitário · Projeto de extensão universitária</div>
      </footer>
    </>
  )
}
