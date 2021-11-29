import React, { useEffect, useState } from 'react';
import {
  View, Text, Button,
  StyleSheet, Dimensions,
  ScrollView, FlatList, TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Searchbar } from 'react-native-paper';

function Dashboard({ navigation }) {

  const [data, setData] = useState([{name: "nabeel"}])
  const [location, setLocation] = useState({});
  const [pickupLocation, setPickupLocation] = useState();
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
    console.log('searched location',latitude, longitude)
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

  console.log('data', data[0].name)
  // console.log('data', data[0])

  //rendering of list
  const Item = ({ title }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => selectLocation(title)}>
        <Text style={{ fontSize: 25 }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );

  const selectLocation = (title) => {
    setPickupLocation(title)
    console.log("selected location", title)
    setData({})
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Searchbar
        onChangeText={setUserInput}
        placeholder={'Search pickup location'} style={{ width: '100%', backgroundColor: 'white', fontSize: 25 }}
        onIconPress={searchLocation}
        value={pickupLocation}
      />

      <FlatList style={styles.FlatList}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}>

        <ScrollView style={styles.scrollView}></ScrollView>

      </FlatList>

      {/* <MapView
        region={{
          latitude: latitude || 24.9150376,
          longitude: longitude || 67.0831213,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021
        }}
        style={styles.map}>

        <Marker
          coordinate={{
            latitude: latitude || 24.9150376,
            longitude: longitude || 67.0831213
          }}
          title={'Expertizo University'}
        />

      </ MapView> */}

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
    height: Dimensions.get('window').height * 0.6,
  },
  ScrollView: {
  },
  FlatList: {

    borderWidth: 1,
    width: '100%',
  },
  Text: {
    fontSize: 25
  }
});

export default Dashboard