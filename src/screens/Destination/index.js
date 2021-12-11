import React, { useEffect, useState } from 'react';
import {
  View, Button, FlatList,
  StyleSheet, Dimensions,
  ScrollView, TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Searchbar, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { updateDestinationLocation } from '../../store/actions/requestTripActions';

function Destination({ route, navigation }) {
  const state = useSelector(state => state.requestTripReducer)
  console.log("Destination state: ", state)

  const dispatch = useDispatch()

  const [data, setData] = useState([{ name: '' }])
  const [location, setLocation] = useState({});
  const { longitude, latitude } = location
  const [pickupLocation, setPickupLocation] = useState();
  const [destinationLocation, setDestinationLocation] = useState({
    coords: {},
    name: ""
  });
  const [destinationCoords, setDestinationCoords] = useState();
  const [userInput, setUserInput] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  const putDestinationLocation = (key, value) => {
    // console.log("function", "key: ", key, "value", value)
    setDestinationLocation({ ...destinationLocation, [key]: value })
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const options = {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 10
      }
      Location.watchPositionAsync(options, (location) => {
        setLocation(location.coords)
        // console.log(location)
      })
    })();
    setPickupLocation(route.params.pickupLocation)
  }, []);

  const searchLocation = async () => {
    // console.log('Destination searched location', latitude, longitude)
    const res = await fetch(`https://api.foursquare.com/v3/places/search?ll=${latitude}%2C${longitude}&radius=3000&query=${userInput}&limit=50`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'fsq3a6C6+Y939PkrC6l7ymB4t8ByFN2CB5+dknYo2IzwXYs='
      }
    })
    const result = await res.json()
    setData(result.results)
  }

  let selectedLongitude, selectedLatitude
  const selectLocation = (item) => {

    // console.log("Destination pickup location", pickupLocation)

    // setDestinationLocation({...destinationLocation, coords: item.geocodes.main})
    // setDestinationLocation({...destinationLocation, name: item.name})

    putDestinationLocation("coords", item.geocodes.main)
    // putDestinationLocation("name", item.name)

    // console.log("Destination selected location", item.name)

    setUserInput(item.name)

    setDestinationCoords(item.geocodes.main)

    setData([{ name: '' }])
  }

  if (destinationCoords) {
    selectedLongitude = destinationCoords.longitude
    selectedLatitude = destinationCoords.latitude
    // console.log(selectedLongitude, ",", selectedLatitude)
  }

  function submit() {
    if (destinationLocation) {
      dispatch(updateDestinationLocation(destinationLocation))
      navigation.navigate('CarSelection', { destinationLocation, pickupLocation })
    }
    else {
      alert("Please select a destination location first")
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Searchbar
        onChangeText={setUserInput}
        placeholder={'Search Destination Location'} style={{ width: '100%', backgroundColor: 'white', fontSize: 25 }}
        onIconPress={searchLocation}
        value={userInput}
      />
      {/* <Button title='Search' onPress={searchLocation} /> */}

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
          latitude: selectedLatitude || latitude || 1,
          longitude: selectedLongitude || longitude || 1,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021
        }}
        style={styles.map}>

        <Marker
          coordinate={{
            latitude: selectedLatitude || latitude || 1,
            longitude: selectedLongitude || longitude || 1,
          }}
          title={'Your Here'}
        />

      </ MapView>

      <Button
        title="Select Vehicle"
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
    position: 'relative'
  },
  Text: {
    fontSize: 25
  },
  ListItem: {
    width: '100%'
  }
});

export default Destination