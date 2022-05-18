import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 

import { useColorScheme } from 'react-native-appearance'

import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';

import { connect } from 'react-redux'

import dayjs from 'dayjs'

import SingleDay from './SingleDay'

const ListItem = ({item, statePreferences}) => {

    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    let colorScheme = useColorScheme();

    if (statePreferences.theme !== 'automatic') {
        colorScheme = statePreferences.theme;
    }

    let itemStyle = styles.lightItem;
    let textStyle = styles.lightText;
    let buttonColor = 'black'
    let buttonBackgroundColor = 'white'
    let dialogStyle = styles.lightDialog
    let underlayStyle = "#F5F5F5"

    if (colorScheme === 'dark') {
        itemStyle = styles.darkItem;
        textStyle = styles.darkText;
        buttonColor = 'white'
        buttonBackgroundColor = '#383838'
        dialogStyle = styles.darkDialog
        underlayStyle = "#383838"
    }
    
    let moonrise;
    let moonset;

    let timeFormat = 'HH:mm'
    if (statePreferences.timeFormat == 12) {
        timeFormat = 'hh:mm A'
    }


    if (item.moonrise != null) {
        moonrise = <Text style={[styles.text, textStyle]}>{dayjs(item.moonrise).format(timeFormat)}</Text>
    } else if (item.moonrise == null)
        moonrise = 
            <View style={styles.none}>
                <Text style={[styles.text, textStyle]}>-</Text>
                <View style={styles.btnview}>        
                    <AntDesign.Button 
                        style={styles.btn}
                        iconStyle = {styles.icon}
                        name="questioncircleo" 
                        size={22} 
                        color={buttonColor}
                        backgroundColor={buttonBackgroundColor}
                        borderRadius={0}
                        onPress={() => {
                            setTitle('Why isn\'t moonrise time listed for this date?');
                            setContent('On some days, the Moon does not rise. Because the Moon is constantly in motion, the time span from one moonrise to the next is a little longer than 24 hours. For example, if the Moon rises just before midnight on day 1, it may not rise again until just after midnight on day 3, meaning that day 2 does not have a moonrise.');
                            setVisible(true);
                        }}
                    />
                </View>
            </View>

    if (item.moonset != null) {
        moonset = <Text style={[styles.text, textStyle]}>{dayjs(item.moonset).format(timeFormat)}</Text>;
    } else if (item.moonset == null)
        moonset = 
            <View style={styles.none}>
                <Text style={[styles.text, textStyle]}>-</Text>
                <View style={styles.btnview}>
                    <AntDesign.Button 
                        style={styles.btn}
                        iconStyle = {styles.icon}
                        name="questioncircleo" 
                        size={22} 
                        color={buttonColor}
                        backgroundColor={buttonBackgroundColor}
                        borderRadius={0}
                        onPress={() => {
                            setTitle('Why isn\'t moonset time listed for this date?');
                            setContent('On some days, the Moon does not set. Because the Moon is constantly in motion, the time span from one moonset to the next is a little longer than 24 hours. For example, if the Moon sets just before midnight on day 1, it may not set again until just after midnight on day 3, meaning that day 2 does not have a moonset.');
                            setVisible(true);
                        }}
                    />
                </View>
            </View>
    
    if (dayjs(item.moonset).isBefore(dayjs(item.moonrise))) {
        moonset = 
            <View style={styles.none}>
                <Text style={[styles.text, textStyle, {fontStyle:'italic', marginLeft: 1}]}>{dayjs(item.moonset).format(timeFormat)} </Text>
                <View style={styles.btnview}>
                    <AntDesign.Button 
                        style={styles.btn}
                        iconStyle = {styles.icon}
                        name="questioncircleo" 
                        size={22} 
                        color={buttonColor} 
                        backgroundColor={buttonBackgroundColor}
                        borderRadius={0}
                        onPress={() => {
                            setTitle('Why is moonset earlier than moonrise on this date?');
                            setContent('On some days, the Moon sets in the day after it\'s corresponding moonrise. In this case, a moonset happens before a moonrise, because the moonset actually corresponds to the moonrise of the previous day. To see the moonset corresponding to the moonrise of a current day, please refer to moonset time for the next day.')
                            setVisible(true);
                        }}
                    />
                </View>
            </View>
    }

    return (
        <View style={[styles.item, itemStyle]}>
            <Dialog
                dialogTitle={<DialogTitle textStyle={[textStyle, {fontFamily: 'Montserrat_500Medium'}]} hasTitleBar={false} title={title} />}
                rounded={false}
                visible={visible}
                dialogStyle={dialogStyle}
                width={0.85}
                onHardwareBackPress={() => {
                    setVisible(false);
                    return true;
                }}
                onTouchOutside={() => {
                    setVisible(false);
                }}
            >
                <DialogContent>
                    <Text style={[textStyle, {fontSize: 16, fontFamily: 'Montserrat_400Regular'}]}>{content}</Text>
                </DialogContent>

                    <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={underlayStyle}
                    onPress={() => {
                        setVisible(false);
                    }}
                    >
                        <View style={{height: 40, margin:10, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={[textStyle, {fontSize: 16, textAlign: 'center', fontFamily: 'Montserrat_500Medium'}]}>OK</Text>
                        </View>
                    </TouchableHighlight>
            </Dialog>
            <View style={styles.view}>
                <Text style={[styles.text, textStyle]}>{dayjs(item.date).format('DD/MM')}</Text>
            </View>
            <View style={styles.moonphase}>
                <SingleDay value={item.moonphase} />
            </View>
            <View style={styles.column}>
                <View style={styles.view}>
                    <Text style={[styles.text, textStyle]}>Moonrise:</Text>  
                    {moonrise}
                </View>
                <View style={styles.view}>
                    <Text style={[styles.text, textStyle]}>Moonset:</Text>    
                    {moonset}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginHorizontal:5,
        marginVertical:2.5,
        borderWidth: 1
    },
    lightItem: {
        backgroundColor: 'white'
    },
    darkItem: {
        backgroundColor: '#383838'
    },
    text: {
        fontFamily: 'Montserrat_400Regular'
    },
    lightText: {
        color: 'black'
    },
    darkText: {
        color: 'white'
    },
    view: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    moonphase: {
        flex: 3
    },
    column: {
        flex: 1.8,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    none: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        padding:0,
    },
    icon: {
        marginRight: 0
    },
    btnview: {
        alignItems: 'flex-end',
        position: 'absolute',
        right: 0
    },
    lightDialog: {
        backgroundColor: 'white'
    },
    darkDialog: {
        backgroundColor: 'black'
    }
})

const mapStateToProps = (state) => ({
    statePreferences: state.preference.preferences
})

export default connect(mapStateToProps)(ListItem)
