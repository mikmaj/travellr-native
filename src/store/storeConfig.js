import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import placesReducer from './reducers/places';
import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
    places: placesReducer,
    ui: uiReducer,
    auth: authReducer
});

const composeEnhancers = compose;

// React Native Debugger
if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const storeConfig = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}

export default storeConfig;