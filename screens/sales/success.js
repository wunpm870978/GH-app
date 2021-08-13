/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export function SuccessScreen({route, navigation}) {
  React.useLayoutEffect(() => {}, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 20}}>新增記錄成功</Text>
        </View>
        <View style={styles.BtnContainer}>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
              navigation.replace('CreateSales');
            }}>
            <Text>繼續新增營業額</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.BtnContainer}>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
              navigation.replace('CheckSales');
            }}>
            <Text>查看營業額</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.BtnContainer}>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
              navigation.replace('Home');
            }}>
            <Text>返回主頁面</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#D6EAF8',
    alignItems: 'center',
    //paddingVertical: windowWidth * 0.92,
  },
  container: {
    flex: 1,
    width: windowWidth * 0.92,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  Btn: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
