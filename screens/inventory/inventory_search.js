/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import styles from '../../style/inventory/inventory_search_style.js';
import {
  apiFetchShopInventory,
  apiFetchProductInfo,
  apiFetchProductQty,
} from '../../api/inventory.js';
import {
  LoginState,
  InventoryState,
  InventoryMethod,
} from '../../api/authText.js';

export function SearchInventoryScreen({route, navigation}) {
  const loginState = React.useContext(LoginState);
  const orderState = React.useContext(InventoryState);
  const {onChangeSearch, isLoading, setProductInfo} =
    React.useContext(InventoryMethod);

  const getData = async () => {
    if (loginState.position === 'supermanager') {
      const inventoryInfo = await apiFetchShopInventory(
        orderState.searchQuery,
        loginState.district,
        loginState.token,
      );
      const [status, result] = await apiFetchProductInfo(
        orderState.searchQuery,
        loginState.token,
      );
      isLoading(false);
      if (inventoryInfo.hasOwnProperty('error')) {
        Alert.alert('Error', inventoryInfo.error, [{text: 'OK'}]);
      } else {
        navigation.navigate('DisplayInventory', {
          inventoryInfo: inventoryInfo,
          productInfo: result[0],
        });
      }
    } else {
      const quantityInfo = await apiFetchProductQty(
        orderState.searchQuery,
        loginState.shopID,
        loginState.token,
      );
      isLoading(false);
      if (quantityInfo.hasOwnProperty('error')) {
        Alert.alert('Error', quantityInfo.error, [{text: 'OK'}]);
      } else {
        setProductInfo(quantityInfo[0]);
        navigation.navigate('DisplayQuantity');
      }
    }
  };

  if (orderState.isLoading) {
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
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.searchView}>
          <Searchbar
            style={{marginTop: 10, width: '90%'}}
            placeholder="貨品號碼/條碼..."
            onChangeText={onChangeSearch}
            value={orderState.searchQuery}
            onIconPress={() => {
              isLoading(true);
              getData();
            }}
          />
          <TouchableOpacity
            style={styles.barcodeRow}
            onPress={() => {
              getData();
            }}>
            <Text style={styles.text}>查詢貨品</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.enquiryRow}
            onPress={() => {
              navigation.push('BarcodeObtain');
            }}>
            <Text style={styles.text}>掃描貨品</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
