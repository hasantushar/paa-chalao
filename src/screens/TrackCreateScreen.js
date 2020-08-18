import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { AntDesign } from '@expo/vector-icons';

const TrackCreateScreen = ({ isFocused }) => {
    const { state: {recording}, addLocation } = useContext(LocationContext);
    const callback = useCallback((location) => {
        addLocation(location, recording);}, [recording])
    //const [err] = useLocation((location) => addLocation(location));

    const [err] = useLocation( isFocused || recording , callback );

    //console.log(isFocused);

    return <SafeAreaView forceInset={{ top: 'always' }}>
        <Text h2>Create a Track</Text>
        <Map />
        {err ? <Text>please enable location</Text> : null }
        <TrackForm />
    </SafeAreaView>
};

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <AntDesign name="plus" size={20} />
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);