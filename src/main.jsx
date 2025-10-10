import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('Main.jsx is loading...')

const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  console.log('React app rendered successfully!')
} else {
  console.error('Root element not found!')
}