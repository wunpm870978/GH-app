/* eslint-disable prettier/prettier */

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../../style/sales/checkSales_style.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiFetchSalesRecord} from '../../api/sales.js';

export function CheckSalesScreen({route, navigation}) {
  React.useLayoutEffect(() => {
    loadStaff();
  }, [navigation]);
  const loadStaff = async () => {
    try {
      await AsyncStorage.multiGet(
        ['staffID', 'district', 'position', 'userToken', 'shop_id'],
        (err, asyncData) => {
          if (err) {
            console.log(err);
          }
          const temp = {
            staffID: '',
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
    district: '',
    position: '',
    token: '',
    shopID: '',
  });
  const [datePicker, setDatePicker] = React.useState({
    isVisible: false,
    pickerMode: null,
    display: 'default',
  });
  const [flag, setFlag] = React.useState(false);
  const [startDate, setStartDate] = React.useState('開始日期');
  const [endDate, setEndDate] = React.useState('結束日期');

  const toggleCalendar = () => {
    setDatePicker({
      ...datePicker,
      pickerMode: 'date',
      display: 'calendar',
      isVisible: !datePicker.isVisible,
    });
  };

  const hideDatePicker = () => {
    setDatePicker({
      ...datePicker,
      isVisible: false,
    });
  };

  const handleConfirm = val => {
    if (flag === false) {
      let day = ('0' + val.getDate()).slice(-2);
      let month = ('0' + (val.getMonth() + 1)).slice(-2);
      let year = val.getFullYear();
      setStartDate(year + '-' + month + '-' + day);
    } else {
      let day = ('0' + val.getDate()).slice(-2);
      let month = ('0' + (val.getMonth() + 1)).slice(-2);
      let year = val.getFullYear();
      setEndDate(year + '-' + month + '-' + day);
    }
    hideDatePicker();
  };

  const enquiry = async () => {
    const salesRecord = await apiFetchSalesRecord(
      startDate,
      endDate,
      staffData.shopID,
      staffData.token,
    );
    console.log(salesRecord);
    navigation.push('SalesRecord', {
      salesRecord: salesRecord,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <DateTimePickerModal
          display={datePicker.display}
          isVisible={datePicker.isVisible}
          mode={datePicker.pickerMode}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setFlag(false);
            toggleCalendar();
          }}>
          <Text style={styles.text}>{startDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setFlag(true);
            toggleCalendar();
          }}>
          <Text style={styles.text}>{endDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            enquiry();
          }}>
          <Text style={styles.text}>查詢</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
