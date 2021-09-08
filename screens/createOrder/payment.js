/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */

import React from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from '../../style/orders/payment_style.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {apiUploadPaymentRecord} from '../../api/order.js';
import {LoginState} from '../../api/authText.js';

export function PaymentScreen({route, navigation}) {
  const loginState = React.useContext(LoginState);
  const InitialState = {
    togglePanel: false,
    memberInfo: [],
    productList: [],
    freeProductList: [],
    detail: '',
    totalPrice: '',
    finalPrice: '',
    staffData: [],
    paymentMethod: '',
    discountType: '',
    promotionCode: '',
    response: '未選擇任何相片',
  };
  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'TOGGLE_PANEL':
        return {
          ...prevState,
          togglePanel: action.togglePanel,
        };
      case 'GET_DATA_FROM_PREVIOUS_ROUTE':
        return {
          ...prevState,
          memberInfo: action.memberInfo,
          productList: action.productList,
          staffData: action.staffData,
          paymentMethod: action.paymentMethod,
          discountType: action.discountType,
          promotionCode: action.promotionCode,
          totalPrice: action.totalPrice,
          freeProductList: action.freeProductList,
          detail: action.detail,
          finalPrice: action.finalPrice,
        };
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
  React.useLayoutEffect(() => {
    if (route.params?.freeProductList) {
      dispatch({
        type: 'GET_DATA_FROM_PREVIOUS_ROUTE',
        memberInfo: route.params?.memberInfo,
        productList: route.params?.productList,
        freeProductList: route.params?.freeProductList,
        detail: route.params?.detail,
        staffData: route.params?.staffData,
        paymentMethod: route.params?.paymentMethod,
        discountType: route.params?.discountType,
        promotionCode: route.params?.promotionCode,
        totalPrice: route.params?.totalPrice,
        finalPrice: route.params?.finalPrice,
      });
    } else {
      dispatch({
        type: 'GET_DATA_FROM_PREVIOUS_ROUTE',
        memberInfo: route.params?.memberInfo,
        productList: route.params?.productList,
        freeProductList: [],
        detail: '',
        staffData: route.params?.staffData,
        paymentMethod: route.params?.paymentMethod,
        discountType: route.params?.discountType,
        promotionCode: '',
        totalPrice: route.params?.totalPrice,
        finalPrice: 0,
      });
    }
  }, [
    navigation,
    route.params?.memberInfo,
    route.params?.productList,
    route.params?.freeProductList,
    route.params?.detail,
    route.params?.staffData,
    route.params?.paymentMethod,
    route.params?.discountType,
    route.params?.promotionCode,
    route.params?.totalPrice,
    route.params?.finalPrice,
  ]);

  const renderProductList = state.productList.map((element, index) => {
    if (element.price !== null) {
      return (
        <View
          key={'mainContainer' + index.toString()}
          style={styles.renderMainContainer}>
          <View
            key={'textContainer' + index.toString()}
            style={styles.renderTextContainer}>
            <Text key={'text' + index.toString()} style={{marginLeft: 30}}>
              {element.name}-{element.brand}
            </Text>
          </View>
          <View
            key={'text1Container' + index.toString()}
            style={styles.renderText1Container}>
            <Text key={'text1' + index.toString()}>${element.price}</Text>
          </View>
          <View
            key={'text2Container' + index.toString()}
            style={styles.renderText2Container}>
            <Text key={'text2' + index.toString()} style={{marginRight: 15}}>
              x{element.quantity}
            </Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  });

  const renderFreeProductList = state.freeProductList.map((element, index) => {
    return (
      <View
        key={'mainContainerF' + index.toString()}
        style={styles.renderMainContainer}>
        <View
          key={'textContainerF' + index.toString()}
          style={styles.renderTextContainer}>
          <Text key={'textF' + index.toString()} style={{marginLeft: 30}}>
            {element.name}-{element.brand}
          </Text>
        </View>
        <View style={styles.renderText1Container} />
        <View
          key={'text2ContainerF' + index.toString()}
          style={styles.renderText2Container}>
          <Text key={'text2F' + index.toString()} style={{marginRight: 15}}>
            x{element.quantity}
          </Text>
        </View>
      </View>
    );
  });

  const list = () => {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.renderMainContainer}>
            <View style={styles.renderTextContainer}>
              <Text style={{fontSize: 16, marginLeft: 10}}>貨品列表</Text>
            </View>
            <View style={styles.renderText1Container}>
              <Text style={{fontSize: 16}}>單價</Text>
            </View>
            <View style={styles.renderText2Container}>
              <Text style={{fontSize: 16, marginRight: 15}}>數量</Text>
            </View>
          </View>
          {state.productList.length === 0 ? null : renderProductList}
          {state.discountType === '' || state.discountType === 'none' ? null : (
            <View>
              <Text style={{fontSize: 16, marginLeft: 10}}>
                優惠：{state.detail}
              </Text>
              <Text style={{fontSize: 16, marginLeft: 10}}>贈品</Text>
            </View>
          )}
          {state.freeProductList.length === 0 ? null : renderFreeProductList}
          {state.discountType === '' || state.discountType === 'none' ? (
            <View style={styles.priceCotainer}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                總價錢：${state.totalPrice}
              </Text>
            </View>
          ) : (
            <View style={styles.priceCotainer}>
              <Text style={{fontSize: 16}}>原價：${state.totalPrice}</Text>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>附上優惠後</Text>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                總價錢：${state.finalPrice}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  const upload = async () => {
    if (state.response === '未選擇任何相片') {
      Alert.alert('注意！', '付款記錄不能為空！');
    } else {
      if (state.discountType === '' || state.discountType === 'none') {
        const [status, result] = await apiUploadPaymentRecord(
          state.response.assets[0],
          state.memberInfo,
          state.productList,
          state.paymentMethod,
          state.discountType,
          null,
          null,
          loginState.shopID,
          loginState.staffID,
          state.totalPrice,
        );
        if (status === 200) {
          navigation.replace('Receipt', {
            receipt: result,
          });
        }
      } else {
        const [status, result] = await apiUploadPaymentRecord(
          state.response.assets[0],
          null, //state.memberInfo,
          state.productList,
          state.paymentMethod,
          state.discountType,
          state.promotionCode,
          state.freeProductList,
          loginState.shopID,
          loginState.staffID,
          state.finalPrice,
        );
        if (status === 200) {
          navigation.replace('Receipt', {
            receipt: result,
          });
        }
      }
    }
  };

  const pay = () => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: 'http://172.104.44.182/greenhouse/image/QRtest.png'}}
          />
        </View>
        <View style={styles.photoPickerContainer}>
          <TouchableOpacity
            onPress={() => {
              const options = {
                mediaType: 'photo',
                cameraType: 'back',
                saveToPhotos: true,
              };
              launchCamera(options, val => {
                dispatch({
                  type: 'LAUNCH_CAMERA',
                  response: val,
                });
              });
            }}>
            <MaterialIcons
              name="add-a-photo"
              size={30}
              color="black"
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const options = {
                mediaType: 'photo',
                cameraType: 'back',
                saveToPhotos: true,
              };
              launchImageLibrary(options, val => {
                dispatch({
                  type: 'LAUNCH_CAMERA',
                  response: val,
                });
              });
            }}>
            <MaterialIcons
              name="add-photo-alternate"
              size={30}
              color="black"
              style={{marginHorizontal: 10}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text>
            選擇照片上傳：{' '}
            {state.response === '未選擇任何相片' ||
            state.response.didCancel === true
              ? '未選擇任何相片'
              : state.response.assets[0].fileName}
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => {
              upload();
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>上傳記錄</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            {backgroundColor: state.togglePanel ? 'white' : '#A9CA81'},
          ]}
          onPress={() => {
            dispatch({type: 'TOGGLE_PANEL', togglePanel: false});
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: state.togglePanel ? '#707070' : 'white',
            }}>
            貨品列表
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            {backgroundColor: state.togglePanel ? '#A9CA81' : 'white'},
          ]}
          onPress={() => {
            dispatch({type: 'TOGGLE_PANEL', togglePanel: true});
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: state.togglePanel ? 'white' : '#707070',
            }}>
            付款上傳
          </Text>
        </TouchableOpacity>
      </View>
      {state.togglePanel ? pay() : list()}
    </View>
  );
}
