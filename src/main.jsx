import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css'; 
import App from './App.jsx'

//MSW 시작
if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  await worker.start();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
