import React, { useContext } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { ThemeContext } from '../model/ThemeContext';
import { TouchableOpacity } from "react-native-gesture-handler";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Settings() {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#111' : '#fff' }]}>
            <View style={styles.row}>
                <Text style={[styles.text, { color: isDarkTheme ? '#fff' : '#000' }]}>Dark Theme</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#20421c" }}
                    thumbColor={isDarkTheme ? "#119100" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleTheme}
                    value={isDarkTheme}
                    style={styles.switch}
                />
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.logoutBtn} onPress={async () => await signOut(auth)}>
                    <Text style={styles.buttonText}>LOG OUT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        padding: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBlockColor: "#999999"
    },
    text: {
        fontSize: 20,
    },
    switch: {
        marginLeft: 'auto',
    },
    logoutBtn: {
        backgroundColor: '#ff1c1c',
        borderRadius: 15,
        height: 60,
        width: '330%',
        justifyContent: 'center',
        margin: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
