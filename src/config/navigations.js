import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { logout } from './firebase';

import {
  Login,
  Signup,
  Dashboard,
  Destination,
  CarSelection,
  TripDetails,
  Trip
} from "../screens"

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  const [user, setUser] = useState()
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, userData => {
      setUser(userData)
    })
  }, [])
  console.log("user --> ", user)
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
  return <Drawer.Navigator initialRouteName="Dashboard">
    <Drawer.Screen name="Dashboard" component={DashboardStack} />
    <Drawer.Screen name="Trips" component={TripsStack} />
    <Drawer.Screen name="Logout" component={logout} />
  </Drawer.Navigator>
}

function AuthStack() {
  return <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </Stack.Navigator>
}

function DashboardStack() {
  return <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Destination" component={Destination} />
    <Stack.Screen name="CarSelection" component={CarSelection} />
  </Stack.Navigator>
}

function TripsStack() {
  return <Stack.Navigator>
    <Stack.Screen name="YourTrips" component={Trip} />
    <Stack.Screen name="Details" component={TripDetails} />
  </Stack.Navigator>
}
