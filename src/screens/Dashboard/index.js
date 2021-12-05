import React, { useEffect, useState } from 'react';
import {
  View, Button, FlatList, Text,
  StyleSheet, Dimensions,
  ScrollView, TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Searchbar, List } from 'react-native-paper';
import { updateUsersCurrentLocation, getAllDrivers } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';

import { updatePickupLocation } from '../../store/actions/requestTripActions';
import { updateCurrentLocation } from '../../store/actions/locationActions';
import Api from '../../config/api';
import { updateDrivers } from '../../store/actions/userActions';

function Dashboard({ navigation }) {
  const state = useSelector(state => state.locationReducer)
  console.log("Dashboard location state: ", state)

  const dispatch = useDispatch()

  const uid = useSelector(state => state.userReducer.user.uid)

  // const statelocationReducer = useSelector(state => state.locationReducer)
  // const drivers = useSelector(state => state.userReducer.drivers)

  const stateLocation = useSelector(state => state.locationReducer.currentLocation)
  const [location, setLocation] = useState();
  const [allDriverData, setAllDriverData] = useState([]);
  const [data, setData] = useState([{ name: '' }])
  const [pickupLocation, setPickupLocation] = useState({
    coords: {},
    name: "Marker"
  });
  const [pickupCoords, setPickupCoords] = useState();
  const [userInput, setUserInput] = useState();

  const putPickupLocation = (key, value) => {
    // console.log("function", "key: ", key, "value", value)
    setPickupLocation({ ...pickupLocation, [key]: value })
    // console.log("pickup Put Function: ", pickupLocation)
  }

  // function callApi() {
  //   Api()
  // }

  useEffect(async () => {
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
        setLocation(location.coords)
        dispatch(updateCurrentLocation(location.coords))

        updateUsersCurrentLocation(uid, location)
      })
      setLocation(stateLocation)

    })();

    const driverData = await getAllDrivers()
    dispatch(updateDrivers(driverData))
    setAllDriverData(driverData)
  }, []);

  const searchLocation = async () => {
    const { longitude, latitude } = location
    console.log("searchLocation ", longitude, latitude, userInput)
    const res = await fetch(`https://api.foursquare.com/v3/places/search?ll=${latitude}%2C${longitude}&radius=5000&query=${userInput}&limit=50`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'fsq3rkNdt9RLOsMqSu9PAoTXGkGDSi7DSL8ge3qx5YOGoRI='
      }
    })
    const result = await res.json()
    setData(result.results)
  }

  const selectLocation = (item) => {

    console.log("selectLocation ", item)

    putPickupLocation("coords", item.geocodes.main)
    // putPickupLocation("name", item.name)

    setUserInput(item.name)

    setPickupCoords(item.geocodes.main)

    setData([{ name: '' }])
  }

  let selectedLongitude, selectedLatitude

  if (pickupCoords) {
    selectedLongitude = pickupCoords.longitude
    selectedLatitude = pickupCoords.latitude
  }

  let initialLongitude, initialLatitude

  if (location) {
    initialLongitude = location.longitude
    initialLatitude = location.latitude
  }

  function submit() {
    if (pickupLocation) {
      dispatch(updatePickupLocation(pickupLocation))
      navigation.navigate('Destination', { pickupLocation })
    }
    else {
      alert("Please select a pickup location first")
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Searchbar
        onChangeText={setUserInput}
        placeholder={'Search Pickup Location'} style={{ width: '100%', backgroundColor: 'white', fontSize: 25 }}
        onIconPress={searchLocation}
        value={userInput}
      />

      <View style={styles.List}>
        <ScrollView style={styles.ScrollView}>
          {
            data.map((item) => {
              return <TouchableOpacity onPress={() => selectLocation(item)}>
                <List.Item
                  style={styles.ListItem}
                  title={item.name}
                  description={item.description}
                  left={props => <List.Icon {...props} icon="" />}
                />
              </TouchableOpacity>
            })
          }
        </ScrollView>
      </View>

      <MapView
        region={{
          latitude: selectedLatitude || initialLatitude || 37.4219881,
          longitude: selectedLongitude || initialLongitude || -122.0839954,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021
        }}
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: selectedLatitude || initialLatitude || 37.4219899,
            longitude: selectedLongitude || initialLongitude || -122.0839966,
          }}
          title={'Your Here'}
        />
        {
          allDriverData.map((driver) => {
            return <Marker
              coordinate={{
                latitude: driver.location.latitude || 37.4219999,
                longitude: driver.location.longitude || -122.0839999
              }}
              title={driver.fullName}
            />
          })
        }
      </ MapView>

      <Button
        title="Select Destination"
        onPress={submit}
      />

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
    height: Dimensions.get('window').height * 0.5,
  },
  ScrollView: {
    width: '100%',
    height: Dimensions.get('window').height
  },
  List: {
    borderWidth: 1,
    width: '100%',
    // position: 'absolute',
    height: Dimensions.get('window').height * 0.2
  },
  search: {
    borderWidth: 1,
    width: '100%',
  },
  Text: {
    fontSize: 25
  },
  ListItem: {
    width: '100%'
  }
});

export default Dashboard