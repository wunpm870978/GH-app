/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Alert,
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from '../../style/sales/createSalesModal_style.js';
import {LoginState, SalesState, SalesMethod} from '../../api/authText.js';
import {apiCreateSalesRecord} from '../../api/sales.js';

export function ModalSalesList({navigation}) {
  const loginState = React.useContext(LoginState);
  const salesState = React.useContext(SalesState);
  const {toggleModal, isLoading, resetAllFields} =
    React.useContext(SalesMethod);
  const modalRenderItem = salesState.productList.map((item, index) => {
    return (
      <View
        key={'modalMainContainer' + index.toString()}
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginBottom: 1,
          //backgroundColor: 'cyan',
        }}>
        <View
          key={'modalTextContainer' + index.toString()}
          style={{
            flex: 7,
            //backgroundColor: 'yellow',
            justifyContent: 'center',
            paddingLeft: 30,
          }}>
          <Text key={'modalText' + index.toString()}>
            {item.name}-{item.brand}
          </Text>
        </View>
        <View
          key={'modalText2Container' + index.toString()}
          style={{flex: 3, alignItems: 'center'}}>
          <Text key={'modalText2' + index.toString()} style={styles.text}>
            {item.quantity}
          </Text>
        </View>
      </View>
    );
  });
  const createRecord = async () => {
    const [status, result] = await apiCreateSalesRecord(
      salesState.response.assets[0],
      salesState.date,
      salesState.time,
      salesState.price,
      salesState.paymentMethod,
      salesState.promotionCode,
      salesState.productList,
      salesState.remark,
      loginState.shopID,
      loginState.staffID,
    );
    isLoading(false);
    if (status === 200) {
      resetAllFields();
      navigation.replace('Success');
    } else {
      Alert.alert('錯誤', '新增記錄失敗!');
      Alert.alert('錯誤', result);
    }
  };
  const rowRender = (header, content) => {
    return (
      <View style={styles.modalTextContainer}>
        <View style={styles.modalTextLeftPanel}>
          <Text>{header}</Text>
        </View>
        <View style={styles.modalTextRightPanel}>
          <Text>{content}</Text>
        </View>
      </View>
    );
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={salesState.modalVisible_createSales}
      onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>新增本期營業額</Text>
          </View>
          <View style={{borderWidth: 0.5, width: 150, marginBottom: 5}} />
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}>
            {rowRender(
              '商鋪： ',
              loginState.location + ' ' + loginState.shopID,
            )}
            {rowRender('時間： ', salesState.date + ' ' + salesState.time)}
            {rowRender('優惠： ', salesState.promotionCode)}
            {rowRender('付款方式： ', salesState.paymentMethod)}
            <View style={styles.divisionLine} />
            <View style={styles.modalTextContainer}>
              <View
                style={{
                  flex: 7,
                  justifyContent: 'center',
                  paddingLeft: 30,
                }}>
                <Text>貨品藍 </Text>
              </View>
              <View style={{flex: 3, alignItems: 'center'}}>
                <Text>數量</Text>
              </View>
            </View>
            {modalRenderItem}
            <View style={styles.divisionLine} />
            {rowRender('總價： ', '$' + salesState.price)}
            {rowRender('備註： ', salesState.remark)}
          </ScrollView>
          <View style={{borderWidth: 0.5, width: 150, marginTop: 5}} />
          <View style={styles.modalBtnContainer}>
            <TouchableOpacity style={styles.modalBtn} onPress={toggleModal}>
              <Text style={styles.modalText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => {
                toggleModal();
                isLoading(true);
                createRecord();
              }}>
              <Text style={styles.modalText}>新增</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
