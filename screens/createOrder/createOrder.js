/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  BackHandler,
  Alert,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import styles from '../../style/orders/order_style.js';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import NumericInput from 'react-native-numeric-input';
import {apiDiscountCalculation} from '../../api/order.js';
import {LoginState, OrderState, OrderMethod} from '../../api/authText.js';

export function createOrderScreen({route, navigation}) {
  //-----------------redux----------------------------//
  const loginState = React.useContext(LoginState);
  const orderState = React.useContext(OrderState);
  const {
    handlePhoneNoChange,
    handleEmailChange,
    handleMemberIdChange,
    handlePromotionCodeChange,
    handleDiscountType,
    handlePaymentType,
    toggleDiscountErrorMsg,
    togglePaymentErrorMsg,
    addToCartV1,
  } = React.useContext(OrderMethod);
  //------------------------------hooks--------------------------//
  /* React.useEffect(() => {
    const backAction = () => {
      Alert.alert('注意！', '訂單資料會被註銷，是否確定返回主頁面？', [
        {
          text: '取消',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: '確定',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []); */
  //-----------------------------------------------------------//
  const windowWidth = Dimensions.get('window').width;

  const renderItem = orderState.productList.map((element, index) => {
    return (
      <View
        key={'mainContainer' + index.toString()}
        style={styles.renderContainer}>
        <View
          key={'textContainer' + index.toString()}
          style={styles.renderTextContainer}>
          <Text key={'text' + index.toString()}>
            {element.name} - {element.brand}
          </Text>
        </View>
        <View key={'numericContainer' + index.toString()} style={{flex: 2}}>
          <NumericInput
            key={'numeric' + index.toString()}
            minValue={1}
            value={element.quantity}
            onChange={value => {
              let tempCart = [];
              let tempPrice = 0;
              orderState.productList.map(item => {
                tempCart.push(item);
              });
              tempCart[index].quantity = value;
              tempCart.map(item => {
                tempPrice += item.quantity * item.price;
              });
              addToCartV1(tempCart, tempPrice);
            }}
            totalWidth={((windowWidth - 8 * 2) * 2) / 10}
            totalHeight={30}
            iconSize={25}
            //step={1.5}
            rounded
            textColor="#B0228C"
            iconStyle={{color: 'white'}}
            rightButtonBackgroundColor="#EA3788"
            leftButtonBackgroundColor="#E56B70"
          />
        </View>
        <View
          key={'iconContainer' + index.toString()}
          style={styles.renderIconContainer}>
          <MaterialCommunityIcons
            key={'MaterialCommunityIcons' + index.toString()}
            name="delete"
            size={25}
            color="red"
            onPress={() => {
              let tempCart = [];
              let tempPrice = 0;
              orderState.productList.map((item, key) => {
                if (key !== index) {
                  tempPrice += item.quantity * item.price;
                  tempCart.push(item);
                }
              });
              addToCartV1(tempCart, tempPrice);
            }}
          />
        </View>
      </View>
    );
  });

  const emptySelectHandle = (goods, pay, discountType) => {
    if (pay === '') {
      togglePaymentErrorMsg();
    }
    /* if (delivery === '') {
      setIsSelectDelivery(false);
    } */
    if (discountType === '') {
      toggleDiscountErrorMsg();
    }
    if (
      goods.length === 0 ||
      pay === '' ||
      //delivery === '' ||
      discountType === ''
    ) {
      Alert.alert('注意！', '資料不能漏空！');
    } else {
      if (discountType === 'none') {
        navigation.replace('Payment', {
          productList: orderState.productList,
          //staffData: state.staffData,
          paymentMethod: orderState.paymentMethod,
          //deliveryMethod: check.deliveryMethod,
          discountType: orderState.discountType,
          totalPrice: orderState.totalPrice,
        });
      } else {
        discountCalculation();
      }
    }
  };

  const discountCalculation = async () => {
    const [status, result] = await apiDiscountCalculation(
      orderState.productList,
      orderState.promotionCode,
    );
    if (status === 404) {
      console.log(JSON.stringify(result));
    } else {
      console.log(result);
      navigation.replace('Payment', {
        productList: result.productList,
        //staffData: state.staffData,
        paymentMethod: orderState.paymentMethod,
        //deliveryMethod: check.deliveryMethod,
        totalPrice: orderState.totalPrice,
        finalPrice: result.tempTotalPrice,
        discountType: orderState.discountType,
        promotionCode: orderState.promotionCode,
        freeProductList: result.freeProductList,
        detail: result.detail,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* panel InputView edit---------------------------------------------------- */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* member info edit---------------------------------------------------- */}
        <View style={styles.infoColumn}>
          <View style={styles.infoRow}>
            <Ionicons name="menu" color="#EA5E2A" size={25} />
            <Text style={styles.textTitle}>會員資料</Text>
          </View>
          <View style={styles.memberInfoRow}>
            <View style={styles.memberInfoColumn}>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="電話號碼..."
                  placeholderTextColor="#707070"
                  value={orderState.phoneNo}
                  onChangeText={val => handlePhoneNoChange(val)}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Email..."
                  placeholderTextColor="#707070"
                  value={orderState.email}
                  onChangeText={val => handleEmailChange(val)}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="會員號碼..."
                  placeholderTextColor="#707070"
                  value={orderState.memberID}
                  onChangeText={val => handleMemberIdChange(val)}
                />
              </View>
            </View>
            <View style={styles.QRcodeColumn}>
              <TouchableOpacity onPress={() => navigation.push('QRVendor')}>
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={70}
                  color="#EA5E2A"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Selected goods edit---------------------------------------------------- */}
        <View style={styles.infoColumn}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={styles.cartContainer}>
              <AntDesign name="shoppingcart" color="#EA5E2A" size={30} />
              <Text style={styles.textTitle}>貨品列表</Text>
            </View>
            <TouchableOpacity
              style={styles.cartContainer1}
              onPress={() => {
                navigation.push('FindPorduct');
              }}>
              <Ionicons name="barcode-outline" size={25} color="white" />
              <Text style={styles.textTitle1}>掃描條碼</Text>
            </TouchableOpacity>
            <View style={{flex: 0.5}} />
          </View>
          <View
            style={{
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              height: 35,
            }}>
            <View style={{flexDirection: 'row', flex: 5.5}}>
              <Text style={styles.text}>名稱</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.text}>數量</Text>
            </View>
            <View style={{flexDirection: 'row-reverse', flex: 2.5}} />
          </View>
          <View style={styles.borderLine} />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {orderState.productList.length === 0 ? (
              <Text style={{color: '#707070', marginBottom: 10}}>
                購物籃尚未有任何貨品！
              </Text>
            ) : (
              renderItem
            )}
          </View>
          <View style={styles.borderLine} />
          {orderState.productList.length === 0 ? null : (
            <View
              style={{
                width: '100%',
                height: 40,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name="ios-calculator"
                  size={25}
                  style={{marginRight: 10}}
                  color="#F1948A"
                />
                <Text>總價錢</Text>
              </View>
              <Text style={{marginRight: 20}}>$ {orderState.totalPrice}</Text>
            </View>
          )}
        </View>
        {/* Payment edit---------------------------------------------------- */}
        <View style={styles.infoColumn}>
          <View style={styles.infoRow}>
            <MaterialIcons name="payment" color="#EA5E2A" size={30} />
            <Text style={styles.textTitle}>付款方式</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.text}>AliPay</Text>
            <TouchableOpacity
              onPress={() => {
                handlePaymentType('Alipay');
              }}>
              <MaterialCommunityIcons
                name={
                  orderState.paymentMethod === 'Alipay'
                    ? 'record-circle-outline'
                    : 'circle-outline'
                }
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.text}>WeChat Pay</Text>
            <TouchableOpacity
              onPress={() => {
                handlePaymentType('WechatPay');
              }}>
              <MaterialCommunityIcons
                name={
                  orderState.paymentMethod === 'WechatPay'
                    ? 'record-circle-outline'
                    : 'circle-outline'
                }
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.text}>現金/八達通</Text>
            <TouchableOpacity
              onPress={() => {
                handlePaymentType('Cash');
              }}>
              <MaterialCommunityIcons
                name={
                  orderState.paymentMethod === 'Cash'
                    ? 'record-circle-outline'
                    : 'circle-outline'
                }
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.text}>VISA</Text>
            <TouchableOpacity
              onPress={() => {
                handlePaymentType('VISA');
              }}>
              <MaterialCommunityIcons
                name={
                  orderState.paymentMethod === 'VISA'
                    ? 'record-circle-outline'
                    : 'circle-outline'
                }
                size={20}
              />
            </TouchableOpacity>
          </View>
          {orderState.isSelectPayment ? null : (
            <View style={styles.warnTextContainer}>
              <Text style={styles.warnText}>付款方式不能為空！</Text>
            </View>
          )}
        </View>
        {/* Discount code edit---------------------------------------------------- */}
        <View style={styles.infoColumn}>
          <View style={styles.infoRow}>
            <Ionicons name="code-outline" color="#EA5E2A" size={30} />
            <Text style={styles.textTitle}>優惠</Text>
          </View>
          <View style={styles.itemRow}>
            <View style={styles.membershipInputView}>
              <TextInput
                style={{height: 40, color: 'black', width: '100%'}}
                placeholder="會員號碼..."
                placeholderTextColor="#003f5c"
                value={orderState.memberID}
                onChangeText={val => handleMemberIdChange(val)}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                handleDiscountType('member', '');
              }}>
              {orderState.discountType === 'member' ? (
                <MaterialCommunityIcons
                  name="record-circle-outline"
                  size={20}
                />
              ) : (
                <MaterialCommunityIcons name="circle-outline" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.itemRow}>
            <View style={styles.membershipInputView}>
              <TextInput
                style={{height: 40, color: 'black', width: '100%'}}
                placeholder="優惠碼..."
                placeholderTextColor="#003f5c"
                value={orderState.promotionCode}
                onChangeText={val => handlePromotionCodeChange(val)}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                handleDiscountType('promotion', orderState.promotionCode);
              }}>
              {orderState.discountType === 'promotion' ? (
                <MaterialCommunityIcons
                  name="record-circle-outline"
                  size={20}
                />
              ) : (
                <MaterialCommunityIcons name="circle-outline" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.text}>暫未提供</Text>
            <TouchableOpacity
              onPress={() => {
                handleDiscountType('none', '');
              }}>
              {orderState.discountType === 'none' ? (
                <MaterialCommunityIcons
                  name="record-circle-outline"
                  size={20}
                />
              ) : (
                <MaterialCommunityIcons name="circle-outline" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {orderState.isSelectDiscountCode ? null : (
            <View style={styles.warnTextContainer}>
              <Text style={styles.warnText}>優惠選項不能為空！</Text>
            </View>
          )}
        </View>
        {/* Shop staff Column edit------------------------------------------- */}
        <View style={styles.infoColumn}>
          <View style={styles.itemRow}>
            <View style={styles.detailRow}>
              <Ionicons
                name="md-person-circle-sharp"
                color="#EA5E2A"
                size={25}
              />
              <Text style={styles.textTitle}>職員編號</Text>
            </View>
            <Text style={styles.text}>{loginState.staffID}</Text>
          </View>
          <View style={styles.itemRow}>
            <View style={styles.detailRow}>
              <Entypo name="shop" color="#EA5E2A" size={25} />
              <Text style={styles.textTitle}>分店編號</Text>
            </View>
            <Text style={styles.text}>{loginState.shopID}</Text>
          </View>
        </View>
        {/* Comfirm button edit------------------------------------------- */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginBottom: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              Alert.alert('注意！', '訂單資料會被註銷，是否確定返回主頁面？', [
                {
                  text: '取消',
                  onPress: () => null,
                  style: 'cancel',
                },
                {
                  text: '確定',
                  onPress: () => {
                    navigation.push('Home');
                  },
                },
              ]);
            }}>
            <Text style={{color: 'white'}}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              emptySelectHandle(
                orderState.productList,
                orderState.paymentMethod,
                //check.deliveryMethod,
                orderState.discountType,
              );
            }}>
            <Text style={{color: 'white'}}>確認</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
