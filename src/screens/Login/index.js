import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

function Login({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Here</Text>
        <TextInput placeholder='Email' ></TextInput>
        <TextInput placeholder='Password' ></TextInput>
        <Button
          title="login"
          onPress={() => navigation.navigate('Dashboard')}
        />
      </View>
    );
  }

  export default Login