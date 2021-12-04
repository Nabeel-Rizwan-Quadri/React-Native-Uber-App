import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

function CurrentTrip({ route, navigation }) {

  console.log(route.params)

  const state = useSelector(state => state)
  console.log(state)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Searching for drivers near you</Text>
    </View>
  );
}

export default CurrentTrip