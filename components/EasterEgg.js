import React from 'react'
import { View, StyleSheet, Vibration } from 'react-native'

import { useColorScheme } from 'react-native-appearance';

import SvgImage from 'react-native-remote-svg'

import { connect } from 'react-redux'

const EasterEgg = ({navigation, statePreferences}) => {
    
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            Vibration.cancel();
        });
    
        return unsubscribe;
      }, [navigation]);

    let colorScheme = useColorScheme();

    if (statePreferences.theme !== 'automatic') {
        colorScheme = statePreferences.theme;
    }

    let containerStyle = styles.lightContainer;

    if (colorScheme === 'dark') {
        containerStyle = styles.darkContainer;
    }

    Vibration.vibrate([500,250], true)

    return (
        <View style={[styles.container, containerStyle]}>
            <SvgImage
                source={require('../assets/animations/loop.svg')}
                style={styles.svg}
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
        backgroundColor: '#383838'
    },
    svg: {
        height: 400,
        width: 400
    }
});

const mapStateToProps = (state) => ({
    statePreferences: state.preference.preferences
})

export default connect(mapStateToProps)(EasterEgg)
