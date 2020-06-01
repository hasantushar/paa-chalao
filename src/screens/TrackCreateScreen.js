//import '../_mockLocation';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';

const TrackCreateScreen = () => {
    const [err, setErr] = useState(null);
    const { addLocation } = useContext(LocationContext);

    const startWatching = async () => {
        try {
            await requestPermissionsAsync();
            await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                distanceInterval: 10,
                timeInterval: 1000
            }, (location) => {
                addLocation(location);
            });
        }
        catch (e) {
            setErr(e);
        }
    };

    useEffect(() => {
        startWatching();
    }, []);

    return <SafeAreaView forceInset={{ top: 'always' }}>
        <Text h2>Track Create Screen</Text>
        <Map />
        {err ? <Text>please enable location</Text> : null }
    </SafeAreaView>
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;