/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
'use strict';

import React from 'react';
import {View, Item} from 'native-base';
import {
  Alert,
  AppRegistry,
  TextInput,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

export function BarcodeObtainScreen({route, navigation}) {
  const [barcodeData, setBarcodeDate] = React.useState({
    barcode: '',
    type: '',
  });
  const windowWidth = Dimensions.get('window').width;

  const handleChange = val => {
    setBarcodeDate({
      ...barcodeData,
      barcode: val.data,
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
            if (
              barcodes[0].type !== 'UNKNOWN_FORMAT' &&
              barcodes[0].type !== 'QR_CODE'
            ) {
              handleChange(barcodes[0]);
              navigation.navigate({
                name: 'CheckInventory',
                params: {barcodeInfo: barcodes[0].data},
                merge: true,
              });
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
AppRegistry.registerComponent('default', () => BarcodeObtainScreen);
