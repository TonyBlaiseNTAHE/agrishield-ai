import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { FarmerProvider } from './context/FarmerContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FarmerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FarmerProvider>
  </React.StrictMode>
)
