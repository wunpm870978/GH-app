/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Alert, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';
import styles from '../style/home_style.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {MyStatusBar} from '../style/StatusBar.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../api/authText.js';

export function HomeScreen({route, navigation}) {
  React.useLayoutEffect(() => {
    loadStaff();
  }, [navigation]);

  const {signOut} = React.useContext(AuthContext);
  const loadStaff = async () => {
    try {
      await AsyncStorage.multiGet(
        ['staffID', 'location', 'district', 'position', 'userToken', 'shop_id'],
        (err, asyncData) => {
          if (err) {
            console.log(err);
          }
          const temp = {
            staffID: '',
            location: '',
            district: '',
            position: '',
            token: '',
            shopID: '',
          };
          asyncData.map(result => {
            switch (result[0]) {
              case 'staffID':
                temp.staffID = result[1];
                break;
              case 'location':
                temp.location = result[1];
                break;
              case 'district':
                temp.district = result[1];
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
            location: temp.location,
            district: temp.district,
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
  const [staffData, setStaffData] = React.useState({
    staffID: '',
    location: '',
    district: '',
    position: '',
    token: '',
    shopID: '',
  });

  const authorityAuthentication = () => {
    if (staffData.position !== 'manager') {
      Alert.alert('注意', '未有權限訪問。');
    } else {
      navigation.push('Sales');
    }
  };

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#D6EAF8" barStyle="dark-content" />
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.topRowLeft}
          onPress={() => {
            signOut();
          }}>
          <MaterialCommunityIcons
            name="logout"
            size={25}
            color="#F1948A"
            style={{paddingLeft: 20}}
          />
          <Text style={{paddingLeft: 10, color: '#F1948A'}}>登出</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{flex: 1, width: '100%'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.btnTopRow}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.push('Order', {
                screen: 'OrderCreate',
                params: {staffData: staffData},
              })
            }>
            <FontAwesome5
              name="pencil-alt"
              size={40}
              style={(styles.icon, {paddingBottom: 10})}
              color="#F1948A"
            />
            <Text style={{color: '#F1948A'}}>創建訂單</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.push('Discount');
            }}>
            <FontAwesome5
              name="gifts"
              size={40}
              style={(styles.icon, {paddingBottom: 10})}
              color="#F1948A"
            />
            <Text style={{color: '#F1948A'}}>優惠資訊</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.push('QRScanner')}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={40}
              style={(styles.icon, {paddingBottom: 10})}
              color="#F1948A"
            />
            <Text style={{color: '#F1948A'}}>掃描二維碼</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.push('BarcodeScanner')}>
            <Ionicons
              name="barcode-outline"
              size={40}
              style={(styles.icon, {paddingBottom: 10})}
              color="#F1948A"
            />
            <Text style={{color: '#F1948A'}}>掃描條碼</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => authorityAuthentication()}>
            <FontAwesome5
              name="dollar-sign"
              size={40}
              style={(styles.icon, {paddingBottom: 10})}
              color="#F1948A"
            />
            <Text style={{color: '#F1948A'}}>營業額</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              //navigation.push('Mall');
              navigation.push('Mall', {
                screen: 'MainMall',
                params: {staffData: staffData},
              });
            }}>
            <Ionicons
              name="library-outline"
              size={40}
              style={(styles.icon, {paddingBottom: 10})}
              color="#F1948A"
            />
            <Text style={{color: '#F1948A'}}>商城分類</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.push('Inventory');
            }}>
            <MaterialIcons
              name="inventory"
              size={40}
              style={(styles.icon, {paddingBottom: 10})}
              color="#F1948A"
            />
            <Text style={{color: '#F1948A'}}>倉庫</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              //navigation.popToTop()
            }}>
            <FontAwesome5
              name="pen-alt"
              size={40}
              style={(styles.icon, {paddingBottom: 10})}
              color="#F1948A"
            />
            <Text style={{color: '#F1948A'}}>值班</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              //navigation.push('Inventory');
            }}>
            <MaterialIcons
              name="inventory"
              size={40}
              style={(styles.icon, {paddingBottom: 10})}
              color="#F1948A"
            />
            <Text style={{color: '#F1948A'}}>倉庫</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.push('CompanyNews');
            }}>
            <Ionicons
              name="newspaper-outline"
              size={40}
              style={(styles.icon, {paddingBottom: 10})}
              color="#F1948A"
            />
            <Text style={{color: '#F1948A'}}>公司消息</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
