/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export function SelectSalesScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.push('CreateSales');
          }}>
          <Text style={styles.text}>新增本期營業額</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.push('CheckSales');
          }}>
          <Text style={styles.text}>查詢本期營業額</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6EAF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainer: {
    width: windowWidth - windowWidth * 0.08 - 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    height: 50,
    width: '100%',
    borderColor: 'grey',
    //backgroundColor: '#00FF00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'grey',
    fontSize: 18,
  },
});
