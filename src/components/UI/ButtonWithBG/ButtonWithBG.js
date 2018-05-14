import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform } from 'react-native';

const buttonWithBG = props => {
    const content = (
        <View style={[styles.button, { backgroundColor: props.color }, props.disabled ? styles.disabled : null]}>
            <Text style={props.disabled ? styles.disabledText : null}>{props.children}</Text>
        </View>
    );
    // Jos nappi on poissa käytöstä, palautetaan pelkkä napin näkymä
    if (props.disabled) {
        return content;
    }
    // Käytetään Platform-APIa tarkistamaan käyttöjärjestelmä ja 
    // näytetään eri button-animaatiot sen perusteella
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        );
    } else {
        return (
            <TouchableOpacity onPress={props.onPress}>
                {content}
            </TouchableOpacity>
        );
    }
    
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black"
    },
    disabled: {
        backgroundColor: "#eee",
        borderColor: '#aaa'
    },
    disabledText: {
        color: "#aaa"
    }
})

export default buttonWithBG;