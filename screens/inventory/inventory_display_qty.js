/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */

import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from '../../style/inventory/inventory_display_style.js';
import Clipboard from '@react-native-clipboard/clipboard';

export function DisplayQuantityScreen({route, navigation}) {
  //<----------------------hooks------------------------>
  React.useLayoutEffect(() => {
    setProductInfo({
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

    //setStaffData(route.params?.staffData);
  }, [navigation, route.params?.quantityInfo]);
  //<------------------------------------------->
  //<-----------------initialization---------------------------->
  //const [staffData, setStaffData] = React.useState(null);
  const [productInfo, setProductInfo] = React.useState({
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
  });

  //<----------------  FlatList------------------------>

  //<-------------------------------------------------------->

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.productInfoRow}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: productInfo.image}} />
          </View>
          <View style={styles.productInfoContainer}>
            <View style={(styles.productTextContainer, {marginBottom: 5})}>
              <Text style={{fontSize: 16}}>{productInfo.name}</Text>
            </View>
            <View style={styles.productTextContainer}>
              <Text style={styles.productText}>品牌： {productInfo.brand}</Text>
            </View>
            <View style={styles.productTextContainerWithButton}>
              <View style={styles.productTitleContainer}>
                <Text style={styles.productText}>
                  編號： {productInfo.cCode}
                </Text>
              </View>
              <View style={styles.copyBtnContainer}>
                <TouchableOpacity
                  style={styles.copyBtn}
                  onPress={() => {
                    Clipboard.setString(productInfo.productID);
                  }}>
                  <Text style={{fontSize: 16, color: '#F1948A'}}>複製</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productTextContainer}>
              <Text style={styles.productText}>單價： {productInfo.price}</Text>
            </View>
            <View style={styles.productTextContainer}>
              <Text style={styles.productText}>
                優惠： {productInfo.detail}
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              //alignItems: 'space-between',
              justifyContent: 'center',
              width: '85%',
              height: 35,
              //backgroundColor: 'yellow',
              borderWidth: 1,
            }}>
            <View
              style={{
                flex: 7,
                paddingHorizontal: 20,
                //backgroundColor: 'cyan',
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
              //alignItems: 'space-between',
              justifyContent: 'center',
              width: '85%',
              height: 35,
              //backgroundColor: 'yellow',
            }}>
            <View
              style={{
                flex: 7,
                paddingHorizontal: 20,
                // backgroundColor: 'cyan',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 16}}>{productInfo.location}</Text>
            </View>
            <View style={{flex: 3, justifyContent: 'center'}}>
              <Text style={{fontSize: 16}}>{productInfo.quantity}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
