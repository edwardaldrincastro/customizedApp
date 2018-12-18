import {
    UI_START_LOADING,
    UI_STOP_LOADING,
    EMAIL_CONFIRMED,
    EMAIL_NOT_CONFIRMED,
    REMOVE_ID_TOKEN,
    LOGIN_SUCCESSFUL,
    PASSWORD_CONFIRMED
} from "../actions/actionTypes";

const initialState = {
    isLoading: false,
    isEmailConfirmed: false,
    idToken: null,
    isLoginSuccessful: false,
    isPasswordConfirmed: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case EMAIL_CONFIRMED:
            return {
                ...state,
                isEmailConfirmed: true,
                idToken: action.idToken
            }
        case EMAIL_NOT_CONFIRMED:
            return {
                ...state,
                isEmailConfirmed: false
            }
        case REMOVE_ID_TOKEN:
            return {
                ...state,
                idToken: null
            }
        case LOGIN_SUCCESSFUL:
            return {
                ...state,
                isLoginSuccessful: action.status
            }
        case PASSWORD_CONFIRMED:
            return {
                ...state,
                isPasswordConfirmed: true
            }
        default:
            return state;
    }
}

export default reducer