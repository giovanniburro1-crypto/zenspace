import React from 'react'
import ReactDOM from 'react-dom/client'
import { MeditationApp } from './components/MeditationApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MeditationApp />
  </React.StrictMode>,
)
