/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Alert,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import styles from '../../style/sales/createSales_style.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import NumericInput from 'react-native-numeric-input';
import {apiFetchProductInfo} from '../../api/inventory.js';
import {apiCreateSalesRecord} from '../../api/sales.js';

export function CreateSalesScreen({navigation}) {
  React.useLayoutEffect(() => {
    loadStaff();
  }, [navigation]);
  //-----------------redux----------------------------//
  const InitialState = {
    isLoading: false,
    staffID: '',
    district: '',
    location: '',
    position: '',
    token: '',
    shopID: '',
    date: '日期',
    time: '時間',
    productID: '',
    name: '',
    brand: '',
    price: '',
    notice: '',
    isVisible: false,
    modalVisible: false,
    pickerMode: null,
    display: 'default',
    response: '未選擇任何相片',
    productList: [],
  };
  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'UPLOADING_RECORD':
        return {
          ...prevState,
          isLoading: action.isLoading,
        };
      case 'GET_STAFF_INFO':
        return {
          ...prevState,
          staffID: action.staffID,
          district: action.district,
          location: action.location,
          position: action.position,
          token: action.token,
          shopID: action.shopID,
        };
      case 'SET_PRODUCTID':
        return {
          ...prevState,
          productID: action.productID,
        };
      case 'SET_PRICE':
        return {
          ...prevState,
          price: action.price,
        };
      case 'SET_NOTICE':
        return {
          ...prevState,
          notice: action.notice,
        };
      case 'TOGGLE_MODAL':
        return {
          ...prevState,
          modalVisible: action.modalVisible,
        };
      case 'TOGGLE_ORDERTIME':
        return {
          ...prevState,
          pickerMode: action.pickerMode,
          display: action.display,
          isVisible: !prevState.isVisible,
        };
      case 'HIDE_DATE_PICKER':
        return {
          ...prevState,
          isVisible: !prevState.isVisible,
        };
      case 'CONFIRM_DATE_TIME_PICKER':
        return {
          ...prevState,
          date: action.date,
          time: action.time,
        };
      case 'SET_PRODUCTLIST':
        return {
          ...prevState,
          productList: action.productList,
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
  const loadStaff = async () => {
    let staffID = await AsyncStorage.getItem('staffID');
    let district = await AsyncStorage.getItem('district');
    let location = await AsyncStorage.getItem('location');
    let position = await AsyncStorage.getItem('position');
    let token = await AsyncStorage.getItem('userToken');
    let shopID = await AsyncStorage.getItem('shop_id');
    dispatch({
      type: 'GET_STAFF_INFO',
      staffID: staffID,
      district: district,
      location: location,
      position: position,
      token: token,
      shopID: shopID,
    });
  };
  const windowWidth = Dimensions.get('window').width;

  const handleItemChange = val => {
    dispatch({
      type: 'SET_PRODUCTID',
      productID: val,
    });
  };
  const handlePriceChange = val => {
    dispatch({
      type: 'SET_PRICE',
      price: val,
    });
  };
  const handleNoticeChange = val => {
    dispatch({
      type: 'SET_NOTICE',
      notice: val,
    });
  };

  const confirmValidation = () => {
    if (
      state.date === '日期' ||
      state.time === '時間' ||
      state.productList.length === 0 ||
      state.price === '' ||
      state.response === '未選擇任何相片' ||
      state.response.didCancel === true
    ) {
      Alert.alert('注意', '日期時間、貨品、價錢及收據不能為空！');
    } else {
      dispatch({
        type: 'TOGGLE_MODAL',
        modalVisible: true,
      });
    }
  };
  const handleConfirm = val => {
    let day = ('0' + val.getDate()).slice(-2);
    let month = ('0' + (val.getMonth() + 1)).slice(-2);
    let year = val.getFullYear();
    let hours = ('0' + val.getHours()).slice(-2);
    let minutes = ('0' + val.getMinutes()).slice(-2);
    dispatch({
      type: 'CONFIRM_DATE_TIME_PICKER',
      date: year + '-' + month + '-' + day,
      time: hours + ':' + minutes + ':' + '00',
    });
    dispatch({type: 'HIDE_DATE_PICKER'});
  };

  const createRecord = async () => {
    const [status, result] = await apiCreateSalesRecord(
      state.response.assets[0],
      state.date,
      state.time,
      state.price,
      state.productList,
      state.shopID,
    );
    if (status === 200) {
      dispatch({
        type: 'UPLOADING_RECORD',
        isLoading: false,
      });
      navigation.replace('Success');
    } else {
      dispatch({
        type: 'UPLOADING_RECORD',
        isLoading: false,
      });
      Alert.alert('錯誤', '新增記錄失敗!');
      Alert.alert('錯誤', result);
    }
  };

  const renderItem = state.productList.map((element, index) => {
    return (
      <View
        key={'mainContainer' + index.toString()}
        style={{
          flexDirection: 'row',
          width: '90%',
          //backgroundColor: 'orange',
          marginBottom: 10,
        }}>
        <View
          key={'textContainer' + index.toString()}
          style={{
            flex: 5.5,
            width: ((windowWidth - 8 * 2) * 5.5) / 10,
            justifyContent: 'center',
          }}>
          <Text key={'text' + index.toString()}>
            {element.name} - {element.brand}
          </Text>
        </View>
        <View
          key={'numericContainer' + index.toString()}
          style={{flex: 2, justifyContent: 'center'}}>
          <NumericInput
            key={'numeric' + index.toString()}
            minValue={1}
            value={element.quantity}
            onChange={value => {
              let tempCart = [];
              state.productList.map(item => {
                tempCart.push(item);
              });
              tempCart[index].quantity = value;
              dispatch({
                type: 'SET_PRODUCTLIST',
                productList: tempCart,
              });
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
          style={{
            flexDirection: 'row-reverse',
            flex: 2.5,
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            key={'MaterialCommunityIcons' + index.toString()}
            name="delete"
            size={25}
            color="red"
            onPress={() => {
              let tempCart = [];
              state.productList.map((item, key) => {
                if (key !== index) {
                  tempCart.push(item);
                }
              });
              dispatch({
                type: 'SET_PRODUCTLIST',
                productList: tempCart,
              });
            }}
          />
        </View>
      </View>
    );
  });

  const getProductInfo = async () => {
    const [status, result] = await apiFetchProductInfo(
      state.productID,
      state.token,
    );
    console.log(result);
    let tempCart = [];
    if (status === 200) {
      state.productList.map(element => {
        tempCart.push(element);
      });
      tempCart.push({
        productID: result[0].productID,
        cCode: result[0].cCode,
        name: result[0].name,
        brand: result[0].brand,
        price: result[0].price,
        quantity: 1,
      });
      dispatch({
        type: 'SET_PRODUCTLIST',
        productList: tempCart,
      });
      handleItemChange('');
    } else {
      handleItemChange('');
      Alert.alert('錯誤', result.error);
    }
  };

  const modalRenderItem = state.productList.map((item, index) => {
    return (
      <View
        key={'modalMainContainer' + index.toString()}
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginBottom: 1,
          //backgroundColor: 'cyan',
        }}>
        <View
          key={'modalTextContainer' + index.toString()}
          style={{
            flex: 7,
            //backgroundColor: 'yellow',
            justifyContent: 'center',
            paddingLeft: 30,
          }}>
          <Text key={'modalText' + index.toString()}>
            {item.name}-{item.brand}
          </Text>
        </View>
        <View
          key={'modalText2Container' + index.toString()}
          style={{flex: 3, alignItems: 'center'}}>
          <Text key={'modalText2' + index.toString()} style={styles.text}>
            {item.quantity}
          </Text>
        </View>
      </View>
    );
  });

  if (state.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          //backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              dispatch({
                type: 'TOGGLE_ORDERTIME',
                pickerMode: 'datetime',
                display: 'spinner',
              });
            }}>
            <Text style={styles.text}>
              {state.date} {state.time}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            display={state.display}
            isVisible={state.isVisible}
            mode={state.pickerMode}
            onConfirm={handleConfirm}
            onCancel={() => dispatch({type: 'HIDE_DATE_PICKER'})}
          />
          <View style={styles.btn}>
            <TextInput
              style={styles.textInput}
              textAlign={'center'}
              placeholder="貨品號碼 / 條碼"
              placeholderTextColor="grey"
              value={state.productID}
              onChangeText={val => handleItemChange(val)}
            />
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                if (state.productID !== '') {
                  getProductInfo();
                }
              }}>
              <MaterialIcons
                name="add-circle-outline"
                size={25}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.productList}>
            {state.productList.length === 0 ? (
              <Text>貨品籃尚未有任何貨品！</Text>
            ) : (
              renderItem
            )}
          </View>
          <View style={styles.btn}>
            <TextInput
              style={styles.textInput}
              textAlign={'center'}
              placeholder="總價錢"
              placeholderTextColor="grey"
              value={state.price}
              onChangeText={val => handlePriceChange(val)}
            />
          </View>
          <View style={styles.btn}>
            <View style={{flex: 7.5}}>
              <Text style={{marginLeft: 10, fontSize: 14}}>
                收據：{' '}
                {state.response === '未選擇任何相片' ||
                state.response.didCancel === true
                  ? '未選擇任何相片'
                  : state.response.assets[0].fileName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 2.5,
                //backgroundColor: 'yellow',
              }}>
              <MaterialIcons
                name="add-a-photo"
                size={25}
                color="#A9CA81"
                style={{marginHorizontal: 5}}
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
                }}
              />
              <MaterialIcons
                name="add-photo-alternate"
                size={25}
                color="#A9CA81"
                style={{marginRight: 10}}
                onPress={() => {
                  const options = {
                    mediaType: 'photo',
                  };
                  launchImageLibrary(options, val => {
                    dispatch({
                      type: 'LAUNCH_CAMERA',
                      response: val,
                    });
                  });
                }}
              />
            </View>
          </View>
          <View style={styles.btn}>
            <TextInput
              style={styles.textInput}
              textAlign={'center'}
              placeholder="備註"
              placeholderTextColor="grey"
              value={state.notice}
              onChangeText={val => handleNoticeChange(val)}
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={state.modalVisible}
            onRequestClose={() => {
              dispatch({
                type: 'TOGGLE_MODAL',
                modalVisible: !state.modalVisible,
              });
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitle}>新增本期營業額</Text>
                </View>
                <View style={{borderWidth: 0.5, width: 150, marginBottom: 5}} />
                <ScrollView
                  style={styles.scroll}
                  showsVerticalScrollIndicator={false}>
                  <View style={styles.modalTextContainer}>
                    <View style={styles.modalTextLeftPanel}>
                      <Text style={styles.text}>商鋪： </Text>
                    </View>
                    <View style={styles.modalTextRightPanel}>
                      <Text style={styles.text}>
                        {state.location} - {state.shopID}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalTextContainer}>
                    <View style={styles.modalTextLeftPanel}>
                      <Text style={styles.text}>時間： </Text>
                    </View>
                    <View style={styles.modalTextRightPanel}>
                      <Text style={styles.text}>
                        {state.date} {state.time}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalTextContainer}>
                    <View
                      style={{
                        flex: 7,
                        justifyContent: 'center',
                        paddingLeft: 30,
                      }}>
                      <Text style={styles.text}>貨品藍 </Text>
                    </View>
                    <View style={{flex: 3, alignItems: 'center'}}>
                      <Text style={styles.text}>數量</Text>
                    </View>
                  </View>
                  {modalRenderItem}
                  <View style={styles.modalTextContainer}>
                    <View style={styles.modalTextLeftPanel}>
                      <Text style={styles.text}>總價： </Text>
                    </View>
                    <View style={styles.modalTextRightPanel}>
                      <Text style={styles.text}>${state.price}</Text>
                    </View>
                  </View>
                  <View style={styles.modalTextContainer}>
                    <View style={styles.modalTextLeftPanel}>
                      <Text style={styles.text}>備註： </Text>
                    </View>
                    <View style={styles.modalTextRightPanel}>
                      <Text style={styles.text}>{state.notice}</Text>
                    </View>
                  </View>
                </ScrollView>
                <View style={{borderWidth: 0.5, width: 150, marginTop: 5}} />
                <View style={styles.modalBtnContainer}>
                  <TouchableOpacity
                    style={styles.modalBtn}
                    onPress={() =>
                      dispatch({
                        type: 'TOGGLE_MODAL',
                        modalVisible: !state.modalVisible,
                      })
                    }>
                    <Text style={styles.modalText}>取消</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalBtn}
                    onPress={() => {
                      dispatch({
                        type: 'TOGGLE_MODAL',
                        modalVisible: !state.modalVisible,
                      });
                      dispatch({
                        type: 'UPLOADING_RECORD',
                        isLoading: true,
                      });
                      createRecord();
                    }}>
                    <Text style={styles.modalText}>新增</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.confirmBtnContainer}>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => {
                confirmValidation();
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                確認
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
