import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector } from "react-redux";

import { onAuthStateChanged, getAuth } from 'firebase/auth'

import { updateUser } from "../store/actions/userActions";
import Logout from '../screens/Logout';
import {
  Login,
  Signup,
  Dashboard,
  Destination,
  CarSelection,
  TripDetails,
  YourTrips,
  CurrentTrip,
  Payment
} from "../screens"

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  const auth = getAuth()
  const Dispatch = useDispatch()

  const usersData = useSelector(state => state.userReducer.user)
  console.log("navigation", usersData)
  const [user, setUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, userData => {
      Dispatch(updateUser(userData))
      setUser(usersData)
    })
  }, [usersData])
  // console.log("user --> ", user)
  return (
    <NavigationContainer>
      {
        user ? <MainStack />
          :
          <AuthStack />
      }
    </NavigationContainer>
  );
}

function MainStack() {
  return <Drawer.Navigator initialRouteName="Pickup" >
    <Drawer.Screen name="DashboardStack" component={DashboardStack} />
    <Drawer.Screen name="TripsStack" component={TripsStack} />
    <Drawer.Screen name="Logout" component={Logout} />
  </Drawer.Navigator>
}

function AuthStack() {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </Stack.Navigator>
}

function DashboardStack() {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Destination" component={Destination} />
    <Stack.Screen name="CarSelection" component={CarSelection} />
    <Stack.Screen name="CurrentTrip" component={CurrentTrip} />
    <Stack.Screen name="Payment" component={Payment} />
  </Stack.Navigator>
}

function TripsStack() {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="YourTrips" component={YourTrips} />
    <Stack.Screen name="TripDetails" component={TripDetails} />
  </Stack.Navigator>
}
