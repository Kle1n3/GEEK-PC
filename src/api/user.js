import http from "../request";

export const loginApi = data => http({
    url: '/authorizations',
    method: 'POST',
    data
})

export const getUserInfoApi = () => http({
    url: '/user/profile',
    method: 'GET'
})