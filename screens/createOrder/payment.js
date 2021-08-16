/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */

import React from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import styles from '../../style/orders/payment_style.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {apiUploadPaymentRecord} from '../../api/order.js';

export function PaymentScreen({route, navigation}) {
  React.useLayoutEffect(() => {
    if (route.params?.memberInfo) {
      setMemberInfo(state => route.params?.memberInfo);
    }
    if (route.params?.productList) {
      // let tempPrice = 0;
      // route.params?.productList.map(element => {
      //   tempPrice += element.price * element.quantity;
      //   setTotalPrice(tempPrice);
      // });
      setProductList(state => route.params?.productList);
    }
    if (route.params?.staffData) {
      setStaffData(state => route.params?.staffData);
    }
    if (route.params?.paymentMethod) {
      setPaymentMethod(state => route.params?.paymentMethod);
    }
    if (route.params?.deliveryMethod) {
      setDeliveryMethod(state => route.params?.deliveryMethod);
    }
    if (route.params?.discountType) {
      setDiscountType(state => route.params?.discountType);
    }
    if (route.params?.promotionCode) {
      setPromotionCode(state => route.params?.promotionCode);
    }
    if (route.params?.totalPrice) {
      setTotalPrice(state => route.params?.totalPrice);
    }
    if (route.params?.freeItem) {
      setFreeItem({
        freeProductList: route.params?.freeItem.freeProductList,
        detail: route.params?.freeItem.detail,
        finalPrice: route.params?.freeItem.tempTotalPrice,
        productList: route.params?.freeItem.productList,
      });
    }
  }, [
    navigation,
    route.params?.memberInfo,
    route.params?.productList,
    route.params?.staffData,
    route.params?.paymentMethod,
    route.params?.deliveryMethod,
    route.params?.discountType,
    route.params?.promotionCode,
    route.params?.totalPrice,
    route.params?.freeItem,
  ]);
  const [togglePanel, setTogglePanel] = React.useState(false);
  const [freeItem, setFreeItem] = React.useState({
    freeProductList: [],
    detail: '',
    finalPrice: '',
    productList: [],
  });
  const [memberInfo, setMemberInfo] = React.useState('');
  const [productList, setProductList] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState('');
  const [staffData, setStaffData] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [deliveryMethod, setDeliveryMethod] = React.useState('');
  const [discountType, setDiscountType] = React.useState('');
  const [promotionCode, setPromotionCode] = React.useState('');

  const [response, setResponse] = React.useState('未選擇任何相片');

  const renderProductList = productList.map((element, index) => {
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
  });

  const renderFreeProductList = freeItem.freeProductList.map(
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
          {productList.length === 0 ? null : renderProductList}
          {discountType === '' || discountType === 'none' ? null : (
            <View>
              <Text style={{fontSize: 16, marginLeft: 10}}>
                優惠：{freeItem.detail}
              </Text>
              <Text style={{fontSize: 16, marginLeft: 10}}>贈品</Text>
            </View>
          )}
          {freeItem.freeProductList.length === 0 ? null : renderFreeProductList}
          {discountType === '' || discountType === 'none' ? (
            <View style={styles.priceCotainer}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                總價錢：${totalPrice}
              </Text>
            </View>
          ) : (
            <View style={styles.priceCotainer}>
              <Text style={{fontSize: 16}}>原價：${totalPrice}</Text>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>附上優惠後</Text>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                總價錢：${freeItem.finalPrice}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  const upload = async () => {
    if (response === '未選擇任何相片') {
      Alert.alert('注意！', '付款記錄不能為空！');
    } else {
      if (discountType === '' || discountType === 'none') {
        const [status, result] = await apiUploadPaymentRecord(
          response.assets[0],
          memberInfo,
          productList,
          paymentMethod,
          discountType,
          null,
          null,
          staffData,
          totalPrice,
        );
        if (status === 200) {
          navigation.replace('Receipt', {
            receipt: result,
          });
        }
      } else {
        const [status, result] = await apiUploadPaymentRecord(
          response.assets[0],
          memberInfo,
          freeItem.productList,
          paymentMethod,
          discountType,
          promotionCode,
          freeItem.freeProductList,
          staffData,
          freeItem.finalPrice,
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
              //navigation.push('Camera');
              const options = {
                mediaType: 'photo',
                cameraType: 'back',
                saveToPhotos: true,
              };
              launchCamera(options, setResponse);
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
              //navigation.push('Camera');
              const options = {
                mediaType: 'photo',
                cameraType: 'back',
                saveToPhotos: true,
              };
              launchImageLibrary(options, setResponse);
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
            {response === '未選擇任何相片' || response.didCancel === true
              ? '未選擇任何相片'
              : response.assets[0].fileName}
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => {
              //navigation.push('Home');
              //console.log(response);
              //console.log(response.didCancel);
              // console.log(memberInfo);
              // console.log(productList);
              // console.log(paymentMethod);
              // console.log(staffData);
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
            {backgroundColor: togglePanel ? 'white' : '#A9CA81'},
          ]}
          onPress={() => {
            setTogglePanel(false);
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: togglePanel ? '#707070' : 'white',
            }}>
            貨品列表
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            {backgroundColor: togglePanel ? '#A9CA81' : 'white'},
          ]}
          onPress={() => {
            setTogglePanel(true);
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: togglePanel ? 'white' : '#707070',
            }}>
            付款上傳
          </Text>
        </TouchableOpacity>
      </View>
      {togglePanel ? pay() : list()}
    </View>
  );
}
