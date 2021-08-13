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

export function createOrderScreen({route, navigation}) {
  //------------------------------hooks--------------------------//
  React.useLayoutEffect(() => {
    setStaffData(route.params?.staffData);
  }, [navigation, route.params?.staffData]);

  React.useEffect(() => {
    if (route.params?.productToCart) {
      let tempCart = [];
      let tempPrice = 0;
      productList.map(element => {
        tempPrice += element.quantity * element.price;
        tempCart.push(element);
      });
      tempCart.push(route.params?.productToCart);
      tempPrice +=
        route.params?.productToCart.quantity *
        route.params?.productToCart.price;
      setTotalPrice(tempPrice);
      setProductList(tempCart);
    }
  }, [route.params?.productToCart]);
  React.useEffect(() => {
    if (route.params?.qrInfo) {
      // Post updated, do something with `route.params.qrInfo`
      // For example, send the post to the server
      setMemCheck(state => ({
        phoneNo: JSON.parse(route.params?.qrInfo).phone,
        email: JSON.parse(route.params?.qrInfo).email,
        memberId: JSON.parse(route.params?.qrInfo).id,
      }));
    }
  }, [route.params?.qrInfo]);
  React.useEffect(() => {
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
  }, []);
  //-----------------------------------------------------------//
  const windowWidth = Dimensions.get('window').width;
  const [staffData, setStaffData] = React.useState({
    staffID: '',
    district: '',
    position: '',
    token: '',
    shopID: '',
  });
  const [check, setCheck] = React.useState({
    paymentMethod: '',
    deliveryMethod: '',
    discountType: '',
  });
  const [promotionCode, setPromotionCode] = React.useState('');
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [productList, setProductList] = React.useState([]);
  const [isSelectPayment, setIsSelectPayment] = React.useState(true);
  const [isSelectDelivery, setIsSelectDelivery] = React.useState(true);
  const [isSelectDiscountCode, setIsSelectDiscountCode] = React.useState(true);

  const [memCheck, setMemCheck] = React.useState({
    phoneNo: '',
    email: '',
    memberId: '',
  });

  const renderItem = productList.map((element, index) => {
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
              productList.map(item => {
                tempCart.push(item);
              });
              tempCart[index].quantity = value;
              tempCart.map(item => {
                tempPrice += item.quantity * item.price;
              });
              setTotalPrice(tempPrice);
              setProductList(tempCart);
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
              productList.map((item, key) => {
                if (key !== index) {
                  tempPrice += item.quantity * item.price;
                  tempCart.push(item);
                }
              });
              setTotalPrice(tempPrice);
              setProductList(tempCart);
            }}
          />
        </View>
      </View>
    );
  });

  const handlePhoneNoChange = val => {
    setMemCheck({
      ...check,
      phoneNo: val,
    });
  };

  const handleEmailChange = val => {
    setMemCheck({
      ...memCheck,
      email: val,
    });
  };

  const handleMemberIdChange = val => {
    setMemCheck({
      ...check,
      memberId: val,
    });
  };

  const handlePromotionCodeChange = val => {
    setPromotionCode(val);
  };

  const emptySelectHandle = (goods, pay, delivery, discountType) => {
    if (pay === '') {
      setIsSelectPayment(false);
    }
    if (delivery === '') {
      setIsSelectDelivery(false);
    }
    if (discountType === '') {
      setIsSelectDiscountCode(false);
    }
    if (
      goods.length === 0 ||
      pay === '' ||
      delivery === '' ||
      discountType === ''
    ) {
      Alert.alert('注意！', '資料不能漏空！');
    } else {
      if (check.discountType === 'none') {
        navigation.replace('Payment', {
          productList: productList,
          staffData: staffData,
          paymentMethod: check.paymentMethod,
          deliveryMethod: check.deliveryMethod,
          discountType: check.discountType,
          totalPrice: totalPrice,
        });
      } else {
        discountCalculation();
      }
    }
  };

  const discountCalculation = async () => {
    const [status, result] = await apiDiscountCalculation(
      productList,
      promotionCode,
    );
    if (status === 404) {
      console.log(JSON.stringify(result));
    } else {
      console.log(result);
      navigation.replace('Payment', {
        productList: productList,
        staffData: staffData,
        paymentMethod: check.paymentMethod,
        deliveryMethod: check.deliveryMethod,
        totalPrice: totalPrice,
        discountType: check.discountType,
        promotionCode: promotionCode,
        freeItem: result,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* panel InputView edit---------------------------------------------------- */}
      <View style={styles.infoPanel}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <View style={styles.containInputView}>
            {/* member info edit---------------------------------------------------- */}
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <Ionicons name="menu" size={25} />
                <Text style={styles.text}>會員資料</Text>
              </View>
              <View style={styles.memberInfoRow}>
                <View style={styles.memberInfoColumn}>
                  <View style={styles.inputView}>
                    <TextInput
                      style={{height: 50, color: 'black', width: '100%'}}
                      placeholder="電話號碼..."
                      placeholderTextColor="#003f5c"
                      value={memCheck.phoneNo}
                      onChangeText={val => handlePhoneNoChange(val)}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      style={{height: 50, color: 'black', width: '100%'}}
                      placeholder="Email..."
                      placeholderTextColor="#003f5c"
                      value={memCheck.email}
                      onChangeText={val => handleEmailChange(val)}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      style={{height: 50, color: 'black', width: '100%'}}
                      placeholder="會員號碼..."
                      placeholderTextColor="#003f5c"
                      value={memCheck.memberId}
                      onChangeText={val => handleMemberIdChange(val)}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.QRcodeColumn}
                  onPress={() => navigation.push('QRVendor')}>
                  <MaterialCommunityIcons
                    name="qrcode-scan"
                    size={80}
                    color="#F1948A"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* Selected goods edit---------------------------------------------------- */}
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <AntDesign name="shoppingcart" size={30} />
                <Text style={styles.text}>貨品列表</Text>
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
                  <Text>名稱</Text>
                  <Ionicons
                    name="ios-cart"
                    size={25}
                    color="#F1948A"
                    onPress={() => {
                      console.log(productList);
                      console.log(productList.length);
                      let tempPrice = 0;
                      productList.map(element => {
                        tempPrice += element.price * element.quantity;
                      });
                      console.log(tempPrice);
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>數量</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row-reverse',
                    flex: 2.5,
                  }}>
                  <Ionicons
                    name="barcode-outline"
                    size={25}
                    style={{marginRight: 10}}
                    color="#F1948A"
                    onPress={() => {
                      navigation.push('FindPorduct');
                    }}
                  />
                </View>
              </View>
              <View
                style={{borderWidth: 0.5, width: '100%', marginBottom: 10}}
              />
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {productList.length === 0 ? (
                  <Text style={{marginBottom: 10}}>購物籃尚未有任何貨品！</Text>
                ) : (
                  renderItem
                )}
              </View>
              <View
                style={{borderWidth: 0.5, width: '100%', marginBottom: 10}}
              />
              {productList.length === 0 ? null : (
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
                  <Text style={{marginRight: 20}}>$ {totalPrice}</Text>
                </View>
              )}
            </View>
            {/* Payment edit---------------------------------------------------- */}
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <MaterialIcons name="payment" size={30} />
                <Text style={styles.text}>付款方式</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.text}>AliPay</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCheck({
                      ...check,
                      paymentMethod: 'Aliselect',
                    });
                    setIsSelectPayment(true);
                  }}>
                  {check.paymentMethod === 'Aliselect' ? (
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
                <Text style={styles.text}>WeChat Pay</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCheck({
                      ...check,
                      paymentMethod: 'Wechatselect',
                    });
                    setIsSelectPayment(true);
                  }}>
                  {check.paymentMethod === 'Wechatselect' ? (
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
                <Text style={styles.text}>現金/八達通</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCheck({
                      ...check,
                      paymentMethod: 'Cashselect',
                    });
                    setIsSelectPayment(true);
                  }}>
                  {check.paymentMethod === 'Cashselect' ? (
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
                <Text style={styles.text}>VISA</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCheck({
                      ...check,
                      paymentMethod: 'VISAselect',
                    });
                    setIsSelectPayment(true);
                  }}>
                  {check.paymentMethod === 'VISAselect' ? (
                    <MaterialCommunityIcons
                      name="record-circle-outline"
                      size={20}
                    />
                  ) : (
                    <MaterialCommunityIcons name="circle-outline" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {isSelectPayment ? null : (
                <Text style={styles.warnText}>付款方式不能為空！</Text>
              )}
            </View>
            {/* Delivery edit---------------------------------------------------- */}
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={30}
                />
                <Text style={styles.text}>領取方法</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.text}>現場領取</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCheck({
                      ...check,
                      deliveryMethod: 'LiveTake',
                    });
                    setIsSelectDelivery(true);
                  }}>
                  {check.deliveryMethod === 'LiveTake' ? (
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
                <Text style={styles.text}>本地分店</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCheck({
                      ...check,
                      deliveryMethod: 'Local',
                    });
                    setIsSelectDelivery(true);
                  }}>
                  {check.deliveryMethod === 'Local' ? (
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
                <Text style={styles.text}>外地分店</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCheck({
                      ...check,
                      deliveryMethod: 'Others',
                    });
                    setIsSelectDelivery(true);
                  }}>
                  {check.deliveryMethod === 'Others' ? (
                    <MaterialCommunityIcons
                      name="record-circle-outline"
                      size={20}
                    />
                  ) : (
                    <MaterialCommunityIcons name="circle-outline" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {isSelectDelivery ? null : (
                <Text style={styles.warnText}>領取方式不能為空！</Text>
              )}
            </View>
            {/* Discount code edit---------------------------------------------------- */}
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <Ionicons name="code-outline" size={30} />
                <Text style={styles.text}>優惠</Text>
              </View>
              <View style={styles.itemRow}>
                <View style={styles.membershipInputView}>
                  <TextInput
                    style={{height: 40, color: 'black', width: '100%'}}
                    placeholder="會員號碼..."
                    placeholderTextColor="#003f5c"
                    value={check.memberId}
                    onChangeText={val => handleMemberIdChange(val)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setCheck({
                      ...check,
                      discountType: 'member',
                    });
                    setIsSelectDiscountCode(true);
                  }}>
                  {check.discountType === 'member' ? (
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
                    value={promotionCode}
                    onChangeText={val => handlePromotionCodeChange(val)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setCheck({
                      ...check,
                      discountType: 'promotion',
                    });
                    setIsSelectDiscountCode(true);
                  }}>
                  {check.discountType === 'promotion' ? (
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
                    setCheck({
                      ...check,
                      discountType: 'none',
                    });
                    setIsSelectDiscountCode(true);
                  }}>
                  {check.discountType === 'none' ? (
                    <MaterialCommunityIcons
                      name="record-circle-outline"
                      size={20}
                    />
                  ) : (
                    <MaterialCommunityIcons name="circle-outline" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {isSelectDiscountCode ? null : (
                <Text style={styles.warnText}>優惠選項不能為空！</Text>
              )}
            </View>
            {/* Shop staff Column edit------------------------------------------- */}
            <View style={styles.infoColumn}>
              <View style={styles.itemRow}>
                <View style={styles.detailRow}>
                  <Ionicons name="md-person-circle-sharp" size={25} />
                  <Text style={styles.text}>職員編號</Text>
                </View>
                <Text style={styles.text}>{staffData.staffID}</Text>
              </View>
              <View style={styles.itemRow}>
                <View style={styles.detailRow}>
                  <Entypo name="shop" size={25} />
                  <Text style={styles.text}>分店編號</Text>
                </View>
                <Text style={styles.text}>{staffData.shopID}</Text>
              </View>
            </View>
            {/* Comfirm button edit------------------------------------------- */}
            <View style={styles.infoColumn}>
              <View style={styles.itemRow}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => {
                    Alert.alert(
                      '注意！',
                      '訂單資料會被註銷，是否確定返回主頁面？',
                      [
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
                      ],
                    );
                  }}>
                  <Text>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => {
                    emptySelectHandle(
                      productList,
                      check.paymentMethod,
                      check.deliveryMethod,
                      check.discountType,
                    );
                    // console.log(promotionCode);
                    // console.log(productList);
                  }}>
                  <Text>確認</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
