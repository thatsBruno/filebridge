import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Files from './components/files/files.tsx'
import TopNav from './components/topnav/topnav.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TopNav />
    <Files />
  </StrictMode>,
)
