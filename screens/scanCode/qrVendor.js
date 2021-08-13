/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
'use strict';

import React from 'react';
import {
  Dimensions,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
//import BarcodeMask from 'react-native-barcode-mask';
import Anticon from 'react-native-vector-icons/AntDesign';

export function QRScanVendorScreen({route, navigation}) {
  const screenWidth = Dimensions.get('screen').width.toString();
  return (
    <QRCodeScanner
      onRead={e => {
        // Linking.openURL(e.data).catch(err =>
        //   console.error('An error occured', err),
        // );
        navigation.navigate({
          name: 'Order',
          params: {qrInfo: e.data},
          merge: true,
        });
      }}
      //containerStyle={{marginBottom: 50}}
      //cameraProps should be before cameraStyle
      cameraProps={{ratio: '1:1'}}
      cameraStyle={{
        height: screenWidth * 0.9,
        width: screenWidth * 0.9,
        alignSelf: 'center',
        justifyContent: 'center',
      }}
      showMarker={true}
      flashMode={RNCamera.Constants.FlashMode.off}
      topContent={
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Anticon
            name="back"
            size={30}
            style={({marginHorizontal: 10}, {flex: 2})}
          />
          <Text style={styles.centerText}>Scan QR code</Text>
        </TouchableOpacity>
      }
    />
  );
}

const styles = StyleSheet.create({
  column: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    flex: 8,
    fontSize: 18,
    color: '#777',
    marginLeft: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    marginTop: 0,
    flexDirection: 'row',
    paddingLeft: 10,
    //alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
});

AppRegistry.registerComponent('default', () => QRScanVendorScreen);
