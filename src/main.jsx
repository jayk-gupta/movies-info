import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import StarRating from './components/StarRating.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <StarRating maxRating={5 } /> */}
    <App />
  </React.StrictMode>,
)
