import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { useColorScheme } from 'react-native-appearance'

import { connect } from 'react-redux'

import { FirstQuarter, FullMoon, 
    LastQuarter, NewMoon, WaningCrescent,
    WaningGibbous, WaxingCrescent, WaxingGibbous } from './SvgComponent'
   
const SingleDay = ({value, statePreferences}) => {

    // let colorScheme = useColorScheme();

    let colorScheme = useColorScheme();

    if (statePreferences.theme !== 'automatic') {
        colorScheme = statePreferences.theme;
    }

    let titleStyle = styles.lightTitle;

    if (colorScheme === 'dark') {
        titleStyle = styles.darkTitle;
    }

    let svg = null

    if (value == 'New Moon') {
        svg = <NewMoon width="60" height="60" strokeWidth="5" />
    } else if (value == 'Waxing Crescent') {
        svg = <WaxingCrescent width="60" height="60" strokeWidth="5" />
    } else if (value == 'First Quarter') {
        svg = <FirstQuarter width="60" height="60" strokeWidth="5" />
    } else if (value == 'Waxing Gibbous') {
        svg = <WaxingGibbous width="60" height="60" strokeWidth="5" />
    } else if (value == 'Full Moon') {
        svg = <FullMoon width="60" height="60" strokeWidth="5" />
    } else if (value == 'Waning Gibbous') {
        svg = <WaningGibbous width="60" height="60" strokeWidth="5" />
    } else if (value == 'Third Quarter') {
        svg = <LastQuarter width="60" height="60" strokeWidth="5" />
    } else if (value == 'Waning Crescent') {
        svg = <WaningCrescent width="60" height="60" strokeWidth="5" />
    }


    return (
        <View style={styles.view}>
            <View style={styles.imageView}>
                {svg}
            </View>
            <View style={styles.textView}>
                <Text style={[styles.title, titleStyle]}>{value}</Text>
            </View>
        </View>
    )
}


const mapStateToProps = (state) => ({
    statePreferences: state.preference.preferences
})

export default connect(mapStateToProps)(SingleDay)

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textView: {
        flex: 2,
        justifyContent: 'center',
        alignItems:'center'
    },
    imageView: {
        flex: 1
    },
    img: {
        resizeMode: 'stretch',
        width: 60,
        height: 60
    },
    title: {

    },
    lightTitle: {
        color: 'black'
    },
    darkTitle: {
        color: 'white'
    }
})
