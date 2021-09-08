/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */

import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from '../../style/inventory/inventory_display_style.js';
import Clipboard from '@react-native-clipboard/clipboard';
import {ModalCart} from './modal_cart';

export function DisplayQuantityScreen({route, navigation}) {
  const InitialState = {
    productID: '',
    cCode: '',
    name: '',
    brand: '',
    image: 'http://172.104.44.182/greenhouse/image/default.png',
    price: '',
    promotionCode: '--',
    detail: '--',
    location: '',
    quantity: 0,
    staffData: {
      staffID: '',
      position: '',
      token: '',
      shopID: '',
    },
    toggleModal: false,
  };
  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'SET_STAFFDATA':
        return {
          ...prevState,
          staffData: action.staffData,
        };
      case 'SET_PRODUCTINFO':
        return {
          ...prevState,
          productID: action.productID,
          cCode: action.cCode,
          name: action.name,
          brand: action.brand,
          image: action.image,
          price: action.price,
          promotionCode: action.promotionCode,
          detail: action.detail,
          location: action.location,
          quantity: action.quantity,
        };
      case 'TOGGLE_MODAL':
        return {
          ...prevState,
          toggleModal: action.toggleModal,
        };
    }
  };
  const [state, dispatch] = React.useReducer(reducer, InitialState);
  //<----------------------hooks------------------------>
  React.useLayoutEffect(() => {
    dispatch({
      type: 'SET_PRODUCTINFO',
      productID: route.params?.quantityInfo.productID,
      cCode: route.params?.quantityInfo.cCode,
      name: route.params?.quantityInfo.name,
      brand: route.params?.quantityInfo.brand,
      image:
        route.params?.quantityInfo.image === null
          ? 'http://172.104.44.182/greenhouse/image/default.png'
          : route.params?.quantityInfo.image,
      price: route.params?.quantityInfo.price,
      promotionCode: route.params?.quantityInfo.promotionCode,
      detail: route.params?.quantityInfo.detail,
      location: route.params?.quantityInfo.location,
      quantity: route.params?.quantityInfo.unit,
    });
    dispatch({type: 'SET_STAFFDATA', staffData: route.params?.staffData});
  }, [navigation, route.params?.quantityInfo, route.params?.staffData]);

  const toggleModal = val => {
    dispatch({
      type: 'TOGGLE_MODAL',
      toggleModal: val,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.productInfoRow}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: state.image}} />
          </View>
          <View style={styles.productInfoContainer}>
            <View style={(styles.productTextContainer, {marginBottom: 5})}>
              <Text style={{fontSize: 16}}>{state.name}</Text>
            </View>
            <View style={styles.productTextContainer}>
              <Text style={styles.productText}>品牌： {state.brand}</Text>
            </View>
            <View style={styles.productTextContainerWithButton}>
              <View style={styles.productTitleContainer}>
                <Text style={styles.productText}>編號： {state.cCode}</Text>
              </View>
              <View style={styles.copyBtnContainer}>
                <TouchableOpacity
                  style={styles.copyBtn}
                  onPress={() => {
                    Clipboard.setString(state.productID);
                  }}>
                  <Text style={{fontSize: 16, color: 'white'}}>複製</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productTextContainer}>
              <Text style={styles.productText}>單價： {state.price}</Text>
            </View>
            <View style={styles.productTextContainer}>
              <Text style={styles.productText}>優惠： {state.detail}</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '85%',
              height: 35,
              borderWidth: 1,
            }}>
            <View
              style={{
                flex: 7,
                paddingHorizontal: 20,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 16}}>店鋪地址</Text>
            </View>
            <View style={{flex: 3, justifyContent: 'center'}}>
              <Text style={{fontSize: 16}}>數量</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '85%',
              height: 35,
            }}>
            <View
              style={{
                flex: 7,
                paddingHorizontal: 20,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 16}}>{state.location}</Text>
            </View>
            <View style={{flex: 3, justifyContent: 'center'}}>
              <Text style={{fontSize: 16}}>{state.quantity}</Text>
            </View>
          </View>
          {state.staffData.position === 'manager' ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginBottom: 50,
              }}>
              <TouchableOpacity
                style={{
                  width: 120,
                  height: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  backgroundColor: '#A9CA81',
                }}
                onPress={() => {
                  console.log(state.toggleModal);
                  dispatch({
                    type: 'TOGGLE_MODAL',
                    toggleModal: !state.toggleModal,
                  });
                }}>
                <Text style={{fontSize: 18, color: 'white'}}>申請調貨</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <ModalCart
          toggleStatus={state.toggleModal}
          productID={state.productID}
          staffID={state.staffData.staffID}
          location={state.staffData.location}
          shopID={state.staffData.shopID}
          maxQty={6}
          toggleModal={toggleModal}
        />
      </View>
    </View>
  );
}
