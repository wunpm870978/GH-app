/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
'use strict';

import React from 'react';
import {View, Item} from 'native-base';
import {
  Alert,
  Text,
  AppRegistry,
  TextInput,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NumericInput from 'react-native-numeric-input';
import {apiBarcode} from '../../api/codeScanner.js';

export function BarcodeVendorScreen({route, navigation}) {
  const [barcodeData, setBarcodeDate] = React.useState({
    barcode: '',
    type: '',
  });
  const windowWidth = Dimensions.get('window').width;

  const [productInfo, setProductInfo] = React.useState({
    productID: '',
    cCode: '',
    name: '',
    brand: '',
    price: '',
    //promotion: '--',
    //startDate: '--',
    //endDate: '--',
    quantity: 0,
  });

  const handleChange = val => {
    switch (typeof val) {
      case 'object':
        setBarcodeDate({
          ...barcodeData,
          barcode: val.data,
          type: val.type,
        });
        break;
      case 'string':
        setBarcodeDate({
          ...barcodeData,
          barcode: val,
        });
        break;
    }
  };

  /* const dateFormating = val => {
    if (val === '--') {
      return '--';
    } else {
      let newDiscountDate = new Date(val);
      let newDateFormat =
        newDiscountDate.getFullYear() +
        '/' +
        (newDiscountDate.getMonth() + 1) +
        '/' +
        newDiscountDate.getDate();

      return newDateFormat;
    }
  }; */
  const apiHandle = async barcode => {
    const [status, result] = await apiBarcode(barcode);
    //console.log(result);
    if (status === 404) {
      setProductInfo({
        ...productInfo,
        productID: '',
        cCode: '',
        name: '',
        brand: '',
        price: '',
        //promotion: result[0].detail,
        //startDate: result[0].startDate,
        //endDate: result[0].endDate,
      });
      Alert.alert('Error', result.error, [{text: 'OK'}]);
    } else {
      if (result.detail !== null) {
        setProductInfo({
          ...productInfo,
          productID: result[0].productID,
          cCode: result[0].cCode,
          name: result[0].name,
          brand: result[0].brand,
          price: result[0].price,
          //promotion: result[0].detail,
          //startDate: result[0].startDate,
          //endDate: result[0].endDate,
        });
      } else {
        setProductInfo({
          ...productInfo,
          productID: result[0].productID,
          cCode: result[0].cCode,
          name: result[0].name,
          brand: result[0].brand,
          price: result[0].price,
          //promotion: '--',
          //startDate: '--',
          //endDate: '--',
        });
      }
    }
  };
  return (
    <KeyboardAvoidingView style={styles.root}>
      {/* OR Use a simple <View> instead of <KeyboardAvoidingView> */}
      <View style={styles.upperSection}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            if (
              barcodes[0].type !== 'UNKNOWN_FORMAT' &&
              barcodes[0].type !== 'QR_CODE'
            ) {
              handleChange(barcodes[0]);
              apiHandle(barcodes[0]);
            }
            console.log(barcodes[0]);
          }}>
          <BarcodeMask
            width={windowWidth * 0.85}
            height={150}
            showAnimatedLine={true}
            animationDuration={500}
            outerMaskOpacity={0.8}
          />
        </RNCamera>
      </View>
      <View style={styles.lowerSection}>
        <Item style={{marginBottom: 5}}>
          <Ionicons
            name="barcode-outline"
            size={20}
            style={styles.icon}
            onPress={() => {
              console.log(barcodeData.barcode);
            }}
          />
          <TextInput
            placeholder="貨品條碼/編號..."
            value={barcodeData.barcode}
            onChangeText={val => handleChange(val)}
          />
          <Ionicons
            name="search"
            size={25}
            style={styles.icon}
            onPress={() => {
              apiHandle(barcodeData.barcode);
            }}
          />
        </Item>
        <View style={styles.infoRow}>
          <View style={{flex: 2}}>
            <Text>貨品: </Text>
          </View>
          <View style={{flex: 8}}>
            <Text>{productInfo.name}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={{flex: 2}}>
            <Text>品牌: </Text>
          </View>
          <View style={{flex: 8}}>
            <Text>{productInfo.brand}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={{flex: 2}}>
            <Text>單價: </Text>
          </View>
          <View style={{flex: 8}}>
            <Text>{productInfo.price}</Text>
          </View>
        </View>
        <View
          style={{
            height: 50,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 5,
          }}>
          <NumericInput
            //maxValue={currentItem.maxQty}
            minValue={0}
            value={productInfo.quantity}
            onChange={value =>
              setProductInfo({
                ...productInfo,
                quantity: value,
              })
            }
            totalWidth={200}
            totalHeight={50}
            iconSize={25}
            //step={1.5}
            rounded
            textColor="#B0228C"
            iconStyle={{color: 'white'}}
            rightButtonBackgroundColor="#EA3788"
            leftButtonBackgroundColor="#E56B70"
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1,
            }}
            onPress={() => {
              if (productInfo.name !== '' && productInfo.quantity !== 0) {
                navigation.navigate('OrderCreate', {
                  productToCart: productInfo,
                });
              }
            }}>
            <Text style={{fontSize: 16}}>加入購物籃</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.infoRow}>
          <View style={{flex: 2}}>
            <Text>優惠: </Text>
          </View>
          <View style={{flex: 8}}>
            <Text>{productInfo.promotion}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={{flex: 2}}>
            <Text>期限: </Text>
          </View>
          <View style={{flex: 8}}>
            <Text>{dateFormating(productInfo.endDate)}</Text>
          </View>
        </View> */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  upperSection: {
    flex: 1,
  },
  lowerSection: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  camera: {
    height: '100%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    paddingBottom: 10,
    marginHorizontal: 5,
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    height: 25,
  },
});
AppRegistry.registerComponent('default', () => BarcodeVendorScreen);
