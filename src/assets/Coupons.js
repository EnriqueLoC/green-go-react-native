import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { ThemeContext } from '../model/ThemeContext';

export default function Coupons() {

    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={[styles.card, { backgroundColor: 'red' }]}>
                    <Image source={require('./images/Oxxo.png')} style={styles.logo} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>10%</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>20%</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>30%</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.card, { backgroundColor: '#bdbdbd' }]}>
                    <Image source={require('./images/costco.png')} style={styles.logo} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>10%</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>20%</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>30%</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.card, { backgroundColor: 'blue' }]}>
                    <Image source={require('./images/Sams.png')} style={styles.logo} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>10%</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>20%</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>30%</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollView: {
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 20
    },
    card: {
        width: 200,
        height: 200,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: -15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});
