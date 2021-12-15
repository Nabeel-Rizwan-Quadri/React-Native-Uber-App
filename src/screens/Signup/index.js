import * as React from 'react';
import { useState } from 'react'
import { registerUser } from '../../config/firebase';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';


function Signup({ navigation }) {

  const [authData, setAuthData] = useState({})
  const [password, setPassword] = useState('')

  const onChangeValues = (key, text) => {
    console.log(text)
    const value = key === "images" ? text : text
    setAuthData({ ...authData, [key]: value })
    console.log("On Change: ", authData)
  }
  const submit = async () => {
    try {
      await registerUser(authData, password)
    }
    catch (e) {
      alert(e.message)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 25}}>Signup As A Driver Now!</Text>

      <TextInput style={{width: '100%'}} onChangeText={(text) => onChangeValues('userName', text)} placeholder='Username' ></TextInput>
      <TextInput style={{width: '100%'}} onChangeText={(text) => onChangeValues('fullName', text)} placeholder='Full Name' ></TextInput>
      <TextInput style={{width: '100%'}} onChangeText={(text) => onChangeValues('age', text)} type="number" placeholder='age' ></TextInput>
      <TextInput style={{width: '100%'}} onChangeText={(text) => onChangeValues('phoneNumber', text)} type="number" placeholder='Phone No.' ></TextInput>
      <TextInput style={{width: '100%'}} onChangeText={(text) => onChangeValues('email', text)} placeholder='Email' ></TextInput>
      <TextInput style={{width: '100%'}} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder='Password' ></TextInput>

      <Button style={{width: '100%'}} mode="contained" onPress={submit}>Signup</Button>
      <Button style={{width: '100%'}} mode="contained" onPress={() => navigation.navigate('Login')}>To Login</Button>

    </View>
  );
}

export default Signup