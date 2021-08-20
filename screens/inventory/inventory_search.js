/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {Alert, Text, View, TouchableOpacity} from 'react-native';
import {Searchbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../style/inventory/inventory_search_style.js';
import {
  apiFetchShopInventory,
  apiFetchProductInfo,
  apiFetchProductQty,
} from '../../api/inventory.js';

export function SearchInventoryScreen({route, navigation}) {
  //<----------------------hooks------------------------>
  React.useLayoutEffect(() => {
    loadStaff();
  }, [navigation]);
  //-----------------redux----------------------------//
  const InitialState = {
    isLoading: false,
    staffID: '',
    district: '',
    location: '',
    position: '',
    token: '',
    shopID: '',
    searchQuery: '',
  };
  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'GET_STAFF_INFO':
        return {
          ...prevState,
          staffID: action.staffID,
          district: action.district,
          location: action.location,
          position: action.position,
          token: action.token,
          shopID: action.shopID,
        };
      case 'ON_CHANGE_QUERY':
        return {
          ...prevState,
          searchQuery: action.searchQuery,
        };
      case 'FETCHING_API':
        return {
          ...prevState,
          isLoading: action.isLoading,
        };
      default:
        break;
    }
  };
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  React.useEffect(() => {
    if (route.params?.barcodeInfo) {
      dispatch({
        type: 'ON_CHANGE_QUERY',
        searchQuery: route.params?.barcodeInfo,
      });
    }
  }, [route.params?.barcodeInfo]);

  const onChangeSearch = query =>
    dispatch({type: 'ON_CHANGE_QUERY', searchQuery: query});

  const loadStaff = async () => {
    try {
      let staffID = await AsyncStorage.getItem('staffID');
      let district = await AsyncStorage.getItem('district');
      let location = await AsyncStorage.getItem('location');
      let position = await AsyncStorage.getItem('position');
      let token = await AsyncStorage.getItem('userToken');
      let shopID = await AsyncStorage.getItem('shop_id');
      dispatch({
        type: 'GET_STAFF_INFO',
        staffID: staffID,
        district: district,
        location: location,
        position: position,
        token: token,
        shopID: shopID,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const getData = async () => {
    if (state.position === 'manager') {
      const inventoryInfo = await apiFetchShopInventory(
        state.searchQuery,
        state.district,
        state.token,
      );
      const [status, result] = await apiFetchProductInfo(
        state.searchQuery,
        state.token,
      );
      dispatch({type: 'FETCHING_API', isLoading: false});
      if (inventoryInfo.hasOwnProperty('error')) {
        Alert.alert('Error', inventoryInfo.error, [{text: 'OK'}]);
      } else {
        navigation.navigate('DisplayInventory', {
          inventoryInfo: inventoryInfo,
          productInfo: result[0],
          staffData: {
            staffID: state.staffID,
            district: state.district,
            location: state.location,
            position: state.position,
            token: state.token,
            shopID: state.shopID,
          },
        });
      }
    } else {
      const quantityInfo = await apiFetchProductQty(
        state.searchQuery,
        state.shopID,
        state.token,
      );
      dispatch({type: 'FETCHING_API', isLoading: false});
      if (quantityInfo.hasOwnProperty('error')) {
        Alert.alert('Error', quantityInfo.error, [{text: 'OK'}]);
      } else {
        navigation.navigate('DisplayQuantity', {
          quantityInfo: quantityInfo[0],
          staffData: {
            staffID: state.staffID,
            district: state.district,
            location: state.location,
            position: state.position,
            token: state.token,
            shopID: state.shopID,
          },
        });
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.searchView}>
          <Searchbar
            style={{marginTop: 10, width: '90%'}}
            placeholder="貨品號碼/條碼..."
            onChangeText={onChangeSearch}
            value={state.searchQuery}
            onIconPress={() => {
              dispatch({type: 'FETCHING_API', isLoading: true});
              getData();
            }}
          />
          <TouchableOpacity
            style={styles.barcodeRow}
            onPress={() => {
              navigation.push('BarcodeObtain');
            }}>
            <Text style={styles.text}>掃描貨品</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.enquiryRow}
            onPress={() => {
              getData();
            }}>
            <Text style={styles.text}>查詢貨品</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
