import React, { useEffect, useState } from 'react';
import {
  View, Button, FlatList,
  StyleSheet, Dimensions,
  ScrollView, TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Searchbar, List } from 'react-native-paper';

import { updateDestinationLocation } from '../../store/actions/locationActions';

import { useDispatch, useSelector } from 'react-redux';

function Destination({ route, navigation }) {
  const dispatch = useDispatch()

  // const LocationInfo = useSelector(state => state.locationReducer)
  // console.log("Location info: ", LocationInfo)

  // console.log("Destination params: ", route.params)

  const [data, setData] = useState([{ name: '' }])
  // console.log('Destination data', data)

  const [location, setLocation] = useState({});
  const { longitude, latitude } = location
  const [pickupLocation, setPickupLocation] = useState();
  // console.log("Destination pickup location: ", pickupLocation)
  const [destinationLocation, setDestinationLocation] = useState();
  const [destinationCoords, setDestinationCoords] = useState();
  const [userInput, setUserInput] = useState();
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
        'Authorization': 'fsq3rkNdt9RLOsMqSu9PAoTXGkGDSi7DSL8ge3qx5YOGoRI='
      }
    })
    const result = await res.json()
    setData(result.results)
  }

  let selectedLongitude, selectedLatitude
  const selectLocation = (item) => {

    // console.log("Destination pickup location", pickupLocation)

    setDestinationLocation(item)
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
      navigation.navigate('CarSelection', { destinationLocation, pickupLocation }, { pickupLocation })
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