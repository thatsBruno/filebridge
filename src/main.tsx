import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './components/dashboard/dashboard.tsx'

createRoot(document.getElementById('root')!).render(
  <>
  <Dashboard />
  </>
)
