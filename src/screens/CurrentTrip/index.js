import React, { useEffect, useState } from 'react';
import {
  View, Button, FlatList, Text,
  StyleSheet, Dimensions,
  ScrollView, TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { updateUsersCurrentLocation } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';

import { updateCurrentLocation } from '../../store/actions/locationActions';


function CurrentTrip({ navigation }) {

  const dispatch = useDispatch()

  const uid = useSelector(state => state.userReducer.user.uid)
  console.log("Dashboard uid: ", uid)
  const [location, setLocation] = useState();

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
  }, []);



  let initialLongitude, initialLatitude

  if (location) {
    initialLongitude = location.longitude
    initialLatitude = location.latitude
    // console.log(selectedLongitude, ",", selectedLatitude)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>




      <MapView
        region={{
          latitude: initialLatitude || 24.9331712,
          longitude: initialLongitude || 67.0892032,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021
        }}
        style={styles.map}>

        <Marker
          coordinate={{
            latitude: initialLatitude || 24.9331712,
            longitude: initialLongitude || 67.0892032,
          }}
          title={'Your Here'}
        />

      </ MapView>





    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
  },
});

export default CurrentTrip