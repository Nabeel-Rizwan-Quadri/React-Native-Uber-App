import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';

function CarSelection({ route, navigation }) {
  console.log(route.params)

  const [destinationLocation, setDestinationLocation] = useState();
  const [pickupLocation, setPickupLocation] = useState();
  const [selectedCar, setSelectedCar] = React.useState();

  const submit = () => {
    setPickupLocation(route.params)
    setDestinationLocation(route.params)
    //sending data to firebase before data here
    navigation.navigate('Dashboard')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 25 }}>Select a Vehicle</Text><br />

      <Text>
        <RadioButton
          value="Bike"
          status={selectedCar === 'Bike' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedCar('Bike')}
        />
        <Text style={{ fontSize: 20 }}>Bike</Text><br />
      </Text>

      <Text>
        <RadioButton
          title='rasdas'
          value="Riksha"
          status={selectedCar === 'Riksha' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedCar('Riksha')}
        />
        <Text style={{ fontSize: 20 }}>Riksha</Text><br />
      </Text>

      <Text>
        <RadioButton
          value="Car"
          status={selectedCar === 'Car' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedCar('Car')}
        />
        <Text style={{ fontSize: 20 }}>RikshCara</Text><br />
      </Text>

      <Text>
        <RadioButton
          value="AC Car"
          status={selectedCar === 'AC_car' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedCar('AC_car')}
        />
        <Text style={{ fontSize: 20 }}>AC Car</Text><br />
      </Text>

      <Button
        title="Chalo"
        onPress={submit}
      />
    </View>
  );
}

export default CarSelection