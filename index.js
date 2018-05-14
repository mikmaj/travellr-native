import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import storeConfig from './src/store/storeConfig';

// Luodaan redux store ja annetaan se redux providerille
const store = storeConfig();

const ReactRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent('Travellr', () => ReactRedux);