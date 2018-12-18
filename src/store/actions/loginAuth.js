import { USER_LOGIN } from "../actions/actionTypes";
import { NavigationActions } from 'react-navigation';
import { loginSuccessful } from "./ui";
export const login = ( email, password ) => {
    return dispatch => {
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAyQvYxr3o_us6OHsEBY3Gh99ny64DlZV0",
            {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .catch(err => {
                console.log("Error in log in auth", err)
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (parsedRes.error) {
                    alert(parsedRes.error.message)
                } else {
                    // dispatch(NavigationActions.navigate({routeName: 'Entry'}))
                    dispatch(loginSuccessful(true))
                    console.log("success")
                }
                console.log(parsedRes)
            })
    }
};

