import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import Logout from '../screens/Logout';

// import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../store/actions/userActions";
import {
  Login,
  Signup,
  Dashboard,
  Destination,
  CarSelection,
  TripDetails,
  Trip
} from "../screens"
import { useDispatch } from 'react-redux';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  const auth = getAuth()
  const disptach = useDispatch()
  // const dispatch = useDispatch()

  // const user = useSelector(state => state.userReducer.user)
  const [user, setUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, userData => {
      setUser(userData)
      // dispatch(updateUser(userData))
    })
  }, [])
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
    <Drawer.Screen name="Dashboard" component={DashboardStack} />
    <Drawer.Screen name="Trips" component={TripsStack} />
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
  </Stack.Navigator>
}

function TripsStack() {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="YourTrips" component={Trip} />
    <Stack.Screen name="Details" component={TripDetails} />
  </Stack.Navigator>
}
