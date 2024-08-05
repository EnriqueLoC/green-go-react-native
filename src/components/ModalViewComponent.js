import React, { useEffect, useContext } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from '../model/ThemeContext';

const ModalViewComponent = ({ visible, onRequestClose = () => {}, children = null }) => {

    const { isDarkTheme } = useContext(ThemeContext);

    const opacityValue = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(opacityValue, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onRequestClose}
        >
            <TouchableWithoutFeedback onPress={onRequestClose}>
                <Animated.View style={[styles.centeredView, { opacity: opacityValue }]}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.modalView, { backgroundColor: isDarkTheme ? '#111' : '#fff' }]}>
                            
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)', // semi-transparent background
    },
    modalView: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        height: '60%',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    closeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    bottomOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    optionButton: {
        backgroundColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default ModalViewComponent;
