/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from '../../style/orders/receipt_style.js';
import {LoginState} from '../../api/authText.js';

export function ReceiptScreen({route, navigation}) {
  React.useLayoutEffect(() => {
    if (route.params?.receipt) {
      setReceipt(state => route.params?.receipt[0]);
      setProductList(state => route.params?.receipt[1]);
      setDiscountType(state => route.params?.receipt[2]);
    }
  }, [navigation, route.params?.receipt]);
  const loginState = React.useContext(LoginState);
  const [receipt, setReceipt] = React.useState('');
  const [productList, setProductList] = React.useState([]);
  const [discountType, setDiscountType] = React.useState('none');
  const renderItem = productList.map((element, index) => {
    if (element.price !== null) {
      return (
        <View
          key={'mainContainer' + index.toString()}
          style={styles.renderMainContainer}>
          <View
            key={'textContainer' + index.toString()}
            style={styles.renderTextContainer}>
            <Text key={'text' + index.toString()}>
              {element.name} - {element.brand}
            </Text>
          </View>
          <View
            key={'text1Container' + index.toString()}
            style={styles.renderText1Container}>
            <Text key={'text1' + index.toString()}>${element.price}</Text>
          </View>
          <View
            key={'text2Container' + index.toString()}
            style={styles.renderText1Container}>
            <Text key={'text2' + index.toString()}>x{element.quantity}</Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  });
  const renderFreeItem = productList.map((element, index) => {
    if (element.price === null) {
      return (
        <View
          key={'mainContainerF' + index.toString()}
          style={styles.renderMainContainer}>
          <View
            key={'textContainerF' + index.toString()}
            style={styles.renderTextContainer}>
            <Text key={'textF' + index.toString()}>
              {element.name} - {element.brand}
            </Text>
          </View>
          <View
            key={'text1ContainerF' + index.toString()}
            style={styles.renderText1Container}
          />
          <View
            key={'text2ContainerF' + index.toString()}
            style={styles.renderText1Container}>
            <Text key={'text2F' + index.toString()}>x{element.quantity}</Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  });
  const receiptHeader = (title, value) => {
    return (
      <View style={styles.receiptRow}>
        <Text style={{fontSize: 16}}>{title}</Text>
        <Text style={{fontSize: 16}}>{value}</Text>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <View style={styles.receiptTitle}>
          <Text style={{fontSize: 20}}>收據</Text>
        </View>
        {receiptHeader('店鋪： ', loginState.shopID)}
        {receiptHeader('日期： ', receipt.date)}
        {receiptHeader('時間： ', receipt.time)}
        {receiptHeader('收款員： ', loginState.staffID)}
        <View style={{width: '90%', borderWidth: 0.5, marginVertical: 15}} />
        <View style={styles.renderMainContainer}>
          <View style={styles.renderTextContainer}>
            <Text>貨品</Text>
          </View>
          <View style={styles.renderText1Container}>
            <Text>單價</Text>
          </View>
          <View style={styles.renderText1Container}>
            <Text style={{fontSize: 14}}>數量</Text>
          </View>
        </View>
        {productList.length === 0 ? null : renderItem}
        {discountType !== 'none' ? (
          <View
            style={{
              width: '90%',
              borderWidth: 0.5,
              marginVertical: 15,
              borderColor: 'white',
            }}
          />
        ) : null}
        {discountType !== 'none' ? (
          <View style={styles.renderMainContainer}>
            <View style={styles.renderTextContainer}>
              <Text>贈品</Text>
            </View>
            <View style={styles.renderText1Container} />
            <View style={styles.renderText1Container}>
              <Text style={{fontSize: 14}}>數量</Text>
            </View>
          </View>
        ) : null}
        {discountType !== 'none' ? renderFreeItem : null}
        <View style={{width: '90%', borderWidth: 0.5, marginVertical: 15}} />
        <View style={styles.receiptRow}>
          <Text>總價錢： </Text>
          <Text>${receipt.totalPrice}</Text>
        </View>
        <View style={styles.confirmBtnContainer}>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => {
              navigation.push('Home');
            }}>
            <Text style={{fontSize: 20, color: 'white'}}>確認</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
