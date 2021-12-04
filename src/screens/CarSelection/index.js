import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

function CarSelection({ route, navigation }) {
  // console.log("car params", route.params)
  // const dispatch = useDispatch()

  const LocationInfo = useSelector(state => state.locationReducer)
  // console.log("Car Location info: ", LocationInfo)
  const [pickupLocation, setPickupLocation] = useState();
  // console.log("Car pickup: ", pickupLocation)
  const [destinationLocation, setDestinationLocation] = useState();
  // console.log("Car destination: ", destinationLocation)

  const [selectedCar, setSelectedCar] = useState();
  const [distance, setDistance] = useState();
  // console.log("Car distance: ", distance)

  const [tripFare, setTripFare] = useState();

  useEffect(() => {
    setPickupLocation(LocationInfo.pickupLocation.geocodes.main)
    setDestinationLocation(LocationInfo.destinationLocation.geocodes.main)

    const laP = LocationInfo.pickupLocation.geocodes.main.latitude
    const loP = LocationInfo.pickupLocation.geocodes.main.longitude
    const laD = LocationInfo.destinationLocation.geocodes.main.latitude
    const loD = LocationInfo.destinationLocation.geocodes.main.longitude

    setDistance(distanceCalculation(laP, laD, loP, loD))
  }, [1])

  function fareCalculation(value) {
    let price
    switch (value) {
      case "Bike":
        price = ((distance * 10) + 100)
        return price.toFixed(0)
      case "Riksha":
        price = ((distance * 12) + 150)
        return price.toFixed(0)
      case "Car":
        price = ((distance * 15) + 200)
        return price.toFixed(0)
      case "AC_car":
        price = ((distance * 20) + 250)
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
    return d;
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  const submit = () => {
    if (selectedCar) {
      //sending data to firebase before data here

      //Redux update with current trip data

      setTripFare(fareCalculation(selectedCar))

      navigation.navigate('Payment', { pickupLocation }, { destinationLocation }, { selectedCar }, { tripFare })
    }
    else {
      alert("Please select a ride first")
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 25 }}>Select a Vehicle {"\n"}</Text>

      <Text>
        <RadioButton
          value="Bike"
          status={selectedCar === 'Bike' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedCar('Bike')}
        />
        <Text style={{ fontSize: 20 }}>Bike Rs. {fareCalculation('Bike')}{"\n"}</Text>
      </Text>

      <Text>
        <RadioButton
          value="Riksha"
          status={selectedCar === 'Riksha' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedCar('Riksha')}
        />
        <Text style={{ fontSize: 20 }}>Riksha Rs. {fareCalculation("Riksha")}{"\n"}</Text>
      </Text>

      <Text>
        <RadioButton
          status={selectedCar === 'Car' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedCar('Car')}
        />
        <Text style={{ fontSize: 20 }}>Car Rs. {fareCalculation("Car")}{"\n"}</Text>
      </Text>

      <Text>
        <RadioButton
          status={selectedCar === 'AC_car' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedCar('AC_car')}
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