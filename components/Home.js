import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { useColorScheme } from 'react-native-appearance';
import * as Location from 'expo-location'

import SvgImage from 'react-native-remote-svg'

import { connect } from 'react-redux'

import dayjs from 'dayjs'

import Today from './Today'

import { calculate } from '../actions/calculate'
import { clear } from '../actions/clear'


const Home = ({navigation, stateMoon, statePreferences, calculate, clear}) => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {      
        clear()
        load()
    }, []) 

    async function load() {  
        let { status } = await Location.requestPermissionsAsync();

        if(status !== 'granted') {
            setErrorMessage('Access to the location is needed to run the app.')
            return
        }

        const location = await Location.getCurrentPositionAsync();

        const {latitude, longitude} = location.coords

        const current = dayjs()
        const end = current.add(15, 'day')

        const c = current.format('YYYY-MM-DD')
        const e = end.format('YYYY-MM-DD')

        calculate([c,e,latitude,longitude])
        setLoading(false);
    }

    let colorScheme = useColorScheme();

    if (statePreferences.theme !== 'automatic') {
        colorScheme = statePreferences.theme;
    }

    let timeFormat = 'HH:mm'
    let timeFormatWithSeconds = 'HH:mm:ss'

    if (statePreferences.timeFormat == 12) {
        timeFormat = 'hh:mm A'
        timeFormatWithSeconds = 'hh:mm:ss A'
    }

    let textStyle = styles.lightText
    let containerStyle = styles.lightContainer

    if (colorScheme === 'dark') {
        containerStyle = styles.darkContainer
        textStyle = styles.darkText
    }

    if(loading) {
        if (colorScheme === 'dark') {
            return(
                <View style={[styles.container, containerStyle]}>
                    <SvgImage source={require('../assets/animations/loading-light.svg')} />
                </View>
            )
        } else {
            return(
                <View style={[styles.container, containerStyle]}>
                    <SvgImage source={require('../assets/animations/loading-dark.svg')} />
                </View>
            )
        }
    } else {
        return(
            <View style={[styles.container, containerStyle]}>
                <View style={{width:'45%',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[styles.text, textStyle]}>Moonrise</Text>
                        <Text style={[styles.text, textStyle]}>{dayjs(stateMoon.moonrise).format(timeFormat)}</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[styles.text, textStyle]}>Moonset</Text>
                        <Text style={[styles.text, textStyle]}>{dayjs(stateMoon.moonset).format(timeFormat)}</Text>
                    </View>
                </View>
                <Today navigation={navigation} phase={stateMoon.moonphase}/>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Details') }} style={[styles.appButtonContainer, {backgroundColor: '#efe450'}]}>
                        <Text style={[styles.appButtonText, {color: '#455252'}]}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ async () => { setLoading(true); clear(); await load(); }} style={[styles.appButtonContainer, {backgroundColor: '#455252'}]}>
                        <Text style={[styles.appButtonText, {color: '#efe450'}]}>Update</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.text,textStyle,styles.small]}>updated: {dayjs(stateMoon.updated).format('DD/MM/YYYY [at] ' + timeFormatWithSeconds)}</Text>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lightContainer: {

    },
    darkContainer: {
        backgroundColor: '#383838'
    },
    buttons: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    small: {
        fontSize: 10
    },
    appButtonContainer: {
        elevation: 5,
        backgroundColor: "#009688",
        borderRadius: 2,
        paddingVertical: 8,
        paddingHorizontal: 8
      },
      appButtonText: {
        fontSize: 15,
        color: "#fff",
        alignSelf: "center",
        textTransform: "uppercase",
        fontFamily: 'Montserrat_500Medium'
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
    stateMoon: state.moon.data,
    statePreferences: state.preference.preferences
})

const mapDispatchToProps = dispatch => {
    return{
        calculate: (value) => dispatch(calculate(value)),
        clear: () => dispatch(clear())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)