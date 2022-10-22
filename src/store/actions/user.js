import { setToken } from '../../utils/auth'
import { loginApi } from "../../api/user"
import { getUserInfoApi } from '../../api/user'

export const login = (mobile, code) => {
    return async dispatch => {
        const res = await loginApi({
            mobile,
            code
        })
        const { token } = res
        setToken(token)
        dispatch({ type: 'login/setToken', payload: token })
    }
}

export const getUserInfo = () => {
    return async dispatch => {
        const res = await getUserInfoApi()
        dispatch({ type: 'user/getUserInfo', payload: res.name })
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({ type: 'login/setToken', payload: '' })
        dispatch({ type: 'user/getUserInfo', payload: '' })
    }
}
