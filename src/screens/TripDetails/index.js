import * as React from 'react';
import { View, Text, Button } from 'react-native';

function TripDetails({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Destination</Text>
        <Button
          title="Select Vehicle"
          onPress={() => navigation.navigate('CarSelection')}
        />
      </View>
    );
  }

  export default TripDetails