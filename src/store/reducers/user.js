import { getToken } from "../../utils/index"


const initialState = {
    token: getToken()
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'login/setToken':
            return {
                ...state,
                token: action.payload
            }
        case 'user/getUserInfo':
            return {
                ...state,
                name: action.payload
            }
        default:
            return state
    }
}

export default user