import { SET_PLACE, REMOVE_PLACE, DELETE_IMAGE, DELETE_LOCATION, DELETE_PLACE_NAME } from "../actions/actionTypes";
import { uiStartLoading, uiStopLoading } from "./ui";

export const addPlace = (placeName, image, latitude, longitude) => {
    console.log("Initializing addPlace...")
    return dispatch => {
        dispatch(uiStartLoading())
        fetch("https://us-central1-modifiedting-1541990454966.cloudfunctions.net/storeImage",
            {
                method: "POST",
                body: JSON.stringify({
                    image: image
                })
            })
            .catch(err => {
                console.log(err)
                alert("Something went wrong in uploading the image")
                dispatch(uiStopLoading())
            })
            .then(res =>
                res.json()
            )
            .then(parsedRes => {
                console.log(parsedRes)
                const placeData = {
                    placeName: placeName,
                    image: parsedRes.imageUrl,
                    location: {
                        latitude: latitude,
                        longitude: longitude
                    }
                }
                return fetch("https://modifiedting-1541990454966.firebaseio.com/places.json",
                    {
                        method: "POST",
                        body: JSON.stringify(placeData)
                    })
                    .catch(err => {
                        console.log(err)
                        alert("Something went wrong in sending the data")
                        dispatch(uiStopLoading())
                    })
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("addPlace success!", parsedRes);
                dispatch(uiStopLoading())
                dispatch(getPlaces())
            })
    }
}

export const getPlaces = () => {
    console.log("Initializing getPlaces...")
    return dispatch => {

        dispatch(uiStartLoading())
        fetch("https://modifiedting-1541990454966.firebaseio.com/places.json")
            .catch(err => {
                console.log(err)
                alert("Something went wrong in getting the data")
                dispatch(uiStopLoading())
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("getPlaces success!", parsedRes);
                const places = []
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        id: key
                    })
                }
                dispatch(uiStopLoading())
                dispatch(setPlaces(places))
                dispatch(deleteImage())
                dispatch(deleteLocation())
                dispatch(deletePlaceName())
            })
    }
}

export const setPlaces = places => {
    console.log("Initializing setPlaces...")
    return {
        type: SET_PLACE,
        places: places,
    }
}
export const deleteImage = () => {
    console.log("Initiliazing deleteImage...")
    return {
        type: DELETE_IMAGE,
    }
}
export const deleteLocation = () => {
    console.log("Initializing deleteLocation...")
    return {
        type: DELETE_LOCATION,
    }
}
export const deletePlaceName = () => {
    console.log("Initializing deletePlaceName...")
    return {
        type: DELETE_PLACE_NAME,
    }
}

export const deletePlace = (key) => {
    console.log("Initializing deletePlace...", key)
    return dispatch => {
        dispatch(removePlace(key));
        fetch("https://modifiedting-1541990454966.firebaseio.com/places/" + key + ".json", {
            method: "DELETE"
        })
            .catch(err => {
                alert("Something went wrong in delete, sorry :/");
                console.log(err);
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("deletePlace success!", parsedRes);
            })
    }
}

export const removePlace = key => {
    console.log("Initializing removePlace...", key)
    return {
        type: REMOVE_PLACE,
        id: key
    }
}