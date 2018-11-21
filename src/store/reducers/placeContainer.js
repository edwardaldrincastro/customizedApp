import { ADD_IMAGE, DELETE_IMAGE, ADD_LOCATION, DELETE_LOCATION, ADD_PLACE_NAME, DELETE_PLACE_NAME } from "../actions/actionTypes";

const initialState = {
    placeContainer: {
        image: {
            uri: null,
            base64: null
        },
        location: {
            latitude: null,
            longitude: null
        },
        name: null
    }
};

const reducer = (state = initialState, action) => {
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
        case ADD_PLACE_NAME:
            return {
                ...state,
                placeContainer: {
                    ...state.placeContainer,
                    name: action.name
                }
            }
        case DELETE_PLACE_NAME:
            return {
                ...state,
                placeContainer: {
                    ...state.placeContainer,
                    name: null
                }
            };
        default:
            return state;
    }
}

export default reducer;