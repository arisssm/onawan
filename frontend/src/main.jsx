import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import './mobile.css'
import 'swiper/swiper-bundle.css';


// import react-boostrap
import 'bootstrap/dist/css/bootstrap.min.css';

// import react-router-dom
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter><App /></BrowserRouter>
  </React.StrictMode>,
)
