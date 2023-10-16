import React, { useState, useEffect, useRef } from 'react';

import { FontAwesome } from '@expo/vector-icons'; 

import { 
    Animated,
} from 'react-native';

import { 
    Container,
    Message,
    Content,
} from './styles';

const types = { 
    success: {
        background: '#43D29E',
        icon: 'check-circle',
    },
    warning: {
        background: '#FD951F',
        icon: 'warning',
    },
    error: {
        background: '#E91E63',
        icon: 'times-circle',
    } 
};

export function Toast({ message, removeToast }) {
    const opacity = useRef(new Animated.Value(0)).current;

    const { description, id, title, type } = message;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start(() => {
            removeToast();
        });
    }, [])

  return ( 
    <Animated.View style={{
        opacity,
        transform: [
            {
                translateX: opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                })
            }
        ],
        margin: 10,
        marginBottom: 5,
        padding: 10,
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
        zIndex: 6,
        backgroundColor: types[type].background,
    }}>
        <Container>
            <FontAwesome 
                name={types[type].icon} 
                size={26} 
                color="#FFF"
            />
            <Message>{ title }</Message>
        </Container>
        <Content>{ description }</Content>
    </Animated.View>
  );
}