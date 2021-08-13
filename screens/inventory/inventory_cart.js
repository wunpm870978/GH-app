/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */

import React from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../style/inventory/inventory_cart_style.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import NumericInput from 'react-native-numeric-input';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function CartInventoryScreen({route, navigation}) {
  const [toggleEdit, setToggleEdit] = React.useState(false);
  const [cartInfo, setCartInfo] = React.useState(null);
  const [productInfo, setProductInfo] = React.useState('');
  const [staffData, setStaffData] = React.useState('');
  const [currentItem, setCurrentItem] = React.useState({
    shop: '',
    district: '',
    quantity: 1,
    deliveryDate: '運送日期',
    deliveryTime: '',
    item: '',
    maxQty: 1,
  });
  const [datePicker, setDatePicker] = React.useState({
    isVisible: false,
    pickerMode: null,
    display: 'default',
  });
  const [modalVisible, setModalVisible] = React.useState(false);
  const toggleDiliveryTime = () => {
    setDatePicker({
      ...datePicker,
      pickerMode: 'datetime',
      display: 'spinner',
      isVisible: !datePicker.isVisible,
    });
  };
  const handleConfirm = val => {
    console.log(val);
    let day = ('0' + val.getDate()).slice(-2);
    let month = ('0' + (val.getMonth() + 1)).slice(-2);
    let year = val.getFullYear();
    let hours = ('0' + val.getHours()).slice(-2);
    let minutes = ('0' + val.getMinutes()).slice(-2);
    setCurrentItem({
      ...currentItem,
      deliveryDate: year + '-' + month + '-' + day,
      deliveryTime: hours + ':' + minutes + ':' + '00',
    });
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePicker({
      ...datePicker,
      isVisible: false,
    });
  };
  React.useEffect(() => {
    if (route.params?.cartInfo) {
      setCartInfo(state => route.params?.cartInfo);
    }
    if (route.params?.productInfo) {
      setProductInfo(state => route.params?.productInfo);
    }
    if (route.params?.staffData) {
      setStaffData(state => route.params?.staffData);
    }
  }, [
    route.params?.cartInfo,
    route.params?.productInfo,
    route.params?.staffData,
  ]);
  React.useEffect(() => {}, [cartInfo]);

  const renderItem = React.useCallback(function renderItem({item}) {
    return <Item data={item} />;
  }, []);

  const Item = React.memo(function Item({data}) {
    return (
      <View
        style={
          (styles.renderItemListContainer,
          {alignItems: 'center', justifyContent: 'center'})
        }>
        <View style={styles.renderItemContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 7}}>
              <Text>
                {data.district} - {data.shopID}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row-reverse',
                flex: 3,
              }}>
              <MaterialCommunityIcons
                name="delete"
                size={25}
                color="red"
                onPress={() => {
                  setCurrentItem({
                    ...data,
                    shop: data.shopID,
                    district: data.district,
                    quantity: data.quantity,
                    deliveryDate: data.deliveryDate,
                    deliveryTime: data.deliveryTime,
                    maxQty: data.maxQty,
                  });
                  setToggleEdit(false);
                  setModalVisible(!modalVisible);
                }}
              />
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={25}
                color="blue"
                onPress={() => {
                  setCurrentItem({
                    ...data,
                    shop: data.shopID,
                    district: data.district,
                    quantity: data.quantity,
                    deliveryDate: data.deliveryDate,
                    deliveryTime: data.deliveryTime,
                    maxQty: data.maxQty,
                  });
                  setToggleEdit(true);
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text>數量：</Text>
            <Text>{data.quantity}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text>運送日期：</Text>
            <Text>{data.deliveryDate}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text>運送時間：</Text>
            <Text>{data.deliveryTime}</Text>
          </View>
        </View>
      </View>
    );
  });
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.productInfoContainer}>
          <View style={styles.productInfoRow}>
            <Text style={{fontSize: 16}}>貨品號碼：</Text>
            <Text style={{fontSize: 16}}>{productInfo.productID}</Text>
          </View>
          <View style={styles.productInfoRow}>
            <Text style={{fontSize: 16}}>貨品名稱：</Text>
            <Text style={{fontSize: 16}}>{productInfo.name}</Text>
          </View>
          <View style={styles.productInfoRow}>
            <Text style={{fontSize: 16}}>品牌：</Text>
            <Text style={{fontSize: 16}}>{productInfo.brand}</Text>
          </View>
        </View>
        <FlatList
          style={{width: '100%'}}
          keyExtractor={flatItem => String(flatItem.shopID)}
          data={cartInfo}
          extraData={cartInfo}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.confirmBtnContainer}>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => {
              console.log(cartInfo);
              console.log(productInfo);
              console.log(staffData);
              navigation.navigate('Home');
            }}>
            <Text style={{fontSize: 18}}>確認更改</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePickerModal
        display={datePicker.display}
        isVisible={datePicker.isVisible}
        mode={datePicker.pickerMode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalIconContainer}>
              <Ionicons
                name="close"
                size={25}
                color="red"
                style={{marginHorizontal: 5}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>{currentItem.shop}</Text>
              <Text style={styles.modalTitle}>{currentItem.district}</Text>
            </View>
            <View style={{borderWidth: 0.5, width: 250}} />
            <View style={styles.modalProductContainer}>
              <NumericInput
                maxValue={currentItem.maxQty}
                minValue={1}
                value={currentItem.quantity}
                onChange={value =>
                  setCurrentItem({
                    ...currentItem,
                    quantity: value,
                  })
                }
                totalWidth={240}
                totalHeight={50}
                iconSize={25}
                //step={1.5}
                rounded
                textColor="#B0228C"
                iconStyle={{color: 'white'}}
                rightButtonBackgroundColor="#EA3788"
                leftButtonBackgroundColor="#E56B70"
              />
              <TouchableOpacity
                style={styles.modalDate}
                onPress={() => {
                  toggleDiliveryTime();
                }}>
                <Text>
                  {currentItem.deliveryDate} {currentItem.deliveryTime}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalDate}
                onPress={() => {
                  if (
                    currentItem.deliveryDate === '運送日期' ||
                    currentItem.deliveryTime === ''
                  ) {
                    Alert.alert('注意', '日期時間不能為空！');
                  } else {
                    const tempCart = [];
                    cartInfo.map((element, index) => {
                      if (
                        element.shopID === currentItem.shop &&
                        toggleEdit === true
                      ) {
                        console.log(element);
                        tempCart.push({
                          shopID: currentItem.shop,
                          district: currentItem.district,
                          quantity: currentItem.quantity,
                          deliveryDate: currentItem.deliveryDate,
                          deliveryTime: currentItem.deliveryTime,
                          maxQty: currentItem.maxQty,
                        });
                      } else if (
                        element.shopID === currentItem.shop &&
                        toggleEdit === false
                      ) {
                      } else {
                        tempCart.push(element);
                      }
                    });
                    setCartInfo(tempCart);
                    setModalVisible(!modalVisible);
                  }
                }}>
                <Text>{toggleEdit ? '更改調貨籃' : '刪除調貨欄'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
