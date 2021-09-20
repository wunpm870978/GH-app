/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Alert, Text, View, TouchableOpacity} from 'react-native';
import {LoginState, AuthContext} from '../api/authText.js';
import {Picker} from '@react-native-picker/picker';

export function LoginShopScreen({route, navigation}) {
  const loginState = React.useContext(LoginState);
  const {setShopPicker, valid} = React.useContext(AuthContext);
  const pickerRender = loginState.shopPicker.map((item, index) => {
    return (
      <Picker.Item
        key={'picker' + index.toString()}
        label={item.shopID + '-' + item.location}
        value={item}
      />
    );
  });
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <View
        style={{
          width: '90%',
          borderWidth: 1,
          borderColor: 'grey',
          paddingRight: 10,
          marginBottom: 10,
        }}>
        <Picker
          style={{width: '100%'}}
          onValueChange={selectedPicker => setShopPicker(selectedPicker)}>
          {pickerRender}
        </Picker>
      </View>
      <TouchableOpacity
        style={{
          height: 50,
          width: 100,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#A9CA81',
          marginHorizontal: 10,
          borderRadius: 10,
        }}
        onPress={() => {
          if (loginState.shopID !== null) {
            valid();
          } else {
            Alert.alert('注意', '請選擇店鋪!');
          }
        }}>
        <Text style={{color: 'white'}}>確認</Text>
      </TouchableOpacity>
    </View>
  );
}
