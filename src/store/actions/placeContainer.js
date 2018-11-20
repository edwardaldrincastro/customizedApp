import { ADD_LOCATION, ADD_IMAGE } from "../actions/actionTypes";

export const addLocation = (location) => {
    console.log("pumasok sa addImage")
    return {
        type: ADD_LOCATION,
        location: {
            latitude: location.latitude,
            longitude: location.longitude
        }
    }
}

export const addImage = (image) => {
    console.log("pumasok sa addImage")
    return {
        type: ADD_IMAGE,
        image: {
            uri: image.uri,
            base64: image.base64
        }
    }
}
