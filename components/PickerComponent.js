import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { useColorScheme } from 'react-native-appearance'
import { Picker } from '@react-native-community/picker'

import { connect } from 'react-redux'

const PickerComponent = ({title, value, onValueChange, items, statePreferences}) => {
    let colorScheme = useColorScheme();

    if (statePreferences.theme !== 'automatic') {
        colorScheme = statePreferences.theme;
    }

    let textStyle = styles.lightText
    
    if (colorScheme === 'dark') {
        textStyle = styles.darkText
    }

    return (
        <View style={[styles.item]}>
                <Text style={[styles.text, textStyle]}>{title}</Text> 
                <View style={{borderColor: 'grey', borderWidth: 1, borderStyle: 'solid', borderRadius: 0}}>
                <Picker
                    selectedValue={value}
                    style={[{ height: 50, width: 150}, textStyle]}
                    onValueChange={onValueChange}
                    mode="dropdown"
                >
                    {Object.keys(items).map((key) => {
                        return (
                            <Picker.Item key={key} label={items[key]} value={key}/>
                        );})}
                </Picker>
                </View>
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

export default connect(mapStateToProps)(PickerComponent)