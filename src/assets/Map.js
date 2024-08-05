import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Image, Animated } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout, AnimatedRegion } from 'react-native-maps';
import Ionicon from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import { ThemeContext } from '../model/ThemeContext';
import ModalViewComponent from '../components/ModalViewComponent';

import { mapDarkStyle, mapStandardStyle, initialMapStateMM } from '../model/MapModel';
import { Card } from 'react-native-paper';

const initialMapState = initialMapStateMM;

const emptyMapState = {
    recycleCenters: [],
    region: {
        latitude: 28.6771606,
        longitude: -106.05699634,
        latitudeDelta: 0.1,
        longitudeDelta: 0.25,
    },
};

export default function Map() {
    const { isDarkTheme } = useContext(ThemeContext);

    const [state, setState] = useState(initialMapState);
    const [markerOption, setMarkerOption] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedCenter, setSelectedCenter] = useState(null);

    const truckPositions = [
        useRef(new AnimatedRegion({ latitude: 28.682938, longitude: -106.109945, latitudeDelta: 0.1, longitudeDelta: 0.25 })).current,
        useRef(new AnimatedRegion({ latitude: 28.678511, longitude: -106.072598, latitudeDelta: 0.1, longitudeDelta: 0.25 })).current,
        useRef(new AnimatedRegion({ latitude: 28.697299, longitude: -106.009082, latitudeDelta: 0.1, longitudeDelta: 0.25 })).current
    ];

    const truckDestinations = [
        { latitude: 28.648113, longitude: -106.070004 },
        { latitude: 28.720363, longitude: -106.087847 },
        { latitude: 28.675393, longitude: -106.024625 }
    ];

    useEffect(() => {
        const updatedMapState = markerOption ? initialMapState : emptyMapState;
        setState(updatedMapState);
    }, [markerOption]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
        })();
    }, []);

    const _map = useRef(null);

    const handleMarkerPress = (center) => {
        setSelectedCenter(center);
        setShowModal(true);

        _map.current.animateToRegion({
            latitude: center.latitude - 0.05,
            longitude: center.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.125,
        }, 500);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        _map.current.animateToRegion({
            latitude: selectedCenter.latitude,
            longitude: selectedCenter.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.25,
        }, 500);
    }

    const animateTrucks = () => {
        truckPositions.forEach((truckPosition, index) => {
            const newCoordinate = truckDestinations[index];
            truckPosition.timing({
                ...newCoordinate,
                duration: 20000,
            }).start();
        });
    };

    useEffect(() => {
        animateTrucks();
    }, []);

    return (
        <MenuProvider>
            <View style={[styles.container, { backgroundColor: isDarkTheme ? '#111' : '#fff' }]}>
                <Menu style={{ zIndex: 1 }}>
                    <MenuTrigger style={styles.menuIcon}>
                        <Ionicon name="menu" size={20} color="black" />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption
                            onSelect={() => setMarkerOption(prevMarkerOption => !prevMarkerOption)}
                            customStyles={{
                                optionWrapper: [styles.menuList, { backgroundColor: isDarkTheme ? '#111' : '#fff' }],
                                optionText: { color: isDarkTheme ? '#fff' : '#000' },
                            }}
                            text={"Show Recycle Centers: " + (markerOption ? "On" : "Off")} />
                    </MenuOptions>
                </Menu>
                <MapView
                    ref={_map}
                    style={markerOption ? styles.map : styles.mapNoCenters}
                    initialRegion={state.region}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    customMapStyle={isDarkTheme ? mapDarkStyle : mapStandardStyle}
                >
                    {truckPositions.map((truckPosition, index) => (
                        <Marker.Animated
                            key={index}
                            style={styles.truck}
                            coordinate={truckPosition}
                            anchor={{ x: 0.5, y: 0.5 }}
                            image={require('./images/truck3.png')}
                        >
                            <Callout>
                                <Text style={styles.calloutStyle}>Garbage Truck {index + 1}</Text>
                            </Callout>
                        </Marker.Animated>
                    ))}
                    {state.recycleCenters.map((center, index) => (
                        <Marker
                            key={index}                          
                            coordinate={{ latitude: center.latitude, longitude: center.longitude }}
                            identifier={`${index}`}
                            image={require('./images/recycleMapIcon3.png')}
                            onPress={() => {handleMarkerPress(center)}}
                        >
                            <Callout >
                                <Text style={styles.calloutStyle}>{center.name}</Text>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
                {showModal && (
                    <ModalViewComponent
                        visible={showModal}
                        onRequestClose={handleCloseModal}
                    >
                        {selectedCenter && (
                            <View>
                                <Text style={[styles.cardTitle, {color: isDarkTheme ? "#fff" : "#000"}]}>{selectedCenter.name}</Text>
                                <Image source={{uri: selectedCenter.image}} style={styles.image}/>
                                <Text style={styles.cardText}>{selectedCenter.description}</Text>
                            </View>
                        )}
                    </ModalViewComponent>
                )}
            </View>
        </MenuProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    truck: {
        tintColor:"#006e18",
    },
    map: {
        width: '100%',
        height: '100%',
    },
    scrollView: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
    },
    calloutStyle:{
        fontWeight: 'bold'
    },
    textContent: {
        flex: 1,
        padding: 10,
    },
    image:{
        width: '100%',
        height: 180,
        resizeMode: 'contain'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
    },
    marker: {
        width: 30,
        height: 30,
    },
    menuIcon: {
        position: 'absolute',
        top: 55,
        left: "87%",
        zIndex: 1,
        width: 38,
        height: 38,
        padding: 9,
        elevation: 5,
        backgroundColor: "white",
        opacity: 0.7,
        borderRadius: 2
    },
    menuList: {
        position: 'absolute',
        top: 100,
        left: "90%",
        backgroundColor: "#ffffff",
        padding: 15,
        elevation: 3,
        borderRadius: 1
    },
    mapNoCenters: {
        width: '100%',
        height: '100%',
    }
});
