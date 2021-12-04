import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

// import { useDispatch } from 'react-redux';
import { logout } from '../../config/firebase';

function submit() {
  logout()
}

function Logout() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        style={{ width: '100%' }}
        onPress={submit}>Logout</Button>
    </View>
  );
}

export default Logout