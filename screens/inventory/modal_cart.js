/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../style/inventory/inventory_display_style.js';
import io from 'socket.io-client';
import {
  LoginState,
  InventoryState,
  InventoryMethod,
} from '../../api/authText.js';

const windowWidth = Dimensions.get('window').width;

export function ModalCart() {
  const loginState = React.useContext(LoginState);
  const orderState = React.useContext(InventoryState);
  const {toggleModal, onChangeRequestQuantity} =
    React.useContext(InventoryMethod);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={orderState.toggleModal}
      onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
        <View
          style={{
            height: 250,
            width: windowWidth - windowWidth * 0.08 - 30,
            alignItems: 'center',
            //justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 0.5,
          }}>
          <View
            style={{
              flexDirection: 'row-reverse',
              width: '100%',
              height: 25,
              //backgroundColor: 'green',
              alignItems: 'center',
            }}>
            <Ionicons
              name="close"
              size={25}
              color="red"
              style={{marginHorizontal: 5}}
              onPress={toggleModal}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: 35,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.modalTitle}>申請調貨</Text>
          </View>
          <View style={{borderWidth: 0.5, width: 250}} />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <Text style={{color: 'grey', fontSize: 18, fontWeight: 'bold'}}>
                {loginState.location}-{loginState.shopID}
              </Text>
            </View>
            <NumericInput
              maxValue={6}
              minValue={1}
              value={orderState.requestQuantity}
              onChange={onChangeRequestQuantity}
              totalWidth={240}
              totalHeight={50}
              iconSize={25}
              //step={1.5}
              rounded
              textColor="#B0228C"
              iconStyle={{color: 'white'}}
              rightButtonBackgroundColor="#EA3788"
              leftButtonBackgroundColor="#E56B70"
            />
            <TouchableOpacity
              style={styles.modalDate}
              onPress={() => {
                let currentDate = new Date();
                let newDateFormat =
                  currentDate.getFullYear() +
                  '-' +
                  (currentDate.getMonth() + 1) +
                  '-' +
                  currentDate.getDate();
                const socket = io('http://172.104.44.182:3004/');
                socket.emit('requestInventory', {
                  shopID: loginState.shopID,
                  staffID: loginState.staffID,
                  productID: orderState.productID,
                  quantity: orderState.requestQuantity,
                  requestDate: newDateFormat,
                });
                toggleModal();
              }}>
              <Text style={styles.modalText}>確認</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
