import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { updateSelectedCar, updateTripFare } from '../../store/actions/requestTripActions';

function CarSelection({ route, navigation }) {
  const state = useSelector(state => state.requestTripReducer)
  console.log("Car state: ", state)

  // console.log("car params", route.params)
  const dispatch = useDispatch()

  const LocationInfo = useSelector(state => state.requestTripReducer)
  const [pickupLocation, setPickupLocation] = useState();
  const [destinationLocation, setDestinationLocation] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [tripFare, setTripFare] = useState();
  const [distance, setDistance] = useState();
  console.log("Car distance: ", distance)

  useEffect(() => {
    setPickupLocation(LocationInfo.pickupLocation.coords)
    setDestinationLocation(LocationInfo.destinationLocation.coords)

    const laP = LocationInfo.pickupLocation.coords.latitude
    const loP = LocationInfo.pickupLocation.coords.longitude
    const laD = LocationInfo.destinationLocation.coords.latitude
    const loD = LocationInfo.destinationLocation.coords.longitude

    setDistance(distanceCalculation(laP, laD, loP, loD))
  }, [1])

  function fareCalculation(value) {
    let price
    switch (value) {
      case "Bike":
        price = ((distance * 10) + 50)
        return price.toFixed(0)
      case "Riksha":
        price = ((distance * 13) + 100)
        return price.toFixed(0)
      case "Car":
        price = ((distance * 15) +150)
        return price.toFixed(0)
      case "AC_car":
        price = ((distance * 20) + 200)
        return price.toFixed(0)
      default:
        return 10
    }
  }

  function distanceCalculation(lat1, lat2, lon1, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    console.log(d)
    return d;
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  const submit = () => {
    if (selectedCar) {
      //sending data to firebase before data here

      //Redux update with current trip data
      dispatch(updateSelectedCar(selectedCar))

      dispatch(updateTripFare(tripFare))
      navigation.navigate('Payment', { pickupLocation }, { destinationLocation }, { selectedCar }, { tripFare })
    }
    else {
      alert("Please select a ride first")
    }
  }

  function radioSelect(value) {
    setSelectedCar(value)
    setTripFare(fareCalculation(value))
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 25 }}>Select a Vehicle {"\n"}</Text>

      <Text>
        <RadioButton
          value="Bike"
          status={selectedCar === 'Bike' ? 'checked' : 'unchecked'}
          onPress={() => radioSelect('Bike')}
        />
        <Text style={{ fontSize: 20 }}>Bike Rs. {fareCalculation('Bike')}{"\n"}</Text>
      </Text>

      <Text>
        <RadioButton
          value="Riksha"
          status={selectedCar === 'Riksha' ? 'checked' : 'unchecked'}
          onPress={() => radioSelect('Riksha')}
        />
        <Text style={{ fontSize: 20 }}>Riksha Rs. {fareCalculation("Riksha")}{"\n"}</Text>
      </Text>

      <Text>
        <RadioButton
          status={selectedCar === 'Car' ? 'checked' : 'unchecked'}
          onPress={() => radioSelect('Car')}
        />
        <Text style={{ fontSize: 20 }}>Car Rs. {fareCalculation("Car")}{"\n"}</Text>
      </Text>

      <Text>
        <RadioButton
          status={selectedCar === 'AC_car' ? 'checked' : 'unchecked'}
          onPress={() => radioSelect('AC_car')}
        />
        <Text style={{ fontSize: 20 }}>AC Car Rs. {fareCalculation("AC_car")}{"\n"}</Text>
      </Text>

      <Button
        title="Select Payment Method"
        onPress={submit}
      />
    </View>
  );
}

export default CarSelection