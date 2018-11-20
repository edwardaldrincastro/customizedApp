import { ADD_USER } from "../actions/actionTypes";

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

