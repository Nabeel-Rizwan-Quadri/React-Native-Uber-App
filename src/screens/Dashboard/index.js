import React, { useEffect, useState } from 'react';
import {
  View, Text, Button,
  StyleSheet, Dimensions,
  ScrollView, FlatList, TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Searchbar, List } from 'react-native-paper';

function Dashboard({ navigation }) {

  const [data, setData] = useState([{ name: '' }])
  const [location, setLocation] = useState({});
  const [pickupLocation, setPickupLocation] = useState();
  const [pickupCoords, setPickupCoords] = useState();

  // console.log("pickup", pickupLocation)
  const { longitude, latitude } = location
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
        timeInterval: 500,
        distanceInterval: 1
      }
      Location.watchPositionAsync(options, (location) => {
        setLocation(location.coords)
        // console.log(location)
      })
    })();
  }, []);

  const searchLocation = async () => {
    const { longitude, latitude } = location
    console.log('searched location', latitude, longitude)
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

    setPickupLocation(item)
    console.log("selected location", item.name)

    setUserInput(item.name)

    setPickupCoords(item.geocodes.main)

    setData([{ name: '' }])
  }

  if (pickupCoords) {
    selectedLongitude = pickupCoords.longitude
    selectedLatitude = pickupCoords.latitude
    console.log(selectedLongitude, ",", selectedLatitude)
  }
  // console.log(selectedLongitude,",",selectedLatitude)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Searchbar
        onChangeText={setUserInput}
        placeholder={'Search pickup location'} style={{ width: '100%', backgroundColor: 'white', fontSize: 25 }}
        onIconPress={searchLocation}
        value={userInput}
      />

      <View style={styles.FlatList}>
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
          latitude: selectedLatitude || latitude,
          longitude: selectedLongitude || longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021
        }}
        style={styles.map}>

        <Marker
          coordinate={{
            latitude: selectedLatitude || latitude,
            longitude: selectedLongitude || longitude,
          }}
          title={'Expertizo University'}
        />

      </ MapView>

      <Button
        title="Select Destination"
        onPress={() => navigation.navigate('Destination', { pickupLocation })}
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
  FlatList: {
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

export default Dashboard