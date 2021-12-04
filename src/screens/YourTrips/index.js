import * as React from 'react';
import { View, Text, Button } from 'react-native';

function YourTrips({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Trip</Text>
        <Button
          title="To details"
          onPress={() => navigation.navigate('TripDetails')}
        />
      </View>
    );
  }

  export default YourTrips