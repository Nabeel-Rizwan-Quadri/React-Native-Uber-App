import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { loginUser } from '../../config/firebase';
import { TextInput, Button } from 'react-native-paper';

function Login({ navigation }) {

  const [authData, setAuthData] = useState({})

  const onChangeValues = (key, text) => {
    console.log(text)
    setAuthData({ ...authData, [key]: text })
    console.log("On Change: ", authData)
  }

  const submit = async () => {
    try {
      await loginUser(authData)
      // alert("Successfully Logged In")
    }
    catch (e) {
      alert(e.message)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 25}}>Login Here</Text>

      <TextInput style={{width: '100%'}} label="Email" onChangeText={(text) => onChangeValues('email', text)} type="email" placeholder='Email' ></TextInput>
      <TextInput style={{width: '100%'}} label="Password" secureTextEntry
      
      onChangeText={(text) => onChangeValues('password', text)} secureTextEntry={true} placeholder='Password' ></TextInput>

      <Button style={{width: '100%'}} title="Login" mode="contained" onPress={submit} >Login</Button>
      <Button style={{width: '100%'}} title="Signup" mode="contained" onPress={() => navigation.navigate('Signup')} >To Signup</Button>

    </View>
  );
}


export default Login