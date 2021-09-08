/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {createOrderScreen} from '../screens/createOrder/createOrder.js';
import {PaymentScreen} from '../screens/createOrder/payment.js';
import {ReceiptScreen} from '../screens/createOrder/receipt.js';
import {QRScanVendorScreen} from '../screens/scanCode/qrVendor.js';
import {BarcodeVendorScreen} from '../screens/scanCode/barcodeVendor.js';
import {OrderState, OrderMethod} from '../api/authText.js';

const Stack = createStackNavigator();

export const OrderProvider = () => {
  const InitialState = {
    phoneNo: '',
    email: '',
    memberID: '',
    staffData: '',
    paymentMethod: '',
    deliveryMethod: '',
    discountType: '',
    promotionCode: '',
    totalPrice: 0,
    productList: [],
    isSelectPayment: true,
    isSelectDiscountCode: true,
  };
  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'SCAN_QR_CODE':
        return {
          ...prevState,
          phoneNo: action.phoneNo,
          email: action.email,
          memberID: action.memberID,
        };
      case 'INPUT_MEMBER_PHONENO':
        return {
          ...prevState,
          phoneNo: action.phoneNo,
        };
      case 'INPUT_MEMBER_EMAIL':
        return {
          ...prevState,
          email: action.email,
        };
      case 'INPUT_MEMBER_ID':
        return {
          ...prevState,
          memberID: action.memberID,
        };
      case 'GET_STAFF_INFO':
        return {
          ...prevState,
          staffData: action.staffData,
        };
      case 'ADD_TO_CART':
        return {
          ...prevState,
          totalPrice: action.totalPrice,
          productList: action.productList,
        };
      case 'ADD_TO_CART_V2':
        return {
          ...prevState,
          productList: action.productList,
          totalPrice: action.totalPrice,
        };
      case 'SET_PAYMENT_METHOD':
        return {
          ...prevState,
          paymentMethod: action.paymentMethod,
          isSelectPayment: true,
        };
      case 'SET_DISCOUNT_TYPE':
        return {
          ...prevState,
          discountType: action.discountType,
          promotionCode: action.promotionCode,
          isSelectDiscountCode: true,
        };
      case 'INPUT_PROMOTION_CODE':
        return {
          ...prevState,
          promotionCode: action.promotionCode,
        };
      case 'RESET_PAYMENT_SELECT':
        return {
          ...prevState,
          isSelectPayment: false,
        };
      case 'RESET_DISCOUNT_SELECT':
        return {
          ...prevState,
          isSelectDiscountCode: false,
        };
      default:
        break;
    }
  };
  const [state, dispatch] = React.useReducer(reducer, InitialState);
  const orderContext = React.useMemo(
    () => ({
      //handle membership field
      handlePhoneNoChange: val => {
        dispatch({
          type: 'INPUT_MEMBER_PHONENO',
          phoneNo: val,
        });
      },
      handleEmailChange: val => {
        dispatch({
          type: 'INPUT_MEMBER_EMAIL',
          email: val,
        });
      },
      handleMemberIdChange: val => {
        dispatch({
          type: 'INPUT_MEMBER_ID',
          memberID: val,
        });
      },
      //get menbership data from qrcode scanner
      handleQRMembership: (phoneNo, email, memberID) => {
        dispatch({
          type: 'SCAN_QR_CODE',
          phoneNo: phoneNo,
          email: email,
          memberID: memberID,
        });
      },
      //add product to cart from barcode scanner
      addToCartV1: (cart, priceOfProduct) => {
        dispatch({
          type: 'ADD_TO_CART',
          totalPrice: priceOfProduct,
          productList: cart,
        });
      },
      addToCart: (cart, priceOfProduct) => {
        dispatch({
          type: 'ADD_TO_CART_V2',
          productList: cart,
          totalPrice: state.totalPrice + priceOfProduct,
        });
      },
      //changes when filling promotion field
      handlePromotionCodeChange: val => {
        dispatch({
          type: 'INPUT_PROMOTION_CODE',
          promotionCode: val,
        });
      },
      //change radio button selected for each field
      handleDiscountType: (discountType, promotionCode) => {
        dispatch({
          type: 'SET_DISCOUNT_TYPE',
          discountType: discountType,
          promotionCode: promotionCode,
        });
      },
      handlePaymentType: paymentMethod => {
        dispatch({
          type: 'SET_PAYMENT_METHOD',
          paymentMethod: paymentMethod,
        });
      },
      //valiadate all fields before submitting request
      togglePaymentErrorMsg: () => {
        dispatch({type: 'RESET_PAYMENT_SELECT'});
      },
      toggleDiscountErrorMsg: () => {
        dispatch({type: 'RESET_DISCOUNT_SELECT'});
      },
    }),
    [state.totalPrice],
  );
  return (
    <OrderState.Provider value={state}>
      <OrderMethod.Provider value={orderContext}>
        <Stack.Navigator initialRouteName="OrderCreate">
          {/* <Stack.Group
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F4F5F8',
          },
          headerTintColor: '#EA5E2A',
        }}> */}
          <Stack.Screen
            name="OrderCreate"
            component={createOrderScreen}
            options={{
              title: '創建訂單',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{
              title: '付款',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
          <Stack.Screen
            name="Receipt"
            component={ReceiptScreen}
            options={{
              title: '收據',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
          <Stack.Screen
            name="QRVendor"
            component={QRScanVendorScreen}
            options={{
              title: 'QR code',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
          <Stack.Screen
            name="FindPorduct"
            component={BarcodeVendorScreen}
            options={{
              title: '搜查貨品',
              headerStyle: {
                backgroundColor: '#F4F5F8',
              },
              headerTintColor: '#EA5E2A',
            }}
          />
          {/* </Stack.Group> */}
        </Stack.Navigator>
      </OrderMethod.Provider>
    </OrderState.Provider>
  );
};
