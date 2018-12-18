import { ADD_USER } from "../actions/actionTypes";
import { uiStartLoading, uiStopLoading, emailConfirmed, emailNotConfirmed, passwordConfirmed } from "./ui";
import { NavigationActions } from 'react-navigation';

export const addUser = (lastName, firstName, email, birthday) => {
    return dispatch => {
        const userData = {
            lastName: lastName,
            firstName: firstName,
            email: email,
            birthday: birthday
        }
        fetch("https://modifiedting-1541990454966.firebaseio.com/users.json",
            {
                method: "POST",
                body: JSON.stringify(userData)
            })
            .catch(err => console.log(err))
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes)
            })
    }
    // return {
    //     type: ADD_USER,
    //     lastName: lastName,
    //     firstName: firstName,
    //     email: email,
    //     birthday: birthday,
    //     // password: password

    // };
};

export const authSignUpEmail = ( email ) => {
    return dispatch => {
        dispatch(uiStartLoading())
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAyQvYxr3o_us6OHsEBY3Gh99ny64DlZV0",
            {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: "password",
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .catch(err => {
                console.log("Error in sign in auth", err)
                dispatch(uiStopLoading())
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (parsedRes.error) {
                    alert(parsedRes.error.message)
                    dispatch(emailNotConfirmed())
                    dispatch(uiStopLoading())
                } else {
                    dispatch(uiStopLoading())
                    dispatch(emailConfirmed(parsedRes.idToken))
                }
                console.log(parsedRes)
            })
    }
};

export const authSignUpPassword = ( idToken, password ) => {
    return dispatch => {
        // dispatch(uiStartLoading())
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=AIzaSyAyQvYxr3o_us6OHsEBY3Gh99ny64DlZV0",
            {
                method: "POST",
                body: JSON.stringify({
                    idToken: idToken,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .catch(err => {
                console.log("Error in sign in password auth", err)
                dispatch(uiStopLoading())
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (parsedRes.error) {
                    alert(parsedRes.error.message)
                    // dispatch(emailNotConfirmed())
                    // dispatch(uiStopLoading())
                } else {
                    // this.props.navigation.dispatch(NavigationActions.navigate('Birthday'))
                    
                    dispatch(passwordConfirmed(parsedRes.idToken))
                    console.log("password success")
                }
                console.log(parsedRes)
            })
    }
};
