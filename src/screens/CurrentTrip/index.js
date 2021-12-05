import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateDrivers, updateDriverUserDistance } from '../../store/actions/userActions';
import { getAllDrivers, requestTrip } from '../../config/firebase';

function CurrentTrip({ route, navigation }) {

  const user = useSelector(state => state.userReducer.user)

  const LocationInfo = useSelector(state => state.requestTripReducer)
  const [pickupLocation, setPickupLocation] = useState();
  console.log("CurrentTrip pickupLocation: ", pickupLocation)

  const [driverUserDistance, setDriverUserDistance] = useState([]);
  console.log("CurrentTrip driverUserDistance: ", driverUserDistance)

  const [sortedDriverUserDistance, setSortedDriverUserDistance] = useState([]);
  console.log("CurrentTrip driverUserDistance: ", sortedDriverUserDistance)

  const [allDriverData, setAllDriverData] = useState([]);
  // console.log("CurrentTrip allDriverData", allDriverData)

  useEffect(async () => {
    setPickupLocation(LocationInfo.pickupLocation.coords)

    const driverData = await getAllDrivers()
    // dispatch(updateDrivers(driverData))
    setAllDriverData(driverData)
    console.log("CurrentTrip data ", driverData)

    let copyDataArray = []

    allDriverData.map((driver) => {

      let driverData = driver

      let laP = pickupLocation.latitude
      let loP = pickupLocation.longitude

      let laD = driver.location.latitude
      let loD = driver.location.longitude

      let result = distanceCalculation(laP, laD, loP, loD)

      console.log(result)

      copyDataArray.push({ ...driverData, distanceFromUser: result })
    })
    setDriverUserDistance(copyDataArray)

  }, []);

  function distanceCalculation() {
    // console.log("CurrentTrip distanceCalculation", allDriverData)
    let copyDataArray = []
    allDriverData.map((driver) => {

      let driverData = driver

      let laP = pickupLocation.latitude
      let loP = pickupLocation.longitude

      let laD = driver.location.latitude
      let loD = driver.location.longitude

      let result = distanceCalculation(laP, laD, loP, loD)

      copyDataArray.push({ ...driverData, distanceFromUser: result })
    })
    setDriverUserDistance(copyDataArray)
    sortingDriverData()
  }

  function sortingDriverData() {
    console.log("CurrentTrip sortingDriverData", driverUserDistance)

    //sorting by distanceFromUser
    //any sorting method

    setSortedDriverUserDistance()
    dispatch(updateDriverUserDistance(sortedDriverUserDistance))

    requstATrip()
  }

  function requstATrip() {
    console.log("CurrentTrip requstATrip", sortedDriverUserDistance, user)
    requestTrip(sortedDriverUserDistance, user)
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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Searching for drivers near you</Text>
      <Text>Distance from pickup{driverUserDistance[0]}</Text>
    </View>
  );
}

export default CurrentTrip