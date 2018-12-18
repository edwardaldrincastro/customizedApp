import { UI_START_LOADING, UI_STOP_LOADING, EMAIL_CONFIRMED, EMAIL_NOT_CONFIRMED, LOGIN_SUCCESSFUL, PASSWORD_CONFIRMED } from "./actionTypes";

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    }
}

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    }
}

export const emailConfirmed = (idToken) => {
    return {
        type: EMAIL_CONFIRMED,
        idToken: idToken
    }
}

export const emailNotConfirmed = () => {
    return {
        type: EMAIL_NOT_CONFIRMED
    }
}

export const loginSuccessful = (status) => {
    return {
        type: LOGIN_SUCCESSFUL,
        status: status
    }
}

export const passwordConfirmed = () => {
    return {
        type: PASSWORD_CONFIRMED
    }
}