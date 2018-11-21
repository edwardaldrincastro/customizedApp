import { ADD_LOCATION, ADD_IMAGE, ADD_PLACE_NAME } from "../actions/actionTypes";

export const addLocation = (location) => {
    console.log("Initializing addLocation...")
    return {
        type: ADD_LOCATION,
        location: {
            latitude: location.latitude,
            longitude: location.longitude
        }
    }
}

export const addImage = (image) => {
    console.log("Initializing addImage...")
    return {
        type: ADD_IMAGE,
        image: {
            uri: image.uri,
            base64: image.base64
        }
    }
}
export const addPlaceName = (placeName) => {
    console.log("Initializing addPlaceName...")
    return {
        type: ADD_PLACE_NAME,
        name: placeName
    }
}

