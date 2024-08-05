import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Map from './Map';
import Coupons from './Coupons';
import Profile from './Profile';
import Settings from './Settings';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ThemeContext } from '../model/ThemeContext';

const Tab = createBottomTabNavigator();

export default function Menu() {

    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: '#119100',
                    tabBarInactiveTintColor: isDarkTheme ? "white" : "gray",
                    tabBarStyle: {
                        height: 60,
                        paddingVertical: 10,
                        backgroundColor: isDarkTheme ? "#222" : "white",
                        elevation: 5
                    },
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Map') {
                            iconName = 'map';
                            return <Ionicons name={iconName} size={size} color={color} style={styles.TabIconStyle} />;
                        } else if (route.name === 'Coupons') {
                            iconName = 'discount';
                            return <MaterialIcons name={iconName} size={size} color={color} style={styles.TabIconStyle} />;
                        } else if (route.name === 'Profile') {
                            iconName = 'person';
                            return <Ionicons name={iconName} size={size} color={color} style={styles.TabIconStyle} />;
                        } else if (route.name === 'Settings') {
                            iconName = 'settings';
                            return <Ionicons name={iconName} size={size} color={color} style={styles.TabIconStyle} />;
                        }
                    },
                    tabBarLabel: ({ focused, color }) => {
                        return focused ? <Text style={{ color, fontSize: 12, fontWeight: "bold", marginBottom: 5 }}>{route.name}</Text> : null;
                    }
                })}
            >
                <Tab.Screen name="Map" component={Map} options={{ headerShown: false }} />
                <Tab.Screen name="Coupons" component={Coupons} options={{ headerShown: false }} />
                <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    TabIconStyle: {
        
    }
});
