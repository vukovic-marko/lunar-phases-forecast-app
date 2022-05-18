import React from 'react'
import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native-appearance';
import { StatusBar } from 'expo-status-bar'

import {connect} from 'react-redux'

import HomeNavigator from './HomeNavigator'
import About from './About'
import Settings from './Settings'

const BottomTab = createBottomTabNavigator();

const Tab = ({statePreferences}) => {

    let colorScheme = useColorScheme();

    if (statePreferences.theme !== 'automatic') {
        colorScheme = statePreferences.theme;
    }

    let backgroundColor = 'white'
    let activeTintColor = '#455252'
    let inactiveTintColor = '#C8C8C8'
    let borderTopColor = 'white'
    let statusBarStyle = 'dark'

  
    if (colorScheme == 'dark') {
      backgroundColor = '#383838'
      activeTintColor = '#ffffff'
      inactiveTintColor = 'gray' 
      borderTopColor = 'black'
      statusBarStyle = 'light'

    }

    return (
        <NavigationContainer>
            <StatusBar style={statusBarStyle} />
              <BottomTab.Navigator 
              initialRouteName="Home"
              backBehavior="initialRoute" 
              tabBarOptions={{ labelStyle: {fontFamily: "Montserrat_300Light"}, activeTintColor: activeTintColor, inactiveTintColor: inactiveTintColor, style: {backgroundColor: backgroundColor, borderTopColor: borderTopColor}}}
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Home') {
                    iconName = 'ios-home'
                  } else if (route.name === 'About') {
                    iconName = 'ios-information-circle';
                  } else if (route.name === 'Settings') {
                    iconName = 'ios-settings'
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}>
                  <BottomTab.Screen name="Home" component={HomeNavigator} />
                  <BottomTab.Screen name="About" component={About} />
                  <BottomTab.Screen name ="Settings" component={Settings} />
              </BottomTab.Navigator>
          </NavigationContainer>
    )
}


const mapStateToProps = (state) => ({
    statePreferences: state.preference.preferences
})

export default connect(mapStateToProps)(Tab)
