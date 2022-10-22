import { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from '../utils/auth'

const AuthRoute = (props) => {
    
    return getToken()? (<Route {...props} />):(<Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />)
}

export { AuthRoute }
