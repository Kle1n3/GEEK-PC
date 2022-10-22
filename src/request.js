import axios from 'axios'
import store from './store'
import { logout } from './store/actions/user'
import { getToken } from './utils/auth'
import { customHistory } from './utils'
import { message } from 'antd'

const http = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000,
})


// 请求拦截器
http.interceptors.request.use(config => {
    const token = getToken()
    if (token) { config.headers.Authorization = `Bearer ${token}` }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(response => {
    return response?.data?.data || response
}, error => {
    if (error.response.status === 401) {
        message.error('登陆失效，请重新登录')
        store.dispatch(logout())
        if (customHistory.location.pathname !== '/login') {
            customHistory.push({
                pathname: '/login',
                state: { from: customHistory.location.pathname }
            })
        }
    }
    return Promise.reject(error)
})


export default http