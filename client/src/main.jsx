import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/stores.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* wrap the app with redux store */}
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>,
)
