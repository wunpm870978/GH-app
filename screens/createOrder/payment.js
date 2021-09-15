/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

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
import {LoginState, OrderState, OrderMethod} from '../../api/authText.js';

export function PaymentScreen({route, navigation}) {
  const loginState = React.useContext(LoginState);
  const orderState = React.useContext(OrderState);
  const {handlePaymentPanel, setSelectedPhoto} = React.useContext(OrderMethod);

  const renderProductList = orderState.productList.map((element, index) => {
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

  const renderFreeProductList = orderState.freeProductList.map(
    (element, index) => {
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
    },
  );

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
          {orderState.productList.length === 0 ? null : renderProductList}
          {orderState.discountType === '' ||
          orderState.discountType === 'none' ? null : (
            <View>
              <Text style={{fontSize: 16, marginLeft: 10}}>
                優惠：{orderState.detail}
              </Text>
              <Text style={{fontSize: 16, marginLeft: 10}}>贈品</Text>
            </View>
          )}
          {orderState.freeProductList.length === 0
            ? null
            : renderFreeProductList}
          {orderState.discountType === '' ||
          orderState.discountType === 'none' ? (
            <View style={styles.priceCotainer}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                總價錢：${orderState.totalPrice}
              </Text>
            </View>
          ) : (
            <View style={styles.priceCotainer}>
              <Text style={{fontSize: 16}}>原價：${orderState.totalPrice}</Text>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>附上優惠後</Text>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                總價錢：${orderState.priceWithDiscount}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  const upload = async () => {
    if (orderState.response === '未選擇任何相片') {
      Alert.alert('注意！', '付款記錄不能為空！');
    } else {
      if (
        orderState.discountType === '' ||
        orderState.discountType === 'none'
      ) {
        const [status, result] = await apiUploadPaymentRecord(
          orderState.response.assets[0],
          null, //memberinfo
          orderState.productList,
          orderState.paymentMethod,
          orderState.discountType,
          null, //promotionCode
          null, //promotionType
          loginState.shopID,
          loginState.staffID,
          orderState.totalPrice,
        );
        if (status === 200) {
          navigation.replace('Receipt', {
            receipt: result,
          });
        }
      } else {
        const [status, result] = await apiUploadPaymentRecord(
          orderState.response.assets[0],
          null, //state.memberInfo,
          orderState.productList,
          orderState.paymentMethod,
          orderState.discountType,
          orderState.promotionCode,
          orderState.freeProductList,
          loginState.shopID,
          loginState.staffID,
          orderState.priceWithDiscount,
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
                setSelectedPhoto(val);
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
                setSelectedPhoto(val);
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
            {orderState.response === '未選擇任何相片' ||
            orderState.response.didCancel === true
              ? '未選擇任何相片'
              : orderState.response.assets[0].fileName}
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
            {backgroundColor: orderState.togglePanel ? 'white' : '#A9CA81'},
          ]}
          onPress={() => {
            handlePaymentPanel(false);
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: orderState.togglePanel ? '#707070' : 'white',
            }}>
            貨品列表
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            {backgroundColor: orderState.togglePanel ? '#A9CA81' : 'white'},
          ]}
          onPress={() => {
            handlePaymentPanel(true);
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: orderState.togglePanel ? 'white' : '#707070',
            }}>
            付款上傳
          </Text>
        </TouchableOpacity>
      </View>
      {orderState.togglePanel ? pay() : list()}
    </View>
  );
}
