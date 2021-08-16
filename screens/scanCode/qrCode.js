/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
'use strict';

import React from 'react';
import {Item} from 'native-base';
import {
  TextInput,
  KeyboardAvoidingView,
  View,
  Dimensions,
  AppRegistry,
  StyleSheet,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

export function QRScanScreen({route, navigation}) {
  const [readQR, setReadQR] = React.useState({
    qrdata: '',
    type: '',
    phone: '',
    email: '',
    memId: '',
  });
  const windowWidth = Dimensions.get('window').width;

  const handleChange = val => {
    setReadQR({
      ...readQR,
      qrdata: val.data,
      type: val.type,
    });
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
            if (barcodes[0].type === 'QR_CODE') {
              handleChange(barcodes[0]);
            }
            console.log(barcodes[0]);
          }}>
          <BarcodeMask
            width={windowWidth * 0.8}
            height={windowWidth * 0.8}
            showAnimatedLine={true}
            animationDuration={500}
            outerMaskOpacity={0.8}
          />
        </RNCamera>
      </View>
      <View style={styles.lowerSection}>
        <Item style={{marginBottom: 5}}>
          <Ionicons name="ios-qr-code-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="code of membership"
            value={readQR.memId}
            onChangeText={val => handleChange(val)}
          />
          <Ionicons
            name="search"
            size={25}
            style={[styles.icon, {color: '#EA5E2A'}]}
            onPress={() => {
              //null
            }}
          />
        </Item>
        <View style={styles.infoRow}>
          <View style={{flex: 3}}>
            <Text>會員: </Text>
          </View>
          <View style={{flex: 7}}>
            <Text>{readQR.phone}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={{flex: 3}}>
            <Text>期限: </Text>
          </View>
          <View style={{flex: 7}}>
            <Text>{readQR.email}</Text>
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

AppRegistry.registerComponent('default', () => QRScanScreen);
