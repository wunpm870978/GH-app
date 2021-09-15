/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */

import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from '../../style/inventory/inventory_display_qty_style.js';
import Clipboard from '@react-native-clipboard/clipboard';
import {ModalCart} from './modal_cart';
import {
  LoginState,
  InventoryState,
  InventoryMethod,
} from '../../api/authText.js';

export function DisplayQuantityScreen({route, navigation}) {
  const loginState = React.useContext(LoginState);
  const orderState = React.useContext(InventoryState);
  const {toggleModal} = React.useContext(InventoryMethod);

  const productInfoRender = text => {
    return (
      <View style={styles.productTextContainer}>
        <Text style={styles.productText}>{text}</Text>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.productInfoRow}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: orderState.image}} />
          </View>
          <View style={styles.productInfoContainer}>
            <View style={(styles.productTextContainer, {marginBottom: 5})}>
              <Text style={{fontSize: 16}}>{orderState.name}</Text>
            </View>
            {productInfoRender('品牌： ' + orderState.brand)}
            <View style={styles.productTextContainerWithButton}>
              <View style={styles.productTitleContainer}>
                <Text style={styles.productText}>
                  編號： {orderState.cCode}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.copyBtnContainer}
                onPress={() => {
                  Clipboard.setString(orderState.productID);
                }}>
                <Text style={{fontSize: 16, color: 'white'}}>複製</Text>
              </TouchableOpacity>
            </View>
            {productInfoRender('單價： ' + orderState.price)}
            {productInfoRender('優惠： ' + orderState.detail)}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.inventoryContainer}>
            <View style={styles.inventoryShop}>
              <Text style={{fontSize: 16}}>店鋪地址</Text>
            </View>
            <View style={styles.inventoryQuantity}>
              <Text style={{fontSize: 16}}>數量</Text>
            </View>
          </View>
          <View style={styles.inventoryListContainer}>
            <View style={styles.inventoryShop}>
              <Text style={{fontSize: 16}}>{orderState.location}</Text>
            </View>
            <View style={styles.inventoryQuantity}>
              <Text style={{fontSize: 16}}>{orderState.quantity}</Text>
            </View>
          </View>
          {loginState.position === 'manager' ? (
            <View style={styles.requestContainer}>
              <TouchableOpacity
                style={styles.requestBtn}
                onPress={() => {
                  console.log(orderState.toggleModal);
                  toggleModal();
                }}>
                <Text style={{fontSize: 18, color: 'white'}}>申請調貨</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <ModalCart />
      </View>
    </View>
  );
}
