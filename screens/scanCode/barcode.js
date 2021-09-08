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
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiBarcode} from '../../api/codeScanner.js';

export function BarcodeScanScreen({navigation}) {
  const [barcodeData, setBarcodeDate] = React.useState({
    barcode: '',
    type: '',
  });
  const windowWidth = Dimensions.get('window').width;

  const [productInfo, setProductInfo] = React.useState({
    name: '',
    brand: '',
    price: '',
    promotion: '--',
    startDate: '--',
    endDate: '--',
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

  const dateFormating = val => {
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
  };
  const apiHandle = async () => {
    //const response = await apiBarcode(barcodeData.barcode);
    const [status, result] = await apiBarcode(barcodeData.barcode);
    if (status !== 200) {
      Alert.alert('Error', result.error, [{text: 'OK'}]);
    } else {
      if (result.detail !== null) {
        setProductInfo({
          ...productInfo,
          name: result[0].name,
          brand: result[0].brand,
          price: result[0].price,
          promotion: result[0].detail,
          startDate: result[0].startDate,
          endDate: result[0].endDate,
        });
      } else {
        setProductInfo({
          ...productInfo,
          name: result[0].name,
          brand: result[0].brand,
          price: result[0].price,
          promotion: '--',
          startDate: '--',
          endDate: '--',
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
            size={25}
            style={styles.icon}
            // onPress={() => {
            //   console.log(barcodeData.barcode);
            // }}
          />
          <TextInput
            placeholder="貨品條碼/編號..."
            value={barcodeData.barcode}
            onChangeText={val => handleChange(val)}
          />
          <Ionicons
            name="search"
            size={25}
            style={[styles.icon, {color: '#EA5E2A'}]}
            onPress={() => {
              apiHandle();
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
        <View style={styles.infoRow}>
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
        </View>
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
AppRegistry.registerComponent('default', () => BarcodeScanScreen);
