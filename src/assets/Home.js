import React, { useContext } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { ThemeContext } from '../model/ThemeContext';

const { height: windowHeight } = Dimensions.get('window');

export default function Home({ promptAsync }) {

    const { isDarkTheme } = useContext(ThemeContext);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: isDarkTheme ? 'rgba(25, 25, 25, 0.5)' : 'rgba(255, 255, 255, 0.5)'}]}>
            <View style={styles.backgroundContainer}>
                <MaskedView style={styles.maskedView} maskElement={
                    <LinearGradient
                        colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
                        style={styles.gradient}
                    />
                }>
                    <Image
                        source={require('./images/cardboard_boxes.png')}
                        style={styles.backgroundImage}
                    />
                </MaskedView>
                <View style={styles.overlay}>
                    <Image
                        source={require('./images/recycle.png')}
                        style={styles.headerImg}
                        alt="Logo"
                    />
                    <Text style={[styles.title, {color: isDarkTheme ? "#fff" : "#000"}]}>GREEN GO</Text>
                </View>
                <View>
                    <Text style={styles.description}>Join us today and help us bring a better and brighter future!</Text>
                </View>
                <TouchableOpacity style={styles.signInWithGoogle} onPress={() => promptAsync()}>
                    <Image
                        source={require('./images/google_icon.png')} // Asegúrate de tener el logo de Google
                        style={styles.socialIconGoogle}
                    />
                    <Text style={styles.buttonGoogleText}>Sign in with{" "}  
                        <Text style={{ color:"#4285F4" }}>G</Text>
                        <Text style={{ color:"#EA4336" }}>o</Text>
                        <Text style={{ color:"#FBBC04" }}>o</Text>
                        <Text style={{ color:"#4285F4" }}>g</Text>
                        <Text style={{ color:"#34A853" }}>l</Text>
                        <Text style={{ color:"#EA4336" }}>e</Text>
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signInWithFacebook} onPress={() => {}}>
                    <Image
                        source={require('./images/fb_icon.png')} // Asegúrate de tener el logo de Facebook
                        style={styles.socialIconFacebook}
                    />
                    <Text style={styles.buttonFacebookText}>Sign in with Facebook</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    backgroundContainer: {
        flex: 1,
        position: 'relative',
    },
    maskedView: {
        height: windowHeight * 0.60,
        width: '100%',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        top: -55,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImg: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#fff',
    },
    description: {
        margin: 34,
        fontSize: 20,
        textAlign: 'center',
        color: 'gray',
        fontWeight: 'bold'
    },
    signInWithGoogle: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        height: 60,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 0.5
    },
    signInWithFacebook: {
        backgroundColor: '#3b5998',
        borderRadius: 15,
        height: 60,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    socialIconGoogle: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    socialIconFacebook: {
        width: 32,
        height: 32,
        marginRight: 10,
        tintColor: '#fff',
    },
    buttonGoogleText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonFacebookText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
