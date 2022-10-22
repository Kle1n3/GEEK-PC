import { Router,Route,Switch,Redirect } from 'react-router-dom'
import styles from './App.module.scss'
import Login from './pages/Login'
import Layout from './pages/Layout'
import { AuthRoute } from './components/AuthRoute'
import {customHistory} from './utils'

function App() {
  return (
    <Router history = {customHistory} >
      <div className={styles.app}>
        <Switch>
          <Route path="/login" component={Login} ></Route>
          <AuthRoute path="/home" component={Layout} ></AuthRoute>
          <Redirect path='/' to="/home" ></Redirect>
        </Switch>
      </div>
    </Router>
  )
}

export default App
