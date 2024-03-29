import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

import ListContainer from '../../components/ListContainer/ListContainer';
import { getPlaces } from '../../store/actions/index';

class FindPlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    }

    state = {
        placesLoaded: false,
        removeBtnAnim: new Animated.Value(1),
        showPlaceListAnim: new Animated.Value(0)
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentDidMount() {
        this.props.onLoadPlaces();
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }

    placesLoadedHandler = () => {
        Animated.timing(this.state.showPlaceListAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    placesSearchHandler = () => {
        // Animaatio hakunapille
        Animated.timing(this.state.removeBtnAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler();
        });
    }
    
    itemSelectedHandler = key => {
        // Tarkistetaan mikä kohde on valittuna vertaamalla keyt
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        // Pushataan lisätietoscreen näkyviin
        this.props.navigator.push({
            screen: "travellr.PlaceDetailScreen",
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }
        });
    }

    render() {
        // Näytetään joko lista kohteista tai hakunappi jos paikkoja ei ole
        let content = (
            // https://facebook.github.io/react-native/docs/animations.html
            <Animated.View style={{
                opacity: this.state.removeBtnAnim, 
                transform: [
                    {
                        scale: this.state.removeBtnAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 1]
                        })
                    }
                ]
            }}>
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );

        if (this.state.placesLoaded) {
            content = (
                // Lista feidaa sisään
                <Animated.View style={{opacity: this.state.showPlaceListAnim}}>
                <ListContainer 
                    places={this.props.places} 
                    onItemSelected={this.itemSelectedHandler} />
                </Animated.View>
            );
        }
        
        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    searchButton: {
        borderColor: "orange",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 26
    }
})

// Haetaan paikat reduxin statesta ja mapataan ne komponentin propseihin
const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadPlaces: () => dispatch(getPlaces())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);