import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import { useColorScheme } from 'react-native-appearance';

import { connect } from 'react-redux'

import ListItem from './ListItem'

const Details = ({navigation, stateMoon, statePreferences}) => {

    let colorScheme = useColorScheme();

    if (statePreferences.theme !== 'automatic') {
        colorScheme = statePreferences.theme;
    }

    let containerStyle = styles.lightContainer;

    if (colorScheme === 'dark') {
        containerStyle = styles.darkContainer;
    }

    return(
        <View style={[styles.container, containerStyle]}>
            <FlatList
                data={stateMoon.forecast}
                renderItem={({item}) => <ListItem item={item}/>
                }
                style={styles.flatlist}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
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
        backgroundColor: 'black'
    },
    flatlist: {
        width: '100%'
    }
})

const mapStateToProps = (state) => ({
    stateMoon: state.moon.data,
    statePreferences: state.preference.preferences
})

export default connect(mapStateToProps)(Details)