import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import Router from './router'

import './header.css'
import './services.css'
import './contact.css'
import './login.css'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
)
