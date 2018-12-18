import { USER_LOGIN } from "../actions/actionTypes";

const initialState = {
    firstName: "",
    lastName: "",
    email: " ",
    birthday: "",
    password: " ",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                birthday: "01/01/98",
                password: "password"

            }
        default:
            return state;
            }
    }

    export default reducer;