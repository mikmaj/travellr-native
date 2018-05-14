import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import storeConfig from './src/store/storeConfig';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

console.ignoredYellowBox = ['Warning: componentWillReceiveProps', 'Warning: componentWillUpdate', 'Warning: componentWillMount', 'Warning: Failed child context type'];

// Luodaan redux store ja annetaan se redux providerille
const store = storeConfig();

// Screenin rekisteröinti
// Annetaan store ja provider niille komponenteille jotka tarvitsevat pääsyn globaaliin stateen
Navigation.registerComponent("travellr.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("travellr.SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("travellr.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("travellr.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent("travellr.SideDrawer", () => SideDrawer, store, Provider);

// Sovelluksen käynnistys
Navigation.startSingleScreenApp({
  screen: {
    screen: 'travellr.AuthScreen',
    title: "Login"
  }
});