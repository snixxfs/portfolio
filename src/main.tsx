import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrintedPortfolio } from './PrintedPortfolio'
import './styles/printed-matter.css'
import './styles/printed-sections.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

createRoot(container).render(
  <StrictMode>
    <PrintedPortfolio />
  </StrictMode>,
)
