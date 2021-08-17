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

  React.useEffect(() => {
    if (route.params?.barcodeInfo) {
      setSearchQuery(state => route.params?.barcodeInfo);
    }
  }, [route.params?.barcodeInfo]);
  //<-------------------------------------------------------->

  const [staffData, setStaffData] = React.useState({
    staffID: '',
    district: '',
    location: '',
    position: '',
    token: '',
    shopID: '',
  });

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const loadStaff = async () => {
    try {
      await AsyncStorage.multiGet(
        ['staffID', 'district', 'location', 'position', 'userToken', 'shop_id'],
        (err, asyncData) => {
          if (err) {
            console.log(err);
          }
          const temp = {
            staffID: '',
            district: '',
            location: '',
            position: '',
            token: '',
            shopID: '',
          };
          asyncData.map(result => {
            switch (result[0]) {
              case 'staffID':
                temp.staffID = result[1];
                break;
              case 'district':
                temp.district = result[1];
                break;
              case 'location':
                temp.location = result[1];
                break;
              case 'position':
                temp.position = result[1];
                break;
              case 'userToken':
                temp.token = result[1];
                break;
              case 'shop_id':
                temp.shopID = result[1];
                break;
            }
          });
          setStaffData({
            staffID: temp.staffID,
            district: temp.district,
            location: temp.location,
            position: temp.position,
            token: temp.token,
            shopID: temp.shopID,
          });
        },
      );
    } catch (e) {
      console.log(e);
    }
  };
  const getData = async () => {
    if (staffData.position === 'manager') {
      const inventoryInfo = await apiFetchShopInventory(
        searchQuery,
        staffData.district,
        staffData.token,
      );
      const productInfo = await apiFetchProductInfo(
        searchQuery,
        staffData.token,
      );
      if (inventoryInfo.hasOwnProperty('error')) {
        Alert.alert('Error', inventoryInfo.error, [{text: 'OK'}]);
      } else {
        navigation.navigate('DisplayInventory', {
          inventoryInfo: inventoryInfo,
          productInfo: productInfo[0],
          staffData: staffData,
        });
      }
    } else {
      const quantityInfo = await apiFetchProductQty(
        searchQuery,
        staffData.shopID,
        staffData.token,
      );
      if (quantityInfo.hasOwnProperty('error')) {
        Alert.alert('Error', quantityInfo.error, [{text: 'OK'}]);
      } else {
        navigation.navigate('DisplayQuantity', {
          quantityInfo: quantityInfo[0],
          staffData: staffData,
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
            value={searchQuery}
            onIconPress={() => {
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
