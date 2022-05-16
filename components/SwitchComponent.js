import React from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'

import { useColorScheme } from 'react-native-appearance';

import { connect } from 'react-redux'

const SwitchComponent = ({title, value, onValueChange, statePreferences}) => {
    let colorScheme = useColorScheme();

    if (statePreferences.theme !== 'automatic') {
        colorScheme = statePreferences.theme;
    }

    let textStyle = styles.lightText
    let inactiveStyle = '#C8C8C8'
    let activeStyle = '#455252'
    
    if (colorScheme === 'dark') {
        textStyle = styles.darkText
        inactiveStyle = 'gray'
        activeStyle = '#efe450'
    }

    return (
        <View style={[styles.item]}>
                <Text style={[styles.text, textStyle]}>{title}</Text> 
                <Switch
                    trackColor={{ false: inactiveStyle, true: activeStyle }}
                    thumbColor={value ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={onValueChange}
                    value={value}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    text: {

    },
    lightText: {
        color: 'black'
    },
    darkText: {
        color: 'white'
    },
    item: {
        width: '95%',
        height: 80,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        marginVertical: 5,
        borderRadius: 10
    }
  });

const mapStateToProps = (state) => ({
    statePreferences: state.preference.preferences
})

export default connect(mapStateToProps)(SwitchComponent)