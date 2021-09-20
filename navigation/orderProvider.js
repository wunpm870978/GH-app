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
    detail: '',
    totalPrice: 0,
    priceWithDiscount: 0,
    promotionPickerList: [],
    discountPicker: '',
    productList: [],
    freeProductList: [],
    isSelectPayment: true,
    isSelectDiscountCode: true,
    togglePanel: false,
    response: '未選擇任何相片',
  };
  const reducer = (prevState, action) => {
    switch (action.type) {
      //handle membership field
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
      //set promotion picker after getting info from backend
      case 'SET_PROMOTION_PICKER':
        return {
          ...prevState,
          promotionPickerList: action.promotionPickerList,
        };
      //handle changes of promotion picker
      case 'SELECT_PROMOTION_PICKER':
        return {
          ...prevState,
          promotionCode: action.promotionCode,
        };
      //handle adding product to carts
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
      //handle payment field
      case 'SET_PAYMENT_METHOD':
        return {
          ...prevState,
          paymentMethod: action.paymentMethod,
          isSelectPayment: true,
        };
      //handle discount field
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
      //reset varaible after submit
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
      //set variables after getting info from backend
      case 'SET_FIELDS_AFTER_CALCULATION':
        return {
          ...prevState,
          productList: action.productList,
          priceWithDiscount: action.priceWithDiscount,
          freeProductList: action.freeProductList,
          detail: action.detail,
        };
      //toggle panel in payament.js
      case 'TOGGLE_PAYMENT_PANEL':
        return {
          ...prevState,
          togglePanel: action.togglePanel,
        };
      //handle launch camera or gallary
      case 'LAUNCH_CAMERA':
        return {
          ...prevState,
          response: action.response,
        };
      default:
        break;
    }
  };
  const [state, dispatch] = React.useReducer(reducer, InitialState);
  const orderContext = React.useMemo(
    () => ({
      //---------------------createOrder.js-------------//
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
      //set promotion picker list, select promotion picker
      setPromotionPicker: promotionPickerList => {
        dispatch({
          type: 'SET_PROMOTION_PICKER',
          promotionPickerList: promotionPickerList,
        });
      },
      selectPromotionPicker: selected => {
        dispatch({type: 'SELECT_PROMOTION_PICKER', promotionCode: selected});
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
      //---------------------payment.js-----------------------//
      //handle discount calculations
      getResultFromCalculation: result => {
        dispatch({
          type: 'SET_FIELDS_AFTER_CALCULATION',
          productList: result.productList,
          priceWithDiscount: result.tempTotalPrice,
          freeProductList: result.freeProductList,
          detail: result.detail,
        });
      },
      //toggle payment panel
      handlePaymentPanel: val => {
        dispatch({
          type: 'TOGGLE_PAYMENT_PANEL',
          togglePanel: val,
        });
      },
      //handle selected photo from phone
      setSelectedPhoto: response => {
        dispatch({
          type: 'LAUNCH_CAMERA',
          response: response,
        });
      },
    }),
    [state.totalPrice],
  );
  return (
    <OrderState.Provider value={state}>
      <OrderMethod.Provider value={orderContext}>
        <Stack.Navigator initialRouteName="OrderCreate">
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
        </Stack.Navigator>
      </OrderMethod.Provider>
    </OrderState.Provider>
  );
};
