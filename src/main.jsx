import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css'
import App from './App.jsx'

async function enableMocks() {
  if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === 'true') {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      serviceWorker: { url: '/mockServiceWorker.js' },
      onUnhandledRequest: 'bypass',
    })
  }
}

enableMocks().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
