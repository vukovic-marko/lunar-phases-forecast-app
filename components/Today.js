import React from 'react'
import { View, Text, StyleSheet, ToastAndroid } from 'react-native'

import { useColorScheme } from 'react-native-appearance';

import Egg from 'react-native-egg';

import { connect } from 'react-redux'

import { FirstQuarter, FullMoon, 
    LastQuarter, NewMoon, WaningCrescent,
    WaningGibbous, WaxingCrescent, WaxingGibbous } from './SvgComponent'

const Today = ({phase, navigation, statePreferences}) => {

    // let height = Math.round(Dimensions.get('window').width/Dimensions.get('window').height*50)+'%'

    // let colorScheme = useColorScheme();

    let colorScheme = useColorScheme();

    if (statePreferences.theme !== 'automatic') {
        colorScheme = statePreferences.theme;
    }

    let titleStyle = styles.lightTitle

    if (colorScheme === 'dark') {
        titleStyle = styles.darkTitle
    }

    let svg = null

    if (phase == 'New Moon') {
        svg = <NewMoon width="120" height="120" strokeWidth="4" />
    } else if (phase == 'Waxing Crescent') {
        svg = <WaxingCrescent width="120" height="120" strokeWidth="4" />
    } else if (phase == 'First Quarter') {
        svg = <FirstQuarter width="120" height="120" strokeWidth="4" />
    } else if (phase == 'Waxing Gibbous') {
        svg = <WaxingGibbous width="120" height="120" strokeWidth="4" />
    } else if (phase == 'Full Moon') {
        svg = <FullMoon width="120" height="120" strokeWidth="4" />
    } else if (phase == 'Waning Gibbous') {
        svg = <WaningGibbous width="120" height="120" strokeWidth="4" />
    } else if (phase == 'Third Quarter') {
        svg = <LastQuarter width="120" height="120" strokeWidth="4" />
    } else if (phase == 'Waning Crescent') {
        svg = <WaningCrescent width="120" height="120" strokeWidth="4" />
    }

    return (
        <View style={[styles.view, {height: 170}]}>
            {svg}
            
            <Egg
                setps={'TTT'}
                onCatch={() => { navigation.navigate('EasterEgg') }}
                onAction={() => ToastAndroid.show('Try clicking a few more times!',ToastAndroid.SHORT)}
            >
                <Text style={[styles.title, titleStyle]}>{phase}</Text>
            </Egg>
        </View>
    )
}

const mapStateToProps = (state) => ({
    statePreferences: state.preference.preferences
})

export default connect(mapStateToProps)(Today)

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    lightTitle: {
        color: 'black'
    },
    darkTitle: {
        color: 'white'
    }
})
