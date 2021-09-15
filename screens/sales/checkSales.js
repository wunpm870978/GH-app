/* eslint-disable prettier/prettier */

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../../style/sales/checkSales_style.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {apiFetchSalesRecord} from '../../api/sales.js';
import {LoginState, SalesState, SalesMethod} from '../../api/authText.js';

export function CheckSalesScreen({route, navigation}) {
  const loginState = React.useContext(LoginState);
  const salesState = React.useContext(SalesState);
  const {
    toggleCalendar,
    resetCalendar,
    setSalesPeriodDate,
    setSalesPeriodRecord,
    resetDates,
  } = React.useContext(SalesMethod);

  const enquiry = async () => {
    if (
      salesState.startDate === '開始日期' ||
      salesState.endDate === '結束日期'
    ) {
    } else {
      const [status, salesRecord] = await apiFetchSalesRecord(
        salesState.startDate,
        salesState.endDate,
        loginState.shopID,
        'checkSales',
      );
      const [statusO, salesRecordO] = await apiFetchSalesRecord(
        salesState.startDate,
        salesState.endDate,
        loginState.shopID,
        'checkSalesOverall',
      );
      const [statusA, salesRecordA] = await apiFetchSalesRecord(
        salesState.startDate,
        salesState.endDate,
        loginState.shopID,
        'checkSalesAccumulate',
      );
      if (status === 200 && statusA === 200 && statusO === 200) {
        setSalesPeriodRecord(salesRecord, salesRecordO, salesRecordA);
        navigation.push('SalesRecord');
        resetDates();
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <DateTimePickerModal
          display={salesState.display}
          isVisible={salesState.isVisible}
          mode={salesState.pickerMode}
          onConfirm={setSalesPeriodDate}
          onCancel={resetCalendar}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            toggleCalendar(false);
          }}>
          <Text style={styles.text}>{salesState.startDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            toggleCalendar(true);
          }}>
          <Text style={styles.text}>{salesState.endDate}</Text>
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
