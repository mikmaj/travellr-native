import { SET_PLACES, REMOVE_PLACE} from '../actions/actionTypes';

// Alkuperäinen state ennen muutoksia
const initialState = {
    places: []
};

// Reducer ottaa sovelluksen nykyisen tilan ja päivittää siihen actionin kautta 
// tulevat uudet arvot. Tämän jälkeen päivitetty tila on käytettävissä koko sovelluksen laajuisesti.
// Ei koskaan muuteta vanhaa statea (immutability) vaan kopioidaan sen sisältö 
// ja palautetaan uusi state-objekti
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACES: 
            return {
                ...state,
                places: action.places
            };
        case REMOVE_PLACE:
            return {
                ...state,
                // Iteroidaan places-arrayta ja verrataan jokaisen kohteen key-arvoa valitun kohteen key-arvoon
                places: state.places.filter(place => {
                    return place.key !== action.key;
                })
            };
      default:
      return state;
    }
};

export default reducer;