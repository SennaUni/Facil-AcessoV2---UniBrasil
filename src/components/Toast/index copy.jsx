import React, { useState, useEffect, useRef } from 'react';

import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Feather, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons'; 

import { 
    View, 
    Text, 
    StatusBar, 
    Platform, 
    TouchableWithoutFeedback, 
    Dimensions, 
    StyleSheet, 
    Animated, 
    Easing 
} from 'react-native';

import { 
    Container 
} from './styles';

const { height, width } = Dimensions.get('window');

export function Toast({ type, message, duraction }) {
    const [styleStatusBar, setStyleStatusBar] = useState('dark-content');
    const animate = useRef(new Animated.Value(0)).current;

    function show() {
        Animated.timing(animate, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.linear,
        }).start();
    }

    function hide() {
        Animated.timing(animate, {
            toValue: -(getStatusBarHeight() + 100),
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }

    function zIndex(value) {
        return Platform.select({
            ios: { zIndex: value },
            android: { elevation: value },
         })
    }

    const colors = {
        sucess: '#43D29E',
        warn: '#FD951F',
        error: '#E91E63',
        default: '#3A405B',
    };
    

    useEffect(() => {
        setStyleStatusBar('light-content');
        show();

        const timer = setTimeout(() => {
            hide();
            setStyleStatusBar('dark-content');
        }, 6000)

        return () => clearTimeout(timer);
    }, [])

  return (
    <View style={{ ...zIndex(100) }}>
        <StatusBar 
            barStyle={styleStatusBar}
            translucent={true}
            backgroundColor="transparent"
        />
        <TouchableWithoutFeedback>
            <Animated.View style={[styles.deafult, { backgroundColor: '#FF0000', transform: [{translateY: animate}] }]}>
                <View style={styles.header}>
                    <Ionicons 
                        name="md-close-circle" 
                        // name="alert-circle" 
                        size={26} 
                        color="#FFF" 
                        style={{ paddingRight: 10 }}
                    />
                    <Text style={styles.title}>Message</Text>
                </View>
                <Text style={styles.message}>Message</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
    deafult: {
        position: 'absolute',
        width,
        paddingHorizontal: 7,
        paddingBottom: 20,
        paddingTop: getStatusBarHeight() + 7,
        alignSelf: 'center',
        justifyContent: 'center',
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
    },
    header: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    title: {
        fontSize: 20,
        // fontWeight: 'bold'
        color: '#FFF',
    },
    message: {
        padding: 5,
        marginLeft: 10,
        fontSize: 16,
        color: '#FFF',
    }
});