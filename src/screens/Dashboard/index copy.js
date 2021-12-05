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

function Dashboard({ navigation }) {
  const state = useSelector(state => state.requestTripReducer)
  console.log("Dashboard state: ", state)
  const statelocationReducer = useSelector(state => state.locationReducer)

  const uid = useSelector(state => state.userReducer.user.uid)

  console.log("Dashboard location: ", statelocationReducer)

  const dispatch = useDispatch()

  // const uid = useSelector(state => state.userReducer.user.uid)
  const stateLocation = useSelector(state => state.locationReducer.currentLocation)
  // console.log("uid info: ", uid)

  const [location, setLocation] = useState();
  const [allDriverData, setAllDriverData] = useState([]);
  console.log("allDriverData", allDriverData)

  // console.log("Dashboardvlocation: ", location)

  const [data, setData] = useState([{ name: '' }])
  // const [search, setSearch] = useState(false)
  const [pickupLocation, setPickupLocation] = useState({
    coords: {},
    name: "Marker"
  });
  // console.log("pickupLocation : ", pickupLocation)


  const [pickupCoords, setPickupCoords] = useState();
  const [userInput, setUserInput] = useState();

  const LocationInfo = useSelector(state => state.locationReducer)

  const putPickupLocation = (key, value) => {
    // console.log("function", "key: ", key, "value", value)
    setPickupLocation({ ...pickupLocation, [key]: value })
    // console.log("pickup Put Function: ", pickupLocation)
  }

  function callApi() {
    Api()
  }

  useEffect(async() => {
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

    const driverData = await getAllDrivers()
    setAllDriverData(driverData)
    console.log("dashbooard data ",driverData)

    setLocation(stateLocation)
  }, []);

  const searchLocation = async () => {
    const { longitude, latitude } = location
    console.log(longitude, latitude)
    console.log(userInput)
    const res = await fetch(`https://api.foursquare.com/v3/places/search?ll=${latitude}%2C${longitude}&radius=3000&query=${userInput}&limit=50`, {
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

    putPickupLocation("coords", item.geocodes.main)
    putPickupLocation("name", item.name)

    setUserInput(item.name)

    setPickupCoords(item.geocodes.main)

    setData([{ name: '' }])
  }

  let selectedLongitude, selectedLatitude

  if (pickupCoords) {
    selectedLongitude = pickupCoords.longitude
    selectedLatitude = pickupCoords.latitude
    // console.log(selectedLongitude, ",", selectedLatitude)
  }

  let initialLongitude, initialLatitude

  if (location) {
    initialLongitude = location.longitude
    initialLatitude = location.latitude
    // console.log(selectedLongitude, ",", selectedLatitude)
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
              // console.log(item)
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
          latitude: selectedLatitude || initialLatitude || 24.9331712,
          longitude: selectedLongitude || initialLongitude || 67.0892032,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021
        }}
        style={styles.map}>

        <Marker
          coordinate={{
            latitude: selectedLatitude || initialLatitude || 24.9331712,
            longitude: selectedLongitude || initialLongitude || 67.0892032,
          }}
          title={'Your Here'}
        />

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