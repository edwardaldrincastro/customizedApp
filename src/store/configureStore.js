import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import signUpReducers from './reducers/signUp';
import addPlaceReducers from './reducers/addPlace';
import placeContainerReducers from "./reducers/placeContainer";
import uiReducers from "./reducers/ui";

const rootReducer = combineReducers({
    signUp: signUpReducers,
    addPlace: addPlaceReducers,
    placeContainer: placeContainerReducers,
    ui: uiReducers
});

let composeEnhancers =  compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;