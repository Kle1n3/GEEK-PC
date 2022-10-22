const TOKEN_KEY = 'itcast_geek_pc'

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const setToken = token => localStorage.setItem(TOKEN_KEY, token)

export const clearToken = () => localStorage.removeItem(TOKEN_KEY)