/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LoginStackNavigator, HomeStackNavigator} from './stacks.js';
import {View, ActivityIndicator} from 'react-native';
import {AuthContext, LoginState} from '../api/authText.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Main = () => {
  const initialLoginState = {
    isLoading: true,
    staffID: null,
    shopID: null,
    shopPicker: [],
    position: null,
    location: null,
    district: null,
    token: null,
    validLoginStatue: false,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          staffID: action.staffID,
          shopID: action.shopID,
          position: action.position,
          location: action.location,
          district: action.district,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          staffID: action.staffID,
          token: action.token,
          //shopID: action.shopID,
          shopPicker: action.shopPicker,
          position: action.position,
          //location: action.location,
          //district: action.district,
          isLoading: false,
        };
      case 'VALID':
        return {
          ...prevState,
          validLoginStatue: true,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          staffID: null,
          token: null,
          isLoading: false,
          shopID: null,
          shopPicker: [],
          position: null,
          location: null,
          district: null,
          validLoginStatue: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          staffID: action.staffID,
          token: action.token,
          isLoading: false,
        };
      case 'SET_SHOPPICKER':
        return {
          ...prevState,
          shopID: action.shopID,
          location: action.location,
          district: action.district,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser, shopPicker) => {
        try {
          await AsyncStorage.setItem('staffID', foundUser[0].staffID);
          await AsyncStorage.setItem('userToken', foundUser[0].userToken);
          //await AsyncStorage.setItem('shop_id', foundUser[0].shop_id);
          //await AsyncStorage.setItem('location', foundUser[0].location);
          //await AsyncStorage.setItem('district', foundUser[0].district);
          await AsyncStorage.setItem('position', foundUser[0].position);
        } catch (e) {
          console.log(e);
        }
        console.log('foundUser: ', foundUser);
        dispatch({
          type: 'LOGIN',
          staffID: foundUser[0].staffID,
          token: foundUser[0].userToken,
          shopPicker: shopPicker,
          //shopID: foundUser[0].shop_id,
          //location: foundUser[0].location,
          //district: foundUser[0].district,
          position: foundUser[0].position,
        });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('staffID');
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('shop_id');
          await AsyncStorage.removeItem('location');
          await AsyncStorage.removeItem('district');
          await AsyncStorage.removeItem('position');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      setShopPicker: async selectedPicker => {
        try {
          await AsyncStorage.setItem('shop_id', selectedPicker.shopID);
          await AsyncStorage.setItem('location', selectedPicker.location);
          await AsyncStorage.setItem('district', selectedPicker.district);
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: 'SET_SHOPPICKER',
          shopID: selectedPicker.shopID,
          location: selectedPicker.location,
          district: selectedPicker.district,
        });
      },
      valid: async () => {
        dispatch({type: 'VALID'});
      },
    }),
    [],
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <LoginState.Provider value={loginState}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.validLoginStatue !== false ? (
            <HomeStackNavigator />
          ) : (
            <LoginStackNavigator />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </LoginState.Provider>
  );
};
