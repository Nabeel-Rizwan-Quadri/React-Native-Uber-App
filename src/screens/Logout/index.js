import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { logout } from '../../config/firebase';

function Logout() {
  function submit() {
    logout()
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        style={{ width: '100%' }}
        onPress={submit}>Logout</Button>
    </View>
  );
}

export default Logout