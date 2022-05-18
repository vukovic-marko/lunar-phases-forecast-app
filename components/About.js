import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'

import { useColorScheme } from 'react-native-appearance';
import { SafeAreaView } from 'react-native-safe-area-context';

import { connect } from 'react-redux'

import { FirstQuarter, FullMoon, 
         LastQuarter, NewMoon, WaningCrescent,
         WaningGibbous, WaxingCrescent, WaxingGibbous } from './SvgComponent'

const About = ({statePreferences}) => {
    let colorScheme = useColorScheme();
    
    if (statePreferences.theme !== 'automatic') {
        colorScheme = statePreferences.theme;
    }

    let containerStyle = styles.lightContainer
    
    let textStyle = styles.lightText

    if (colorScheme === 'dark') {
        containerStyle = styles.darkContainer
        textStyle = styles.darkText
    }

    return (
        <SafeAreaView style={[styles.container, containerStyle]}>
        <ScrollView 
            
            contentContainerStyle={{flexGrow: 1,alignItems: 'center', justifyContent: 'center', paddingVertical: 20}}
        >
            <NewMoon />
            <WaxingCrescent />           
            <FirstQuarter />
            <WaxingGibbous />
            <FullMoon />
            <WaningGibbous />
            <LastQuarter />
            <WaningCrescent />

            <Text></Text>
            <Text style={[styles.text,textStyle]}>Author: Marko</Text>
            <Text style={[styles.text,textStyle]}>Written in React Native using Expo</Text>
            <Text style={[styles.text,textStyle]}>Icons from loading.io</Text>
        </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    lightContainer: {

    },
    darkContainer: {
        backgroundColor: '#383838'
    }, 
    text: {
        fontFamily: 'Montserrat_300Light'
    },
    lightText: {
        color: 'black'
    },
    darkText: {
        color: 'white'
    }
})

const mapStateToProps = (state) => ({
    statePreferences: state.preference.preferences
})

export default connect(mapStateToProps)(About)