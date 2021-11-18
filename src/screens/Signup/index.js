import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

function Signup({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Signup Now!</Text>
        <TextInput placeholder='Username' ></TextInput>
        <TextInput placeholder='Full Name' ></TextInput>
        <TextInput placeholder='age' ></TextInput>
        <TextInput placeholder='Email' ></TextInput>
        <TextInput placeholder='Password' ></TextInput>
        <Button
          title="Signup"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    );
  }

  export default Signup