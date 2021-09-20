/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/Login.js';
import {LoginShopScreen} from '../screens/LoginContinue.js';
import {HomeScreen} from '../screens/Home.js';
import {DiscountInfoScreen} from '../screens/discount/DiscountInfo.js';
import {DiscountProductListScreen} from '../screens/discount/productsInDiscount.js';
import {QRScanScreen} from '../screens/scanCode/qrCode.js';
import {BarcodeScanScreen} from '../screens/scanCode/barcode.js';
import {CompanyNewsScreen} from '../screens/companyNews/CompanyNews.js';
import {NewsContentScreen} from '../screens/companyNews/content.js';
import {MallMainScreen} from '../screens/mall/filter.js';
import {ProductListScreen} from '../screens/mall/productList.js';
import {CreateMembershipScreen} from '../screens/membership/membership.js';

import {OrderProvider} from './orderProvider.js';
import {SalesProvider} from './salesProvider.js';
import {InventoryProvider} from './inventoryProvider.js';

const Stack = createStackNavigator();
//Login
export const LoginStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetShop"
        component={LoginShopScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
//Home page主頁面
export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      //screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        //component={HomeBottomTapNavigator}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Order"
        component={OrderProvider}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Discount"
        component={DiscountStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScanScreen}
        options={{
          title: 'QR code',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScanScreen}
        options={{
          title: 'Barcode',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="Inventory"
        component={InventoryProvider}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Mall"
        component={MallStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Sales"
        component={SalesProvider}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CompanyNews"
        component={CompanyNewsStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Membership"
        component={MembershipStackNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
// Shop Mall商城
export const MallStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MainMall">
      <Stack.Screen
        name="MainMall"
        component={MallMainScreen}
        options={{
          title: '本店商城',
          //headerLeft: <View></View>,
          headerRight: () => <View />,
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
          headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
        }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          title: '貨品列表',
          headerRight: () => <View />,
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
          headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
        }}
      />
    </Stack.Navigator>
  );
};
//Discount 優惠資訊
export const DiscountStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="DiscountInfo">
      <Stack.Screen
        name="DiscountInfo"
        component={DiscountInfoScreen}
        options={{
          title: '優惠資訊',
          //headerLeft: <View></View>,
          //headerRight: () => <View />,
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
          //headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
        }}
      />
      <Stack.Screen
        name="DiscountList"
        component={DiscountProductListScreen}
        options={{
          title: '優惠列表',
          //headerLeft: <View></View>,
          headerRight: () => <View />,
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
          headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
        }}
      />
    </Stack.Navigator>
  );
};
//News 公司消息
export const CompanyNewsStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CompanyNews">
      <Stack.Screen
        name="CompanyNews"
        component={CompanyNewsScreen}
        options={{
          title: '公司消息',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="NewsContent"
        component={NewsContentScreen}
        options={{
          title: '消息詳細',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
    </Stack.Navigator>
  );
};
//創建會員
export const MembershipStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Membership">
      <Stack.Screen
        name="CreateMember"
        component={CreateMembershipScreen}
        options={{
          title: '創建會員',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
    </Stack.Navigator>
  );
};
