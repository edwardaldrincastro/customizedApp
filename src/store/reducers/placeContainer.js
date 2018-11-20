import { ADD_IMAGE, DELETE_IMAGE, ADD_LOCATION, DELETE_LOCATION } from "../actions/actionTypes";

const initialState = {
    placeContainer: {
        image: {
            uri: null,
            base64: null
        },
        location: {
            latitude: null,
            longitude: null
        }
    }
};

const reducer = (state = initialState, action) => {
    console.log(`addimage reducers pumasok`)
    switch (action.type) {
        case ADD_IMAGE:
            return {
                ...state,
                placeContainer: {
                    ...state.placeContainer,
                    image: {
                        uri: action.image.uri,
                        base64: action.image.base64
                    }
                }
            }
        case DELETE_IMAGE:
            return {
                ...state,
                placeContainer: {
                    ...state.placeContainer,
                    image: {
                        uri: null,
                        base64: null
                    }
                }
            };
        case ADD_LOCATION:
            return {
                ...state,
                placeContainer: {
                    ...state.placeContainer,
                    location: {
                        latitude: action.location.latitude,
                        longitude: action.location.longitude
                    }
                }
            }
        case DELETE_LOCATION:
            return {
                ...state,
                placeContainer: {
                    ...state.placeContainer,
                    location: {
                        latitude: null,
                        longitude: null
                    }
                }
            };
        default:
            return state;
    }
}

export default reducer;