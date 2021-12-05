import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native'
import { updateUsersCurrentLocation } from './firebase';
import * as Location from 'expo-location';

import { updateCurrentLocation } from '../store/actions/locationActions';
import { stopLocationUpdatesAsync } from 'expo-location';

function Api() {
    const state = useSelector(state => state.locationReducer)
    // console.log("api state: ", state)

    const dispatch = useDispatch()

    const uid = useSelector(state => state.userReducer.user.uid)

    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            const options = {
                accuracy: Location.Accuracy.Highest,
                timeInterval: 500,
                distanceInterval: 1
            }
            Location.watchPositionAsync(options, (location) => {
                // console.log(location)
                setLocation(location.coords)
                dispatch(updateCurrentLocation(location.coords))

                updateUsersCurrentLocation(uid, location)
            })
        })();
        

        //listen for updates in trips collection 
    }, []);
}

export default Api