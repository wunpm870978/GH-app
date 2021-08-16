/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/Login.js';
import {HomeScreen} from '../screens/Home.js';
import {DiscountInfoScreen} from '../screens/discount/DiscountInfo.js';
import {DiscountProductListScreen} from '../screens/discount/productsInDiscount.js';
import {createOrderScreen} from '../screens/createOrder/createOrder.js';
import {PaymentScreen} from '../screens/createOrder/payment.js';
import {ReceiptScreen} from '../screens/createOrder/receipt.js';
import {QRScanScreen} from '../screens/scanCode/qrCode.js';
import {QRScanVendorScreen} from '../screens/scanCode/qrVendor.js';
import {BarcodeScanScreen} from '../screens/scanCode/barcode.js';
import {BarcodeVendorScreen} from '../screens/scanCode/barcodeVendor.js';
import {BarcodeObtainScreen} from '../screens/scanCode/barcodeObtain.js';
import {SearchInventoryScreen} from '../screens/inventory/inventory_search.js';
import {DisplayInventoryScreen} from '../screens/inventory/inventory_display.js';
import {DisplayQuantityScreen} from '../screens/inventory/inventory_display_qty.js';
import {CartInventoryScreen} from '../screens/inventory/inventory_cart.js';
import {SelectSalesScreen} from '../screens/sales/selectSales.js';
import {CreateSalesScreen} from '../screens/sales/createSales.js';
import {CheckSalesScreen} from '../screens/sales/checkSales.js';
import {SalesRecordScreen} from '../screens/sales/recordDisplay.js';
import {SuccessScreen} from '../screens/sales/success.js';
import {CompanyNewsScreen} from '../screens/companyNews/CompanyNews.js';
import {NewsContentScreen} from '../screens/companyNews/content.js';
import {MallMainScreen} from '../screens/mall/filter.js';
import {ProductListScreen} from '../screens/mall/productList.js';

const Stack = createStackNavigator();

export const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

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
        component={OrderStackNavigator}
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
        component={InventoryStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Mall"
        component={MallStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Sales"
        component={SalesStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CompanyNews"
        component={CompanyNewsStackNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

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
export const OrderStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OrderCreate">
      <Stack.Screen
        name="OrderCreate"
        component={createOrderScreen}
        options={{
          title: '創建訂單',
          headerStyle: {
            backgroundColor: '#F4F5F8',
            //borderBottomWidth: 1,
            //borderColor: '#A9CA81',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          title: '付款',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="Receipt"
        component={ReceiptScreen}
        options={{
          title: '收據',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="QRVendor"
        component={QRScanVendorScreen}
        options={{
          title: 'QR code',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="FindPorduct"
        component={BarcodeVendorScreen}
        options={{
          title: '搜查貨品',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
    </Stack.Navigator>
  );
};
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
export const InventoryStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SearchInventory">
      <Stack.Screen
        name="SearchInventory"
        component={SearchInventoryScreen}
        options={{
          title: '查詢倉庫',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="BarcodeObtain"
        component={BarcodeObtainScreen}
        options={{
          title: 'Barcode',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="DisplayQuantity"
        component={DisplayQuantityScreen}
        options={{
          title: '貨品資料',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="DisplayInventory"
        component={DisplayInventoryScreen}
        options={{
          title: '倉庫',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="CartInventory"
        component={CartInventoryScreen}
        options={{
          title: '調貨籃',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
    </Stack.Navigator>
  );
};
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
export const SalesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SelectSales">
      <Stack.Screen
        name="SelectSales"
        component={SelectSalesScreen}
        options={{
          title: '營業額',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="CreateSales"
        component={CreateSalesScreen}
        options={{
          title: '新增本期營業額',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckSales"
        component={CheckSalesScreen}
        options={{
          title: '查看營業額',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
      <Stack.Screen
        name="SalesRecord"
        component={SalesRecordScreen}
        options={{
          title: '營業額數據',
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}
      />
    </Stack.Navigator>
  );
};
