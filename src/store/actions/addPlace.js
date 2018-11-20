import { SET_PLACE, REMOVE_PLACE, DELETE_IMAGE, DELETE_LOCATION } from "../actions/actionTypes";
import { uiStartLoading, uiStopLoading } from "./ui";

export const addPlace = (placeName, image, latitude, longitude) => {
    return dispatch => {
        dispatch(uiStartLoading())
        console.log(`Action start placeName: ${placeName}`)
        console.log(`Action start longitude: ${longitude}`)
        console.log(`Action start latitude: ${latitude}`)
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
            })
            .catch(err => {
                console.log(err)
                alert("Something went wrong in sending the data")
                dispatch(uiStopLoading())
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes)
                dispatch(uiStopLoading())
                dispatch(getPlaces())
            })
    }
}

export const getPlaces = () => {
    console.log("pumasok sa getPlaces")
    return dispatch => {
        fetch("https://modifiedting-1541990454966.firebaseio.com/places.json")
            .catch(err => {
                console.log(err)
                alert("Something went wrong in getting the data")
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("pumasok sa parsedRes get")
                console.log(parsedRes)
                const places = []
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        id: key
                    })
                }

                console.log("after ng forloop get")
                dispatch(setPlaces(places))
                dispatch(deleteImage())
                dispatch(deleteLocation())

                console.log("done sa dispatch")
            })
    }
}

export const setPlaces = places => {
    console.log("pumasok sa setPlaces")
    console.log(`setPlaces: ${places}`)
    return {
        type: SET_PLACE,
        places: places,
    }
}
export const deleteImage = () => {
    console.log("pumasok sa deleteImage")
    return {
        type: DELETE_IMAGE,
    }
}
export const deleteLocation = () => {
    console.log("pumasok sa delete location")
    return {
        type: DELETE_LOCATION,
    }
}

export const deletePlace = (key) => {
    console.log("pumasok sa delete place", key)
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
                console.log("Done sa deleteplace!");
            })
    }
}

export const removePlace = key => {
    console.log("pumasok sa remove place", key)
    return {
        type: REMOVE_PLACE,
        id: key
    }
}