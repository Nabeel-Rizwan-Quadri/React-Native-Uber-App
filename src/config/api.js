import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native'

function Api() {

    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);

    // const Dispatch = useDispatch()
    // const state = useSelector(state => state)
    // console.log("api state: ", state)

    useEffect(() => {
        (async () => {
            console.log("apid async")
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            console.log("API error", errorMsg)

            const options = {
                accuracy: Location.Accuracy.Highest,
                timeInterval: 500,
                distanceInterval: 1
            }
            Location.watchPositionAsync(options, (location) => {
                setLocation(location.coords)
                console.log("API watch ", location)
            })
        })();
    }, []);

    console.log("API location: ", location)

    return <Text>API</Text>
}

export default Api