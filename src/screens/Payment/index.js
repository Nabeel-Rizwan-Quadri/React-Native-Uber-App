import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

function Payment({ route, navigation }) {
  
  console.log(route.params)

  const state = useSelector(state => state)
  console.log(state)

  const [paymentMethod, setPaymentMethod] = useState();

  const submit = () => {
    if (paymentMethod) {
      navigation.navigate('CurrentTrip')
    }
    else {
      alert("Please select a payment method first")
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text>
        <RadioButton
          status={paymentMethod === 'Card' ? 'checked' : 'unchecked'}
          onPress={() => alert('Card payment not avaiable at the moment')}
        />
        <Text style={{ fontSize: 20 }}>Credit Card {"\n"}</Text>
      </Text>

      <Text>
        <RadioButton
          status={paymentMethod === 'Cash' ? 'checked' : 'unchecked'}
          onPress={() => setPaymentMethod('Cash')}
        />
        <Text style={{ fontSize: 20 }}>Cash{"\n"}</Text>
      </Text>

      <Button
        style={{width: '80%'}}
        title="Go"
        onPress={submit}
      />

    </View>
  );
}

export default Payment