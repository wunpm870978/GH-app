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
    position: null,
    location: null,
    district: null,
    token: null,
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
          shopID: action.shopID,
          position: action.position,
          location: action.location,
          district: action.district,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          staffID: null,
          token: null,
          isLoading: false,
          shopID: null,
          position: null,
          location: null,
          district: null,
        };
      case 'REGISTER':
        return {
          ...prevState,
          staffID: action.staffID,
          token: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        try {
          await AsyncStorage.setItem('staffID', foundUser[0].staffID);
          await AsyncStorage.setItem('userToken', foundUser[0].userToken);
          await AsyncStorage.setItem('shop_id', foundUser[0].shop_id);
          await AsyncStorage.setItem('location', foundUser[0].location);
          await AsyncStorage.setItem('district', foundUser[0].district);
          await AsyncStorage.setItem('position', foundUser[0].position);
        } catch (e) {
          console.log(e);
        }
        console.log('foundUser: ', foundUser);
        dispatch({
          type: 'LOGIN',
          staffID: foundUser[0].staffID,
          token: foundUser[0].userToken,
          shopID: foundUser[0].shop_id,
          location: foundUser[0].location,
          district: foundUser[0].district,
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
          {loginState.token !== null ? (
            <HomeStackNavigator />
          ) : (
            <LoginStackNavigator />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </LoginState.Provider>
  );
};
