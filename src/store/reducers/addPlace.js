import { SET_PLACE, REMOVE_PLACE } from "../actions/actionTypes";

const initialState = {
    places: []
};

const reducer = (state = initialState, action) => {
    console.log(`addplaces reducers pumasok`)
    console.log(`places reducers: ${action.places}`)
    switch (action.type) {
        case SET_PLACE:
            return {
                ...state,
                places: action.places
            }
        case REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.id !== action.id;
                })
            };
        default:
            return state;
    }
}

export default reducer;