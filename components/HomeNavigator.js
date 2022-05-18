import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import { useColorScheme } from 'react-native-appearance';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { connect } from 'react-redux'

import Home from './Home'
import Details from './Details'
import EasterEgg from './EasterEgg'

const Stack = createStackNavigator();

const HomeNavigator = ({statePreferences}) => {

    let colorScheme = useColorScheme();

    if (statePreferences.theme !== 'automatic') {
        colorScheme = statePreferences.theme;
    }
    let backgroundColor = 'white'
    let textColor = 'black'

    if (colorScheme === 'dark') {
        backgroundColor = 'black'
        textColor = 'white'
    }

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{animationEnabled: false, headerStyle: {backgroundColor: backgroundColor}, headerTintColor:textColor, headerTitleAlign: 'center'}}>
                <Stack.Screen options={{headerShown: false}}   name="Home" component={Home} />
                <Stack.Screen name="Details" options={{headerTitleStyle: {fontFamily: 'Montserrat_500Medium'}}} component={Details} />
                <Stack.Screen name="EasterEgg" options={{headerTitleStyle: {fontFamily: 'Montserrat_500Medium'}}} component={EasterEgg} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = (state) => ({
    statePreferences: state.preference.preferences
})

export default connect(mapStateToProps)(HomeNavigator)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})